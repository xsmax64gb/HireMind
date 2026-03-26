import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginApi } from '@/features/auth/api/authApi';
import { setToken, setUser } from '@/utils/authUtils';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng điền đủ thông tin');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await loginApi({ email, password });
      
      // Save tokens and user info
      if (response.accessToken) {
        setToken(response.accessToken);
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        setUser(response.user);
        
        // Redirect based on role
        if (response.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (response.user.role === 'recruiter') {
          navigate('/recruiter/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError('Đăng nhập thất bại: Không nhận được token.');
      }
    } catch (err) {
      setError(err?.message || 'Sai thông tin đăng nhập hoặc lỗi server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-white text-black antialiased">
      <div className="w-full max-w-md space-y-8">
        {/* Header Section */}
        <header className="text-center space-y-2">
          <div className="flex justify-center mb-6">
            <div className="h-10 w-10 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Chào mừng trở lại</h1>
          <p className="text-sm text-zinc-500">Nhập thông tin của bạn để truy cập tài khoản HireMind</p>
        </header>

        {/* SignInForm */}
        <section className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
            
            {/* Email Field */}
            <div className="space-y-2 text-left">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                Email
              </label>
              <input 
                className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-ring disabled:cursor-not-allowed disabled:opacity-50" 
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
            
            {/* Password Field */}
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none" htmlFor="password">
                  Mật khẩu
                </label>
                <Link className="text-sm font-medium text-zinc-500 hover:text-black transition-colors" to="/forgot-password">
                  Quên mật khẩu?
                </Link>
              </div>
              <input 
                className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-ring disabled:cursor-not-allowed disabled:opacity-50" 
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
            
            {/* Submit Button */}
            <button 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-zinc-800 h-10 px-4 py-2 w-full" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>
        </section>

        {/* Footer Links */}
        <footer className="text-center">
          <p className="text-sm text-zinc-500">
            Chưa có tài khoản? 
            <Link className="font-medium text-black hover:underline underline-offset-4 ml-1" to="/register">
              Đăng ký ngay
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
};

export default LoginPage;
