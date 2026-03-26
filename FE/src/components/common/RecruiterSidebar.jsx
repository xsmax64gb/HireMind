import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, removeUser } from '@/utils/authUtils';

const RecruiterSidebar = ({ activeTab, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };

  const navItems = [
    { id: 'dashboard', label: 'Tổng quan', path: '/recruiter/dashboard', icon: 'dashboard' },
    { id: 'profile', label: 'Hồ sơ công ty', path: '/recruiter/profile', icon: 'account_circle' },
    { id: 'post-job', label: 'Đăng tin tuyển dụng', path: '/recruiter/post-job', icon: 'post_add' },
    { id: 'jobs', label: 'Tin tuyển dụng', path: '/recruiter/jobs', icon: 'work' },
    { id: 'interviews', label: 'Tạo câu hỏi Phỏng vấn', path: '/recruiter/interviews', icon: 'quiz' },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white shrink-0 hidden lg:flex flex-col h-full z-20">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <Link className="flex items-center gap-2 group" to="/">
          <div className="bg-primary text-white p-1 rounded">
            <span className="material-symbols-outlined block text-[18px]">temp_preferences_custom</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">HireMind</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-semibold ${
              activeTab === item.id 
                ? 'bg-slate-100 text-primary font-bold' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span className="text-[13px]">{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="p-5 border-t border-slate-200 bg-slate-50/50">
        <div className="flex items-center gap-3 w-full">
          <div className="size-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-lg border border-slate-800 shadow-sm uppercase">
             {user?.name?.charAt(0) || 'R'}
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[13px] font-bold text-slate-900 truncate">{user?.name || 'Recruiter'}</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold truncate">{user?.position || 'HR Manager'}</span>
          </div>
          <button onClick={handleLogout} className="text-slate-400 hover:text-rose-600 transition-colors tooltip" title="Đăng xuất">
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default RecruiterSidebar;
