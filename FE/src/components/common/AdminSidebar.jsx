import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { removeToken, removeUser } from '@/utils/authUtils';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };

  const menuItems = [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      id: 'dashboard'
    },
    {
      path: '/admin/candidates',
      label: 'Quản lý Ứng viên',
      icon: 'group',
      id: 'candidates'
    },
    {
      path: '/admin/recruiters',
      label: 'Quản lý Nhà tuyển dụng',
      icon: 'badge',
      id: 'recruiters'
    },
    {
      path: '/admin/jobs',
      label: 'Quản lý tin tuyển dụng',
      icon: 'work',
      id: 'jobs'
    }
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col fixed h-full z-50">
      <div className="p-6 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">mindfulness</span>
          </div>
          <span className="font-bold text-xl tracking-tight uppercase">HireMind</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link 
              key={item.id}
              to={item.path} 
              className={`flex items-center gap-3 px-3 py-2.5 text-[14px] rounded-xl transition-colors ${
                isActive 
                  ? 'bg-slate-100 text-primary font-bold' 
                  : 'text-slate-500 font-semibold hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold overflow-hidden shadow-sm shrink-0">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-slate-900 truncate">Quản trị viên</p>
            <p className="text-[11px] font-semibold text-slate-500 truncate">admin@hiremind.vn</p>
          </div>
          <button 
            onClick={handleLogout}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex-shrink-0" 
            title="Đăng xuất"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
