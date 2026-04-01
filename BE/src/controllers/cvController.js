import CVModel from '../models/cvModel.js';
import JobModel from '../models/jobModel.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';
import { PDFParse } from 'pdf-parse';
import axios from 'axios';
import path from 'path';

export const uploadCV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Vui lòng chọn file PDF' });
        }

        const userId = req.user.id;
        const originalName = req.file.originalname;

        // 1. Extract text via pdf-parse v2 from memory buffer
        const parser = new PDFParse({ data: req.file.buffer });
        const data = await parser.getText();
        let extractedText = data.text || '';
        // Remove null bytes and non-printable control characters that truncate MySQL inserts
        extractedText = extractedText.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');
        await parser.destroy();

        // 2. Upload to Cloudinary using streamifier
        const uploadResult = await new Promise((resolve, reject) => {
            const fileName = path.parse(originalName).name.replace(/\s+/g, '_');
            const stream = cloudinary.uploader.upload_stream(
                { 
                    folder: 'cv_uploads', 
                    public_id: `${fileName}_${Date.now()}.pdf`, // Include extension in public_id
                    resource_type: 'raw'
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

        // 3. Save to database
        const cvData = {
            user_id: userId,
            cloudinary_url: uploadResult.secure_url,
            file_name: originalName,
            extracted_text: extractedText,
        };

        const cvId = await CVModel.create(cvData);

        // 4. Send to AI service to generate embedding
        const chromaId = `cv_${cvId}`;
        const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8001';
        try {
            await axios.post(`${AI_SERVICE_URL}/api/v1/cv/embed`, {
                cv_id: chromaId,
                user_id: userId,
                extracted_text: extractedText,
            });

            // Update chroma info in MySQL
            await CVModel.updateChromaId(cvId, chromaId);
        } catch (aiError) {
            console.error('Lỗi khi lưu embedding CV vào ChromaDB:', aiError.message);
        }

        res.status(201).json({
            message: 'Tải CV lên thành công',
            cv: {
                id: cvId,
                file_name: originalName,
                cloudinary_url: uploadResult.secure_url,
                chroma_id: chromaId,
            },
        });
    } catch (error) {
        console.error('Lỗi upload CV:', error);
        res.status(500).json({ message: 'Lỗi server khi upload CV' });
    }
};

export const getMyCVs = async (req, res) => {
    try {
        const userId = req.user.id;
        const cvs = await CVModel.getByUserId(userId);
        res.status(200).json(cvs);
    } catch (error) {
        console.error('Lỗi lấy danh sách CV:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

export const deleteCV = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const cv = await CVModel.getById(id);
        if (!cv) {
            return res.status(404).json({ message: 'Không tìm thấy CV' });
        }

        if (cv.user_id !== userId) {
            return res.status(403).json({ message: 'Không có quyền xóa CV này' });
        }

        // CHUYỂN SANG SOFT DELETE (XÓA MỀM)
        // Không xóa file trên Cloudinary và ChromaDB để bảo toàn dữ liệu cho các đơn ứng tuyển cũ
        await CVModel.delete(id);

        res.status(200).json({ message: 'Xóa CV thành công' });
    } catch (error) {
        console.error('Lỗi xóa CV:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

export const analyzeCV = async (req, res) => {
    try {
        const { id: cvId } = req.params;
        const { jobId } = req.body;
        const userId = req.user.id;

        if (!jobId) {
            return res.status(400).json({ message: 'Missing jobId' });
        }

        const cv = await CVModel.getById(cvId);
        if (!cv || cv.user_id !== userId) {
            return res.status(404).json({ message: 'CV không tồn tại hoặc không có quyền truy cập' });
        }

        const job = await JobModel.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Công việc không tồn tại' });
        }

        // 1. Check Cache first
        const cache = await CVModel.getAnalysisCache(cvId, jobId);
        if (cache) {
            return res.status(200).json(cache);
        }

        // 2. Call AI Service if no cache
        const aiResponse = await axios.post(`${process.env.AI_SERVICE_URL}/api/v1/cv/analyze`, {
            cv_text: cv.extracted_text || '',
            job_title: job.title || '',
            job_description: job.description || '',
            requirements: job.requirements || ''
        });

        const result = aiResponse.data;

        // 3. Save to cache for future use
        await CVModel.saveAnalysisCache({
            cv_id: cvId,
            job_id: jobId,
            user_id: userId,
            match_score: result.match_score,
            strengths: result.strengths,
            improvements: result.improvements,
            summary: result.summary
        });

        res.status(200).json(result);
    } catch (error) {
        console.error('Lỗi phân tích CV:', error?.response?.data || error);
        res.status(500).json({ message: 'Lỗi server khi phân tích CV' });
    }
};

export const getRecommendedJobs = async (req, res) => {
    try {
        const { id: cvId } = req.params;
        const userId = req.user.id;

        const cv = await CVModel.getById(cvId);
        if (!cv || cv.user_id !== userId) {
            return res.status(404).json({ message: 'CV không tồn tại hoặc không có quyền truy cập' });
        }

        if (!cv.chroma_id) {
            return res.status(400).json({ message: 'CV này chưa được xử lý bởi hệ thống AI' });
        }

        // 1. Call AI Service to get similar job IDs from Chroma
        const aiResponse = await axios.post(`${process.env.AI_SERVICE_URL}/api/v1/cv/recommend-jobs`, {
            cv_id: cv.chroma_id,
            n_results: 6
        });

        const chromaResults = aiResponse.data; // This is the Chroma query result object
        const ids = chromaResults.ids ? chromaResults.ids[0] : [];
        const distances = chromaResults.distances ? chromaResults.distances[0] : [];

        if (ids.length === 0) {
            return res.status(200).json([]);
        }

        // 2. Fetch full job details from MySQL
        // IDs from Chroma are strings like '1', '2' etc. (based on how they were added)
        const jobDetails = await JobModel.findByIds(ids);

        // 3. Combine with distance/score and filter
        const recommendations = jobDetails
            .map(job => {
                const index = ids.indexOf(String(job.id));
                if (index === -1) return { ...job, match_score: null };

                // match_score = cosine_similarity (Phạm vi [0, 1])
                let score = 1 - distances[index];
                
                // Đảm bảo score nằm trong [0, 1]
                score = Math.max(0, Math.min(1, score));

                return {
                    ...job,
                    match_score: score
                };
            })
            .filter(job => job.match_score >= 0.5) // CHỈ HIỂN THỊ TRÊN 50%
            .sort((a, b) => b.match_score - a.match_score); // ƯU TIÊN CAO XẾP TRƯỚC

        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Lỗi lấy gợi ý việc làm:', error?.response?.data || error);
        res.status(500).json({ message: 'Lỗi server khi lấy gợi ý việc làm' });
    }
};
