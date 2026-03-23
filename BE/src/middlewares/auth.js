import { verifyToken as verifyJwt } from '../config/jwt.js';

export const authMiddleware = {
    // 1. Kiểm tra token có hợp lệ không
    verifyToken(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Không có token hoặc định dạng token không hợp lệ (cần Bearer token)' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyJwt(token);

        if (!decoded) {
            return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
        }

        // Gán thông tin user (đã giải mã từ token) vào req để các middleware/controller sau sử dụng
        req.user = decoded;
        next();
    },

    // 2. Kiểm tra quyền Admin
    isAdmin(req, res, next) {
        // Trong DB.md, role là ENUM('candidate','recruiter','admin')
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập (Yêu cầu quyền Admin)' });
        }
        next();
    },

    // 3. Kiểm tra quyền Recruiter (Nhà tuyển dụng)
    isRecruiter(req, res, next) {
        if (!req.user || req.user.role !== 'recruiter') {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập (Yêu cầu quyền Nhà tuyển dụng)' });
        }
        next();
    },

    // 4. Kiểm tra quyền Candidate (Ứng viên)
    isCandidate(req, res, next) {
        if (!req.user || req.user.role !== 'candidate') {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập (Yêu cầu quyền Ứng viên)' });
        }
        next();
    },
    
    // 5. Cho phép Admin HOẶC Recruiter (ví dụ để xem thông tin ứng viên)
    isAdminOrRecruiter(req, res, next) {
        if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'recruiter')) {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
        }
        next();
    }
};

export default authMiddleware;
