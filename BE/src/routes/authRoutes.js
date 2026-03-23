import { Router } from 'express';
import authController from '../controllers/authController.js';

const router = Router();

router.post('/register', authController.register);
router.post('/verify-otp', authController.verifyRegisterOTP);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

export default router;
