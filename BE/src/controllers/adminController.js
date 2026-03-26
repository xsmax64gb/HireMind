import UserModel from '../models/userModel.js';

export const adminController = {
    // 1. Quản lý Ứng viên (Candidates)
    async getCandidates(req, res) {
        try {
            const { search, startDate, endDate, sort = 'desc', page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;

            const { users, total } = await UserModel.findAllCandidates({
                search,
                startDate,
                endDate,
                sort,
                limit: parseInt(limit),
                offset: parseInt(offset)
            });

            return res.status(200).json({
                success: true,
                data: users,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / limit)
                }
            });
        } catch (error) {
            console.error('Error fetching candidates:', error);
            return res.status(500).json({ message: 'Lỗi server khi lấy danh sách ứng viên.' });
        }
    },

    async getCandidateDetail(req, res) {
        try {
            const { id } = req.params;
            const user = await UserModel.findById(id);

            if (!user || user.role !== 'candidate') {
                return res.status(404).json({ message: 'Ứng viên không tồn tại.' });
            }

            return res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            console.error('Error fetching candidate detail:', error);
            return res.status(500).json({ message: 'Lỗi server khi lấy chi tiết ứng viên.' });
        }
    },

    async updateCandidateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!['active', 'inactive', 'banned'].includes(status)) {
                return res.status(400).json({ message: 'Trạng thái không hợp lệ.' });
            }

            // Check if user exists
            const user = await UserModel.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại.' });
            }

            await UserModel.updateStatus(id, status);

            return res.status(200).json({
                success: true,
                message: `Cập nhật trạng thái ứng viên ${user.name} thành ${status} thành công!`
            });
        } catch (error) {
            console.error('Error updating status:', error);
            return res.status(500).json({ message: 'Lỗi server khi cập nhật trạng thái.' });
        }
    },

    async deleteCandidate(req, res) {
        try {
            const { id } = req.params;

            // Check if user exists
            const user = await UserModel.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại.' });
            }

            await UserModel.deleteUser(id);

            return res.status(200).json({
                success: true,
                message: `Xóa tài khoản ${user.name} thành công!`
            });
        } catch (error) {
            console.error('Error deleting candidate:', error);
            return res.status(500).json({ message: 'Lỗi server khi xóa ứng viên.' });
        }
    },

    // 2. Quản lý Nhà tuyển dụng (Recruiters)
    async getRecruiters(req, res) {
        try {
            const { search, startDate, endDate, sort = 'desc', page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;

            const { users, total } = await UserModel.findAllRecruiters({
                search,
                startDate,
                endDate,
                sort,
                limit: parseInt(limit),
                offset: parseInt(offset)
            });

            return res.status(200).json({
                success: true,
                data: users,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / limit)
                }
            });
        } catch (error) {
            console.error('Error fetching recruiters:', error);
            return res.status(500).json({ message: 'Lỗi server khi lấy danh sách nhà tuyển dụng.' });
        }
    },

    async getRecruiterDetail(req, res) {
        try {
            const { id } = req.params;
            const user = await UserModel.findById(id);

            if (!user || user.role !== 'recruiter') {
                return res.status(404).json({ message: 'Nhà tuyển dụng không tồn tại.' });
            }

            return res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            console.error('Error fetching recruiter detail:', error);
            return res.status(500).json({ message: 'Lỗi server khi lấy chi tiết nhà tuyển dụng.' });
        }
    },

    async updateRecruiterStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!['active', 'inactive', 'banned'].includes(status)) {
                return res.status(400).json({ message: 'Trạng thái không hợp lệ.' });
            }

            const user = await UserModel.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại.' });
            }

            await UserModel.updateStatus(id, status);

            return res.status(200).json({
                success: true,
                message: `Cập nhật trạng thái nhà tuyển dụng ${user.name} thành ${status} thành công!`
            });
        } catch (error) {
            console.error('Error updating status:', error);
            return res.status(500).json({ message: 'Lỗi server khi cập nhật trạng thái.' });
        }
    },

    async deleteRecruiter(req, res) {
        try {
            const { id } = req.params;

            const user = await UserModel.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại.' });
            }

            await UserModel.deleteUser(id);

            return res.status(200).json({
                success: true,
                message: `Xóa tài khoản nhà tuyển dụng ${user.name} thành công!`
            });
        } catch (error) {
            console.error('Error deleting recruiter:', error);
            return res.status(500).json({ message: 'Lỗi server khi xóa nhà tuyển dụng.' });
        }
    }
};

export default adminController;
