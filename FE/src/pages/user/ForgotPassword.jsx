import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { forgotPasswordApi, resetPasswordApi } from '@/features/auth/api/authApi';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Nhập email, 2: Nhập OTP & Mật khẩu mới
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const otpRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    if (value && !/^\d+$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return setError('Vui lòng nhập email');
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await forgotPasswordApi({ email });
      setSuccess(response.message || 'Mã xác nhận đã được gửi thành công.');
      setStep(2);
    } catch (err) {
      setError(err?.message || 'Lỗi gửi mã OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Mật khẩu xác nhận không khớp');
    }
    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      return setError('Vui lòng nhập đủ 6 số OTP');
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await resetPasswordApi({ 
        email, 
        otp: otpValue, 
        newPassword: password 
      });
      setSuccess(response.message || 'Mật khẩu đã được cập nhật thành công!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err?.message || 'Có lỗi xảy ra khi đặt lại mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white text-black antialiased">
      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-black transition-all group"
      >
        <div className="h-8 w-8 rounded-full border border-zinc-200 flex items-center justify-center group-hover:border-black group-hover:bg-zinc-50 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </div>
        <span className="hidden sm:inline">Quay lại trang chủ</span>
      </Link>

      <section className="w-full max-w-md space-y-8">
        <header className="text-center space-y-2">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Link to="/" className="h-10 w-10 bg-black rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">H</span>
            </Link>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Quên mật khẩu</h1>
          <p className="text-sm text-zinc-500">
            {step === 1 ? 'Nhập email của bạn để nhận mã xác nhận' : 'Nhập mã xác nhận và mật khẩu mới của bạn'}
          </p>
        </header>

        <div className="space-y-6">
          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
              {success && <p className="text-green-500 text-sm font-medium text-center">{success}</p>}
              <div className="space-y-2 text-left">
                <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
                <input 
                  className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus-ring disabled:opacity-50" 
                  id="email" 
                  name="email" 
                  type="email"
                  placeholder="name@example.com" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <button 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-ring disabled:opacity-50 bg-black text-white hover:bg-zinc-800 h-10 px-4 py-2 w-full mt-2" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Đang gửi mã...' : 'Gửi mã xác nhận'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
              {success && <p className="text-green-500 text-sm font-medium text-center">{success}</p>}
              
              <div className="space-y-2 text-left">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium leading-none">Mã xác nhận OTP</label>
                </div>
                <div className="flex gap-2 justify-between mt-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      className="otp-input w-12 h-12 text-center text-lg font-semibold border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
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

              <div className="space-y-2 text-left mt-4">
                <label className="text-sm font-medium leading-none" htmlFor="password">Mật khẩu mới</label>
                <div className="relative">
                  <input 
                    className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus-ring disabled:opacity-50 pr-10" 
                    id="password" 
                    name="password" 
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-0 h-full flex items-center justify-center text-zinc-400 hover:text-black transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-left mt-2">
                <label className="text-sm font-medium leading-none" htmlFor="confirm-password">Xác nhận mật khẩu mới</label>
                <div className="relative">
                  <input 
                    className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus-ring disabled:opacity-50 pr-10" 
                    id="confirm-password" 
                    name="confirm-password" 
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••" 
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-0 h-full flex items-center justify-center text-zinc-400 hover:text-black transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showConfirmPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <button 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-ring disabled:opacity-50 bg-black text-white hover:bg-zinc-800 h-10 px-4 py-2 w-full mt-4" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
              </button>
              
              <div className="text-center mt-4">
                <button 
                  type="button" 
                  className="text-sm font-medium text-zinc-500 hover:text-black transition-colors"
                  onClick={() => setStep(1)}
                  disabled={loading}
                >
                  Quay lại bước nhập Email
                </button>
              </div>
            </form>
          )}

          <footer className="text-center pt-4 border-t border-zinc-200 mt-6">
            <p className="text-sm text-zinc-500">
              Nhớ ra mật khẩu rồi?{' '}
              <Link className="font-medium text-black hover:underline underline-offset-4 ml-1" to="/login">
                Quay lại đăng nhập
              </Link>
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
};

export default ForgotPasswordPage;
