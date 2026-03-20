import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('candidate');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const otpRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    
    // Only allow numbers for OTP
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      // Gọi API đăng ký
      // const response = await registerApi({ role, fullName, email, otp: otp.join(''), password });
      
      // Giả lập đăng ký thành công
      setTimeout(() => {
        navigate('/login');
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message || 'Đã có lỗi xảy ra khi đăng ký');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white text-black antialiased">
      <section className="w-full max-w-md space-y-8">
        {/* Header Section */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Tạo tài khoản</h1>
          <p className="text-sm text-gray-500">Nhập thông tin bên dưới để bắt đầu với HireMind</p>
        </header>

        {/* SignUpForm */}
        <div className="space-y-6">
          {/* RoleSelection */}
          <div className="bg-gray-100 p-1 rounded-lg flex relative" data-purpose="role-selector">
            <div className="flex-1">
              <input 
                checked={role === 'candidate'}
                onChange={() => setRole('candidate')}
                className="hidden role-tab" 
                id="candidate" 
                name="role" 
                type="radio" 
                value="candidate"
              />
              <label 
                className="block text-center py-2 text-sm font-medium rounded-md cursor-pointer transition-all text-gray-500" 
                htmlFor="candidate"
              >
                Ứng viên
              </label>
            </div>
            <div className="flex-1">
              <input 
                checked={role === 'employer'}
                onChange={() => setRole('employer')}
                className="hidden role-tab" 
                id="employer" 
                name="role" 
                type="radio" 
                value="employer"
              />
              <label 
                className="block text-center py-2 text-sm font-medium rounded-md cursor-pointer transition-all text-gray-500" 
                htmlFor="employer"
              >
                Nhà tuyển dụng
              </label>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
            
            {/* Dynamic Name Field based on Role */}
            {role === 'candidate' ? (
              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="full-name">Họ và tên</label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm" 
                  id="full-name" 
                  name="full-name" 
                  placeholder="Nguyễn Văn A" 
                  required={role === 'candidate'} 
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                />
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="company-name">Tên công ty</label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm" 
                  id="company-name" 
                  name="company-name" 
                  placeholder="Công ty TNHH AI Recruitment" 
                  required={role === 'employer'} 
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}
            
            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm" 
                id="email" 
                name="email" 
                placeholder="name@example.com" 
                required 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            
            {/* OTPSection */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium block">Mã xác nhận OTP</label>
                <button className="text-xs text-gray-500 hover:text-black underline" type="button" disabled={loading}>
                  Gửi lại mã
                </button>
              </div>
              <div className="flex gap-2 justify-between" id="otp-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    className="otp-input w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    maxLength={1}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    disabled={loading}
                  />
                ))}
              </div>
            </div>
            
            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="password">Mật khẩu</label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm" 
                id="password" 
                name="password" 
                placeholder="••••••••" 
                required 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            
            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="confirm-password">Xác nhận mật khẩu</label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm" 
                id="confirm-password" 
                name="confirm-password" 
                placeholder="••••••••" 
                required 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            
            {/* Submit Button */}
            <button 
              className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors duration-200 mt-6 shadow-sm disabled:opacity-50" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm text-gray-500">
            Đã có tài khoản?{' '}
            <Link className="font-medium text-black hover:underline" to="/login">
              Đăng nhập ngay
            </Link>
          </p>
        </div>

        {/* Terms */}
        <footer className="text-center text-xs text-gray-400">
          Bằng cách nhấn vào nút Tạo tài khoản, bạn đồng ý với{' '}
          <Link className="underline hover:text-gray-600" to="/terms">Điều khoản dịch vụ</Link> 
          {' '}và <Link className="underline hover:text-gray-600" to="/privacy">Chính sách bảo mật</Link> của chúng tôi.
        </footer>
      </section>
    </main>
  );
};

export default RegisterPage;
