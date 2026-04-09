import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/common/AdminSidebar';
import adminService from '@/services/adminService';
import { getUser, removeToken, removeUser } from '@/utils/authUtils';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [stats, setStats] = useState({
    users: { total: 0, candidates: 0, recruiters: 0, admins: 0 },
    jobs: 0,
    cvs: 0,
    applications: 0,
    recentUsers: [],
    recentJobs: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminService.getDashboardStats();
        if (response && response.success) {
          setStats(response.data);
        } else if (response && !response.success && response.data) {
           setStats(response.data);
        } else {
           setStats(response);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu admin dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const getInitials = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  const getTimeAgo = (date) => {
    if (!date) return '';
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} giây trước`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
  };

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="bg-slate-50 text-slate-900 min-h-screen flex font-display antialiased">
        <AdminSidebar />
        <div className="ml-64 flex-1 flex flex-col min-w-0 h-screen overflow-y-auto items-center justify-center">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex font-display antialiased">
      
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="ml-64 flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center sticky top-0 z-40 shrink-0">
          <h2 className="text-[13px] font-semibold text-slate-500">
            Hệ thống / <span className="text-slate-900 font-bold">Tổng quan Dashboard</span>
          </h2>
        </header>

        <div className="p-8 lg:p-10 space-y-8 max-w-[1400px] mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">Tổng quan thống kê</h1>
              <p className="text-slate-500 text-[14px]">Theo dõi các chỉ số hoạt động real-time của toàn bộ hệ thống.</p>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat Card 1 */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                 <span className="material-symbols-outlined text-[120px]">group</span>
              </div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="text-[14px] font-bold text-slate-500">Người dùng hệ thống</span>
                <span className="material-symbols-outlined text-blue-500 bg-blue-50 p-2.5 rounded-xl">person</span>
              </div>
              <div className="flex flex-col gap-3 relative z-10">
                <span className="text-4xl font-extrabold tracking-tight text-slate-900 leading-none">{stats?.users?.total?.toLocaleString() ?? 0}</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[12px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                    {stats?.users?.candidates} Ứng viên
                  </span>
                  <span className="text-[12px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md border border-violet-100">
                    {stats?.users?.recruiters} NTD
                  </span>
                </div>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                 <span className="material-symbols-outlined text-[120px]">work</span>
              </div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="text-[14px] font-bold text-slate-500">Tin tuyển dụng</span>
                <span className="material-symbols-outlined text-violet-500 bg-violet-50 p-2.5 rounded-xl">work</span>
              </div>
              <div className="flex items-end gap-3 relative z-10">
                <span className="text-4xl font-extrabold tracking-tight text-slate-900 leading-none">{stats?.jobs?.toLocaleString() ?? 0}</span>
                <span className="text-[12px] font-semibold text-slate-400 mb-1">Đã khởi tạo</span>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                 <span className="material-symbols-outlined text-[120px]">description</span>
              </div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="text-[14px] font-bold text-slate-500">CV đã lưu trữ</span>
                <span className="material-symbols-outlined text-orange-500 bg-orange-50 p-2.5 rounded-xl">upload_file</span>
              </div>
              <div className="flex items-end gap-3 relative z-10">
                <span className="text-4xl font-extrabold tracking-tight text-slate-900 leading-none">{stats?.cvs?.toLocaleString() ?? 0}</span>
                <span className="text-[12px] font-semibold text-slate-400 mb-1">Bản ghi</span>
              </div>
            </div>

            {/* Stat Card 4 */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                 <span className="material-symbols-outlined text-[120px]">assignment_turned_in</span>
              </div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="text-[14px] font-bold text-slate-500">Đơn ứng tuyển</span>
                <span className="material-symbols-outlined text-emerald-500 bg-emerald-50 p-2.5 rounded-xl">assignment_turned_in</span>
              </div>
              <div className="flex items-end gap-3 relative z-10">
                <span className="text-4xl font-extrabold tracking-tight text-slate-900 leading-none">{stats?.applications?.toLocaleString() ?? 0}</span>
                <span className="text-[12px] font-semibold text-slate-400 mb-1">Giao dịch</span>
              </div>
            </div>
          </div>

          {/* Recent Reports Area - Stacked vertically for better readability */}
          <div className="flex flex-col gap-8">
            
            {/* Recent Registered Users Section */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">person_add</span>
                  </div>
                  <h3 className="text-[16px] font-bold tracking-tight text-slate-900">Tài khoản mới đăng ký</h3>
                </div>
                <Link to="/admin/candidates" className="text-[13px] font-bold text-primary hover:underline">
                  Xem tất cả
                </Link>
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left">
                  <thead className="bg-white border-b border-slate-100 hidden sm:table-header-group">
                    <tr className="bg-white border-b border-slate-100">
                      <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest w-1/2">Người dùng</th>
                      <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest text-center">Vai trò</th>
                      <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest text-right">Lúc đăng ký</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stats?.recentUsers && stats.recentUsers.length > 0 ? stats.recentUsers.map((u, i) => {
                      const colors = ['blue', 'emerald', 'amber', 'rose', 'violet', 'sky', 'slate'];
                      const colorTheme = colors[i % colors.length];
                      return (
                        <tr key={u.id} className="hover:bg-slate-50/80 transition-colors group flex flex-col sm:table-row">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full bg-${colorTheme}-100 text-${colorTheme}-600 border border-${colorTheme}-200 flex items-center justify-center font-bold text-[13px] shrink-0`}>
                                {getInitials(u.name)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors truncate">{u.name}</p>
                                <p className="text-[11px] font-semibold text-slate-400 truncate">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 sm:text-center shrink-0">
                            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                                u.role === 'recruiter' ? 'bg-violet-50 text-violet-600 border-violet-100' : 
                                u.role === 'admin' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                'bg-sky-50 text-sky-600 border-sky-100'
                            }`}>
                                {u.role}
                            </span>
                          </td>
                          <td className="px-6 py-2 sm:py-4 text-[12px] font-medium text-slate-500 sm:text-right shrink-0">
                            {getTimeAgo(u.created_at)}
                          </td>
                        </tr>
                      );
                    }): (
                      <tr>
                        <td colSpan="3" className="px-6 py-8 text-center text-slate-500 text-[13px]">Chưa có dữ liệu.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Posted Jobs Section */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">post_add</span>
                  </div>
                  <h3 className="text-[16px] font-bold tracking-tight text-slate-900">Tin tuyển dụng mới cập nhật</h3>
                </div>
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left">
                  <thead className="bg-white border-b border-slate-100 hidden sm:table-header-group">
                    <tr className="bg-white border-b border-slate-100">
                      <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest w-1/2">Vị trí</th>
                      <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest text-center">Nhà tuyển dụng</th>
                      <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest text-right">Lúc đăng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stats?.recentJobs && stats.recentJobs.length > 0 ? stats.recentJobs.map((j, i) => {
                      const colors = ['slate', 'amber', 'emerald', 'sky', 'rose', 'violet', 'blue'];
                      const colorTheme = colors[i % colors.length];
                      return (
                        <tr key={j.id} className="hover:bg-slate-50/80 transition-colors group flex flex-col sm:table-row">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full bg-${colorTheme}-50 text-${colorTheme}-600 border border-${colorTheme}-100 flex items-center justify-center font-bold text-[13px] shrink-0`}>
                                <span className="material-symbols-outlined text-[20px]">work</span>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors truncate">{j.title}</p>
                                <p className="text-[11px] font-semibold text-slate-400 mt-1">ID: #{j.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 sm:text-center shrink-0">
                             <p className="text-[13px] font-bold text-slate-700">{j.recruiter_name}</p>
                          </td>
                          <td className="px-6 py-2 sm:py-4 text-[12px] font-medium text-slate-500 sm:text-right shrink-0">
                            {getTimeAgo(j.created_at)}
                          </td>
                        </tr>
                      );
                    }): (
                      <tr>
                        <td colSpan="3" className="px-6 py-8 text-center text-slate-500 text-[13px]">Chưa có dữ liệu.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
          
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
