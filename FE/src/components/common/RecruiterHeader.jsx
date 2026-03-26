import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, removeUser } from '@/utils/authUtils';

const RecruiterHeader = ({ user, children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };

  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center px-8 shrink-0 z-10 hidden sm:flex">
      {children}
      <div className="flex items-center gap-4 ml-auto">
        <button className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-full transition-all relative">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
          <span className="absolute top-2 right-2 size-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
        <div className="relative group">
          <div className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:border-slate-300 transition-all bg-slate-50 cursor-pointer">
            <span className="text-xs font-semibold px-2">Hồ sơ HR</span>
            <div className="size-8 rounded-full bg-slate-900 flex items-center justify-center">
              <span className="material-symbols-outlined text-sm text-white">person</span>
            </div>
          </div>
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="p-2 space-y-1">
              <Link to="/recruiter/profile" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined text-[18px]">account_circle</span>
                Thông tin công ty
              </Link>
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-rose-600 rounded-md hover:bg-rose-50 transition-colors">
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default RecruiterHeader;
