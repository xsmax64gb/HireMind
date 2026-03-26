import bcrypt from 'bcryptjs';
import UserModel from '../models/userModel.js';
import { validateEmail, validatePassword, validateString } from '../utils/validator.js';
import { mailer } from '../config/nodemailer.js';
import { setOTP, getOTP, deleteOTP } from '../utils/otpStore.js';
import { generateToken, generateRefreshToken } from '../config/jwt.js';

// OTP generation
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
};

export const authController = {
    async register(req, res) {
        try {
            const { name, email, password, role } = req.body;

            // Validate inputs
            if (!validateString(name, 2, 100)) return res.status(400).json({ message: 'Tên không hợp lệ (2-100 ký tự).' });
            if (!validateEmail(email)) return res.status(400).json({ message: 'Email không hợp lệ.' });
            if (!validatePassword(password)) return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường và 1 số.' });
            if (!['candidate', 'recruiter'].includes(role)) return res.status(400).json({ message: 'Role phải là candidate hoặc recruiter.' });

            // Check if user exists
            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email đã được sử dụng.' });
            }

            // Hash password temporarily stored in memory
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Generate OTP
            const otpCode = generateOTP();

            // Store in memory (valid for 5 minutes)
            setOTP(email, { name, email, password: hashedPassword, role, otp: otpCode }, 5 * 60 * 1000);

            // Send email
            const mailOptions = {
                from: process.env.EMAIL_USER || 'lehuuthanhdatrin0409@gmail.com',
                to: email,
                subject: 'Xác thực đăng ký tài khoản HireMind',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                        <h2 style="color: #4A90E2; text-align: center;">Xác thực tài khoản HireMind</h2>
                        <p>Xin chào <strong>${name}</strong>,</p>
                        <p>Cảm ơn bạn đã đăng ký tài khoản tại HireMind. Vui lòng sử dụng mã OTP bên dưới để hoàn tất quá trình đăng ký:</p>
                        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333; border-radius: 5px; margin: 20px 0;">
                            ${otpCode}
                        </div>
                        <p style="color: #ff0000; font-size: 14px; margin-top: 20px;">* Mã OTP này sẽ hết hạn sau 5 phút.</p>
                        <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email.</p>
                        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                        <p style="font-size: 12px; color: #888; text-align: center;">Đội ngũ HireMind</p>
                    </div>
                `
            };

            await mailer.sendMail(mailOptions);

            return res.status(200).json({ 
                success: true,
                message: 'Mã xác thực đã được gửi tới email. Vui lòng kiểm tra hộp thư của bạn.' 
            });

        } catch (error) {
            console.error('Register error:', error);
            return res.status(500).json({ message: 'Lỗi server khi đăng ký.', error: error.message });
        }
    },

    async verifyRegisterOTP(req, res) {
        try {
            const { email, otp } = req.body;

            if (!email || !otp) {
                return res.status(400).json({ message: 'Vui lòng cung cấp email và mã OTP.' });
            }

            const storedData = getOTP(email);

            if (!storedData) {
                return res.status(400).json({ message: 'Mã OTP đã hết hạn hoặc không tồn tại. Vui lòng đăng ký lại.' });
            }

            if (storedData.otp !== otp) {
                return res.status(400).json({ message: 'Mã OTP không chính xác.' });
            }

            // Create user in DB
            const userId = await UserModel.create({
                name: storedData.name,
                email: storedData.email,
                password: storedData.password, // already hashed
                role: storedData.role
            });

            // Cleanup OTP
            deleteOTP(email);

            return res.status(201).json({ 
                success: true,
                message: 'Tài khoản đã được đăng ký và xác thực thành công!',
                userId 
            });

        } catch (error) {
            console.error('Verify OTP error:', error);
            return res.status(500).json({ message: 'Lỗi server khi xác thực OTP.', error: error.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Vui lòng cung cấp email và mật khẩu.' });
            }

            // Find user
            const user = await UserModel.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
            }

            // Check if user is active
            if (user.status !== 'active') {
                const statusMsg = user.status === 'banned' ? 'banned' : 'inactive';
                const vnMsg = user.status === 'banned' ? 'bị khóa' : 'đã ngừng hoạt động';
                return res.status(403).json({ message: `Tài khoản của bạn ${vnMsg}.` });
            }

            // Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
            }

            // Generate tokens
            const payload = { id: user.id, role: user.role };
            const accessToken = generateToken(payload);
            const refreshToken = generateRefreshToken(payload);

            // Removing password from user object before sending response
            const { password: _, ...userWithoutPassword } = user;

            return res.status(200).json({
                success: true,
                message: 'Đăng nhập thành công!',
                user: userWithoutPassword,
                accessToken,
                refreshToken
            });

        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ message: 'Lỗi server khi đăng nhập.', error: error.message });
        }
    },

    async forgotPassword(req, res) {
        try {
            const { email } = req.body;

            if (!validateEmail(email)) {
                return res.status(400).json({ message: 'Email không hợp lệ.' });
            }

            const user = await UserModel.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'Tài khoản không tồn tại trong hệ thống.' });
            }

            // Generate OTP
            const otpCode = generateOTP();

            // Store in memory (valid for 10 minutes for reset password)
            setOTP(email, { email, otp: otpCode, intent: 'reset_password' }, 10 * 60 * 1000);

            // Send email
            const mailOptions = {
                from: process.env.EMAIL_USER || 'lehuuthanhdatrin0409@gmail.com',
                to: email,
                subject: 'Mã xác thực khôi phục mật khẩu HireMind',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                        <h2 style="color: #4A90E2; text-align: center;">Khôi phục mật khẩu HireMind</h2>
                        <p>Xin chào <strong>${user.name}</strong>,</p>
                        <p>Bạn đã yêu cầu khôi phục mật khẩu. Dưới đây là mã OTP của bạn:</p>
                        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333; border-radius: 5px; margin: 20px 0;">
                            ${otpCode}
                        </div>
                        <p style="color: #ff0000; font-size: 14px; margin-top: 20px;">* Mã OTP này sẽ hết hạn sau 10 phút.</p>
                        <p>Nếu bạn không yêu cầu đổi mật khẩu, vui lòng bỏ qua email này.</p>
                        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                        <p style="font-size: 12px; color: #888; text-align: center;">Đội ngũ HireMind</p>
                    </div>
                `
            };

            await mailer.sendMail(mailOptions);

            return res.status(200).json({
                success: true,
                message: 'Mã xác thực khôi phục mật khẩu đã được gửi về email của bạn.'
            });

        } catch (error) {
            console.error('Forgot password error:', error);
            return res.status(500).json({ message: 'Lỗi server khi yêu cầu quên mật khẩu.', error: error.message });
        }
    },

    async resetPassword(req, res) {
        try {
            const { email, otp, newPassword } = req.body;

            if (!email || !otp || !newPassword) {
                return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ email, mã OTP và mật khẩu mới.' });
            }

            if (!validatePassword(newPassword)) {
                return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường và 1 số.' });
            }

            const storedData = getOTP(email);

            if (!storedData || storedData.intent !== 'reset_password') {
                return res.status(400).json({ message: 'Mã OTP đã hết hạn hoặc không tồn tại.' });
            }

            if (storedData.otp !== otp) {
                return res.status(400).json({ message: 'Mã OTP không chính xác.' });
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update in DB
            await UserModel.updatePassword(email, hashedPassword);

            // Cleanup OTP
            deleteOTP(email);

            return res.status(200).json({
                success: true,
                message: 'Khôi phục mật khẩu thành công. Bạn có thể đăng nhập bằng mật khẩu mới.'
            });

        } catch (error) {
            console.error('Reset password error:', error);
            return res.status(500).json({ message: 'Lỗi server khi khôi phục mật khẩu.', error: error.message });
        }
    }
};

export default authController;
