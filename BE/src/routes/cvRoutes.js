import { Router } from 'express';
import { uploadCV, getMyCVs, deleteCV } from '../controllers/cvController.js';
import authMiddleware from '../middlewares/auth.js';
const { verifyToken, isCandidate } = authMiddleware;
import { uploadCV as multerUpload } from '../config/multer.js';

const router = Router();

router.post('/upload', verifyToken, isCandidate, multerUpload.single('file'), uploadCV);
router.get('/', verifyToken, isCandidate, getMyCVs);
router.delete('/:id', verifyToken, isCandidate, deleteCV);

export default router;
