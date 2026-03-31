import { Router } from 'express';
import JobController from '../controllers/jobController.js';
import { applyForJob } from '../controllers/applicationController.js';
import authMiddleware from '../middlewares/auth.js';

const router = Router();

// Public routes
router.get('/', JobController.getAllJobs);
router.get('/:id', JobController.getJobById);

// Candidate routes
router.post('/:id/apply',
    authMiddleware.verifyToken,
    authMiddleware.isCandidate,
    applyForJob
);

// Protected routes (Recruiter only)
router.post('/', 
    authMiddleware.verifyToken, 
    authMiddleware.isRecruiter, 
    JobController.createJob
);

router.get('/recruiter/my-jobs', 
    authMiddleware.verifyToken, 
    authMiddleware.isRecruiter, 
    JobController.getRecruiterJobs
);

router.put('/:id', 
    authMiddleware.verifyToken, 
    authMiddleware.isRecruiter, 
    JobController.updateJob
);

router.delete('/:id', 
    authMiddleware.verifyToken, 
    authMiddleware.isRecruiter, 
    JobController.deleteJob
);

// Interview Questions Generation
router.post('/:id/generate-questions', 
    authMiddleware.verifyToken, 
    authMiddleware.isRecruiter, 
    JobController.generateInterviewQuestions
);

router.get('/:id/interview-questions', 
    authMiddleware.verifyToken, 
    authMiddleware.isRecruiter, 
    JobController.getJobInterviewQuestions
);

router.post('/:id/interview-questions/save',
    authMiddleware.verifyToken,
    authMiddleware.isRecruiter,
    JobController.saveInterviewQuestions
);

router.delete('/:id/interview-questions',
    authMiddleware.verifyToken,
    authMiddleware.isRecruiter,
    JobController.deleteAllInterviewQuestions
);

router.delete('/interview-questions/:questionId',
    authMiddleware.verifyToken,
    authMiddleware.isRecruiter,
    JobController.deleteInterviewQuestion
);

// Candidate management within a job
router.get('/:id/candidates',
    authMiddleware.verifyToken,
    authMiddleware.isRecruiter,
    JobController.getJobCandidates
);

router.put('/:id/applications/:applicationId/status',
    authMiddleware.verifyToken,
    authMiddleware.isRecruiter,
    JobController.updateApplicationStatus
);

export default router;
