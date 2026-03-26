import { Router } from 'express';
import JobController from '../controllers/jobController.js';
import authMiddleware from '../middlewares/auth.js';

const router = Router();

// Public routes
router.get('/', JobController.getAllJobs);
router.get('/:id', JobController.getJobById);

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

export default router;
