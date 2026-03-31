import JobModel from '../models/jobModel.js';
import ApplicationModel from '../models/applicationModel.js';
import dotenv from 'dotenv';
dotenv.config();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

class JobController {
    static async createJob(req, res) {
        try {
            const recruiter_id = req.user.id;
            const jobData = { ...req.body, recruiter_id };
            
            // Basic validation
            if (!jobData.title || !jobData.description) {
                return res.status(400).json({ message: 'Title and Description are required' });
            }

            const jobId = await JobModel.create(jobData);
            
            // Generate embedding and save to Chroma
            try {
                const aiResponse = await fetch(`${AI_SERVICE_URL}/api/v1/job/embed`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        job_id: jobId.toString(),
                        job_title: jobData.title,
                        job_description: jobData.description,
                        requirements: jobData.requirements || '',
                        recruiter_id: recruiter_id.toString()
                    })
                });

                if (!aiResponse.ok) {
                    console.error('Failed to embed job to Chroma');
                } else {
                    await JobModel.updateEmbeddingStatus(jobId, jobId.toString());
                }
            } catch (aiError) {
                console.error('Error connecting to AI Service for embedding:', aiError);
            }

            res.status(201).json({
                message: 'Job posted successfully',
                jobId
            });
        } catch (error) {
            console.error('Create job error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getAllJobs(req, res) {
        try {
            const { search, location, type, level, limit, offset } = req.query;
            const { jobs, total } = await JobModel.findAll({
                search, location, type, level, 
                limit: parseInt(limit) || 10, 
                offset: parseInt(offset) || 0 
            });

            res.status(200).json({ jobs, total });
        } catch (error) {
            console.error('Get all jobs error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getRecruiterJobs(req, res) {
        try {
            const recruiter_id = req.user.id;
            const jobs = await JobModel.findByRecruiterId(recruiter_id);
            res.status(200).json(jobs);
        } catch (error) {
            console.error('Get recruiter jobs error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getJobById(req, res) {
        try {
            const { id } = req.params;
            const job = await JobModel.findById(id);
            
            if (!job) {
                return res.status(404).json({ message: 'Job not found' });
            }

            res.status(200).json(job);
        } catch (error) {
            console.error('Get job error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateJob(req, res) {
        try {
            const { id } = req.params;
            const recruiter_id = req.user.id;
            
            const updated = await JobModel.update(id, recruiter_id, req.body);
            
            if (!updated) {
                return res.status(404).json({ message: 'Job not found or unauthorized' });
            }

            res.status(200).json({ message: 'Job updated successfully' });
        } catch (error) {
            console.error('Update job error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteJob(req, res) {
        try {
            const { id } = req.params;
            const recruiter_id = req.user.id;
            
            const deleted = await JobModel.delete(id, recruiter_id);
            
            if (!deleted) {
                return res.status(404).json({ message: 'Job not found or unauthorized' });
            }

            // Sync with AI Service (delete from Chroma)
            try {
                const aiResponse = await fetch(`${AI_SERVICE_URL}/api/v1/job/${id}`, {
                    method: 'DELETE'
                });

                if (!aiResponse.ok) {
                    console.error(`AI Service Delete Error for job ${id}:`, await aiResponse.text());
                }
            } catch (aiError) {
                console.error(`AI Service Connection Error for job ${id} deletion:`, aiError);
            }

            res.status(200).json({ message: 'Job deleted successfully' });
        } catch (error) {
            console.error('Delete job error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async generateInterviewQuestions(req, res) {
        const { id } = req.params;
        const { skills } = req.body;
        const recruiter_id = req.user.id;
        try {
            const job = await JobModel.findById(id);
            if (!job || job.recruiter_id !== recruiter_id) {
                return res.status(404).json({ message: 'Job not found or unauthorized' });
            }

            const aiResponse = await fetch(`${process.env.AI_SERVICE_URL}/api/v1/interview/generate-questions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    job_id: id,
                    job_title: job.title,
                    job_description: job.description,
                    requirements: job.requirements,
                    skills: skills || []
                })
            });

            if (!aiResponse.ok) {
                const errorData = await aiResponse.json();
                console.error('AI Service Error:', errorData);
                throw new Error('AI Service error');
            }
            const data = await aiResponse.json();

            res.status(200).json({
                message: 'Questions generated successfully',
                questions: data.questions
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error generating questions' });
        }
    }

    static async saveInterviewQuestions(req, res) {
        const { id } = req.params;
        const { questions } = req.body; 
        const recruiter_id = req.user.id;
        try {
            const job = await JobModel.findById(id);
            if (!job || job.recruiter_id !== recruiter_id) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // Map evaluation_criteria to suggested_answer for DB
            const mapped = {};
            for (const cat of Object.keys(questions)) {
                mapped[cat] = questions[cat].map(q => ({
                    question: q.question,
                    suggested_answer: q.evaluation_criteria || q.suggested_answer,
                    tags: q.tags
                }));
            }

            await JobModel.saveInterviewQuestions(id, mapped);
            res.status(200).json({ message: 'Questions saved to bank successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error saving questions' });
        }
    }

    static async deleteInterviewQuestion(req, res) {
        const { questionId } = req.params;
        // Simple delete for now
        try {
            await JobModel.deleteInterviewQuestionById(questionId);
            res.status(200).json({ message: 'Question deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting question' });
        }
    }

    static async deleteAllInterviewQuestions(req, res) {
        const { id } = req.params;
        const recruiter_id = req.user.id;
        try {
            const job = await JobModel.findById(id);
            if (!job || job.recruiter_id !== recruiter_id) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            await JobModel.deleteInterviewQuestionsByJobId(id);
            res.status(200).json({ message: 'All questions deleted from bank' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting questions' });
        }
    }

    static async getJobInterviewQuestions(req, res) {
        try {
            const { id } = req.params;
            const recruiter_id = req.user.id;

            // Check if job exists and belongs to recruiter
            const job = await JobModel.findById(id);
            if (!job || job.recruiter_id !== recruiter_id) {
                return res.status(404).json({ message: 'Job not found or unauthorized' });
            }

            const questions = await JobModel.getInterviewQuestions(id);
            res.status(200).json(questions);
        } catch (error) {
            console.error('Get interview questions error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getJobCandidates(req, res) {
        try {
            const { id } = req.params;
            const recruiter_id = req.user.id;
            const candidates = await ApplicationModel.getByJobIdWithCandidates(id, recruiter_id);
            res.status(200).json(candidates);
        } catch (error) {
            console.error('Get job candidates error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateApplicationStatus(req, res) {
        try {
            const { id, applicationId } = req.params;
            const recruiter_id = req.user.id;
            const { status } = req.body;

            const updated = await ApplicationModel.updateStatus(applicationId, recruiter_id, status);
            
            if (!updated) {
                return res.status(404).json({ message: 'Application not found or unauthorized' });
            }

            res.status(200).json({ message: 'Status updated successfully' });
        } catch (error) {
            console.error('Update status error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default JobController;
