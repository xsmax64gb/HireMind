import ApplicationModel from '../models/applicationModel.js';
import CVModel from '../models/cvModel.js';
import JobModel from '../models/jobModel.js';
import axios from 'axios';

export const applyForJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { cvId, match_score, missing_skills, ai_feedback } = req.body;
        const userId = req.user.id;

        if (!cvId) {
            return res.status(400).json({ message: 'Vui lòng chọn CV để ứng tuyển' });
        }

        // Check if already applied
        const alreadyApplied = await ApplicationModel.checkAlreadyApplied(jobId, userId);
        if (alreadyApplied) {
            return res.status(400).json({ message: 'Bạn đã ứng tuyển công việc này rồi' });
        }

        const cv = await CVModel.getById(cvId);
        if (!cv || cv.user_id !== userId) {
            return res.status(404).json({ message: 'CV không tồn tại hoặc không có quyền' });
        }

        const job = await JobModel.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Công việc không tồn tại' });
        }

        // Auto evaluate via AI if not provided from frontend
        let finalScore = match_score;
        let finalMissing = missing_skills;
        let finalFeedback = ai_feedback;

        if (finalScore === undefined || finalScore === null) {
            try {
                const aiResponse = await axios.post(`${process.env.AI_SERVICE_URL}/api/v1/cv/analyze`, {
                    cv_text: cv.extracted_text || '',
                    job_title: job.title || '',
                    job_description: job.description || '',
                    requirements: job.requirements || ''
                });
                const aiResult = aiResponse.data;
                finalScore = aiResult?.match_score || null;
                finalMissing = aiResult?.improvements || [];
                finalFeedback = aiResult?.summary || null;
            } catch (error) {
                console.error('Lỗi khi ứng tuyển gọi phân tích AI:', error?.message);
            }
        }

        const appData = {
            job_id: jobId,
            user_id: userId,
            cv_id: cvId,
            match_score: finalScore || null,
            missing_skills: finalMissing || [],
            ai_feedback: finalFeedback || null
        };

        const appId = await ApplicationModel.create(appData);

        res.status(201).json({
            message: 'Ứng tuyển thành công',
            application_id: appId
        });
    } catch (error) {
        console.error('Lỗi khi ứng tuyển:', error);
        res.status(500).json({ message: 'Lỗi server khi ứng tuyển' });
    }
};

export const getMyApplications = async (req, res) => {
    try {
        const userId = req.user.id;
        const applications = await ApplicationModel.getByUser(userId);
        res.status(200).json(applications);
    } catch (error) {
        console.error('Lỗi lấy danh sách ứng tuyển:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

export const deleteMyApplication = async (req, res) => {
    try {
        const userId = req.user.id;
        const appId = req.params.id;
        
        const success = await ApplicationModel.deleteByUser(appId, userId);
        
        if (!success) {
            return res.status(404).json({ message: 'Không tìm thấy đơn ứng tuyển hoặc bạn không có quyền xóa' });
        }
        
        res.status(200).json({ message: 'Đã xóa đơn ứng tuyển thành công' });
    } catch (error) {
        console.error('Lỗi khi xóa đơn ứng tuyển:', error);
        res.status(500).json({ message: 'Lỗi server khi xóa đơn ứng tuyển' });
    }
};
