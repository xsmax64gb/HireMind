import express from 'express';
import MockInterviewController from '../controllers/mockInterviewController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.use(authMiddleware.verifyToken);

router.post('/start', MockInterviewController.startInterview);
router.post('/evaluate', MockInterviewController.evaluateAnswer);
router.get('/history', MockInterviewController.getHistory);
router.get('/status/:jobId', MockInterviewController.getInterviewStatus);
router.get('/:id', MockInterviewController.getInterview);

export default router;
