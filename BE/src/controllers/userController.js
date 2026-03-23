import UserModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { validateAge } from '../utils/validator.js';

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const userProfile = await UserModel.findById(userId);
        
        if (!userProfile) {
            return res.status(404).json({ message: 'Không tìm thấy thông tin người dùng' });
        }
        
        res.status(200).json(userProfile);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin profile:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        const updateData = req.body;
        
        // Validation for Date of Birth
        if (userRole === 'candidate' && updateData.date_of_birth) {
            if (!validateAge(updateData.date_of_birth, 18)) {
                return res.status(400).json({ message: 'Bạn phải đủ 18 tuổi trở lên để tham gia hệ thống.' });
            }
        }
        
        await UserModel.updateProfile(userId, userRole, updateData);
        
        res.status(200).json({ message: 'Cập nhật thông tin thành công' });
    } catch (error) {
        console.error('Lỗi khi cập nhật profile:', error);
        res.status(500).json({ message: 'Lỗi khi cập nhật thông tin' });
    }
};

export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;
        
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Vui lòng cung cấp mật khẩu cũ và mật khẩu mới' });
        }
        
        const user = await UserModel.findPasswordById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
        
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu hiện tại không chính xác' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        await UserModel.updatePasswordById(userId, hashedPassword);
        
        res.status(200).json({ message: 'Đổi mật khẩu thành công' });
    } catch (error) {
        console.error('Lỗi khi đổi mật khẩu:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};
