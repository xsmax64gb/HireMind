import JobModel from '../models/jobModel.js';

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

            res.status(200).json({ message: 'Job deleted successfully' });
        } catch (error) {
            console.error('Delete job error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default JobController;
