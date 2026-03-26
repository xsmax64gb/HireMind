import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const UserSidebar = ({ user, handleLogout, profileName }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50/50 shrink-0 flex flex-col py-8">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 w-full">
          <div className="size-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xl border border-slate-300 shadow-sm">
            {profileName ? profileName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="flex flex-col flex-1 truncate">
            <span className="text-[15px] font-bold text-slate-900 truncate">{profileName}</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold truncate">Premium Member</span>
          </div>
        </div>
      </div>

      <nav className="space-y-2 px-5 flex-1">
        <Link 
          to="/profile" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            currentPath === '/profile' 
              ? 'bg-slate-200/60 text-slate-900 font-bold' 
              : 'text-slate-500 hover:bg-slate-200/40 hover:text-slate-900 font-semibold'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">account_circle</span>
          <span className="text-[13px]">Hồ sơ</span>
        </Link>
        
        {user?.role === 'candidate' && (
          <>
            <Link 
              to="/profile/cv" 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPath === '/profile/cv' 
                  ? 'bg-slate-200/60 text-slate-900 font-bold' 
                  : 'text-slate-500 hover:bg-slate-200/40 hover:text-slate-900 font-semibold'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">description</span>
              <span className="text-[13px]">CV của tôi</span>
            </Link>
            <Link 
              to="/profile/applications" 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPath === '/profile/applications' 
                  ? 'bg-slate-200/60 text-slate-900 font-bold' 
                  : 'text-slate-500 hover:bg-slate-200/40 hover:text-slate-900 font-semibold'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">work</span>
              <span className="text-[13px]">Đơn ứng tuyển</span>
            </Link>
          </>
        )}

        <div className="pt-2 mt-2 border-t border-slate-200/50">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-bold"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span className="text-[13px]">Đăng xuất tài khoản</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default UserSidebar;
