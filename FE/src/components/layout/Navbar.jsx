import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, removeToken, removeUser } from '@/utils/authUtils';

const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8 flex-1">
          <Link className="flex items-center gap-2 group" to="/">
            <div className="bg-primary text-white p-1 rounded">
              <span className="material-symbols-outlined block text-[20px]">temp_preferences_custom</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">HireMind</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" to="/">Home</Link>
          <Link className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" to="/jobs">Tuyển dụng</Link>
        </nav>
        <div className="flex items-center gap-4 flex-1 justify-end">
          <button className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-full transition-all">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
          </button>
          <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
          {user ? (
            <div className="relative group">
              <div className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:border-slate-300 transition-all bg-slate-50 cursor-pointer">
                <span className="text-xs font-semibold px-2">Hồ sơ</span>
                <div className="size-8 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm text-slate-500">person</span>
                </div>
              </div>
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2 space-y-1">
                  <Link to={user.role === 'admin' ? "/admin/dashboard" : user.role === 'recruiter' ? "/recruiter/dashboard" : "/profile"} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-50 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">account_circle</span>
                    Quản lý tài khoản
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-rose-600 rounded-md hover:bg-rose-50 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="px-5 py-2 text-sm font-semibold rounded-full border border-slate-200 hover:border-slate-300 transition-all bg-slate-50">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
