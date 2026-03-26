import { verifyToken as verifyJwt } from '../config/jwt.js';
import { pool } from '../config/db.js';

export const authMiddleware = {
    // 1. Kiểm tra token có hợp lệ không
    async verifyToken(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Không có token hoặc định dạng token không hợp lệ (cần Bearer token)' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyJwt(token);

        if (!decoded) {
            return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
        }

        // Check user status from database
        try {
            const [rows] = await pool.execute('SELECT status, role FROM users WHERE id = ?', [decoded.id]);
            const user = rows[0];

            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại.' });
            }

            if (user.status !== 'active' && user.role !== 'admin') { // Allow admin to login anyway? No, maybe admin should be active too.
                // Let's bar anyone not active, except maybe during some specific flows? No, "không dùng được web"
                const vnMsg = user.status === 'banned' ? 'bị khóa' : 'đã ngừng hoạt động';
                return res.status(403).json({ message: `Tài khoản của bạn ${vnMsg}.` });
            }

            // Gán thông tin user (đã giải mã từ token) vào req
            req.user = decoded;
            next();
        } catch (error) {
            console.error('Middleware check status error:', error);
            return res.status(500).json({ message: 'Lỗi server khi xác thực quyền truy cập.' });
        }
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
