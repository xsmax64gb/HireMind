import { Router } from 'express';
import { getProfile, updateProfile, changePassword } from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth.js';
import { getMyApplications, deleteMyApplication } from '../controllers/applicationController.js';

const router = Router();

router.get('/profile', authMiddleware.verifyToken, getProfile);
router.put('/profile', authMiddleware.verifyToken, updateProfile);
router.put('/change-password', authMiddleware.verifyToken, changePassword);
router.get('/applications', authMiddleware.verifyToken, getMyApplications);
router.delete('/applications/:id', authMiddleware.verifyToken, deleteMyApplication);

export default router;
