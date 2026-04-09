import express from 'express';
import { adminController } from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// Tất cả các route bên dưới yêu cầu quyền Admin
router.use(authMiddleware.verifyToken);
router.use(authMiddleware.isAdmin);

// --- Dashboard ---
router.get('/dashboard', adminController.getDashboard);

// --- Candidate Management ---
router.get('/candidates', adminController.getCandidates);
router.get('/candidates/:id', adminController.getCandidateDetail);
router.put('/candidates/:id/status', adminController.updateCandidateStatus);
router.delete('/candidates/:id', adminController.deleteCandidate);

// --- Recruiter Management ---
router.get('/recruiters', adminController.getRecruiters);
router.get('/recruiters/:id', adminController.getRecruiterDetail);
router.put('/recruiters/:id/status', adminController.updateRecruiterStatus);
router.delete('/recruiters/:id', adminController.deleteRecruiter);

// --- Job Management ---
router.get('/jobs', adminController.getJobs);
router.put('/jobs/:id/status', adminController.updateJobStatus);
router.delete('/jobs/:id', adminController.deleteJob);

export default router;
