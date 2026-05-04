import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, removeToken, removeUser } from '@/utils/authUtils';
import Navbar from '@/components/layout/Navbar';
import UserSidebar from '@/components/common/UserSidebar';
import apiClient from '@/services/apiClient';
import { useState, useEffect } from 'react';

const ProfileApplications = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await apiClient.get('/users/applications');
        setApplications(data || []);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchApplications();
    }
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200/50 shadow-sm">
            Đang chờ
          </span>
        );
      case 'reviewed':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-600 border border-blue-200/50 shadow-sm">
            Đã xem xét
          </span>
        );
      case 'accepted':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-600 border border-green-200/50 shadow-sm">
            Chấp nhận
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-600 border border-red-200/50 shadow-sm">
            Từ chối
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200/50 shadow-sm">
            {status}
          </span>
        );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const handleDeleteApplication = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa đơn ứng tuyển này không? Hành động này không thể hoàn tác.')) return;
    
    try {
      await apiClient.delete(`/users/applications/${id}`);
      setApplications(applications.filter(app => app.id !== id));
      alert('Đã xóa đơn ứng tuyển thành công.');
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Có lỗi xảy ra khi xóa đơn ứng tuyển.');
    }
  };

  const getJobStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">OPEN</span>;
      case 'closed':
        return <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">CLOSED</span>;
      case 'deleted':
        return <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">DELETED</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 h-screen flex flex-col font-display antialiased">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto overflow-hidden bg-white shadow-sm border-x border-slate-200">
        <UserSidebar 
          user={user} 
          handleLogout={handleLogout} 
          profileName={user?.name || 'Người dùng'} 
        />

        {/* Main Content */}
        <main className="flex-1 bg-white p-12 overflow-y-auto">
          <div className="max-w-5xl">
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Đơn ứng tuyển của tôi</h1>
              <p className="text-slate-500 text-[15px]">Theo dõi trạng thái các công việc bạn đã ứng tuyển.</p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap items-center border-b border-slate-200 mb-8 w-full gap-x-8 gap-y-2">
              <button 
                onClick={() => setFilter('all')}
                className={`pb-3 text-[13px] font-bold transition-colors flex items-center gap-1.5 ${filter === 'all' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Tất cả
                <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md text-[10px]">{applications.length}</span>
              </button>
              <button 
                onClick={() => setFilter('pending')}
                className={`pb-3 text-[13px] font-bold transition-colors flex items-center gap-1.5 ${filter === 'pending' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Đang chờ
                <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md text-[10px]">{applications.filter(a => a.status === 'pending').length}</span>
              </button>
              <button 
                onClick={() => setFilter('reviewed')}
                className={`pb-3 text-[13px] font-bold transition-colors flex items-center gap-1.5 ${filter === 'reviewed' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Đã xem xét
                <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md text-[10px]">{applications.filter(a => a.status === 'reviewed').length}</span>
              </button>
              <button 
                onClick={() => setFilter('accepted')}
                className={`pb-3 text-[13px] font-bold transition-colors flex items-center gap-1.5 ${filter === 'accepted' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Chấp nhận
                <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md text-[10px]">{applications.filter(a => a.status === 'accepted').length}</span>
              </button>
              <button 
                onClick={() => setFilter('rejected')}
                className={`pb-3 text-[13px] font-bold transition-colors flex items-center gap-1.5 ${filter === 'rejected' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Từ chối
                <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md text-[10px]">{applications.filter(a => a.status === 'rejected').length}</span>
              </button>
            </div>

            {/* Application List */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-6">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-5 text-[11px] uppercase tracking-wider font-bold text-slate-500">Công việc</div>
                <div className="hidden md:block col-span-3 text-[11px] uppercase tracking-wider font-bold text-slate-500 text-center">Ngày ứng tuyển</div>
                <div className="hidden md:block col-span-2 text-[11px] uppercase tracking-wider font-bold text-slate-500 text-center">Trạng thái</div>
                <div className="hidden md:block col-span-2 text-[11px] uppercase tracking-wider font-bold text-slate-500 text-right pr-4">Thao tác</div>
              </div>

              <div className="divide-y divide-slate-100 bg-white">
                {loading ? (
                  <div className="p-12 flex flex-col items-center justify-center gap-4">
                    <div className="size-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-slate-400 text-sm font-medium">Đang tải danh sách đơn ứng tuyển...</p>
                  </div>
                ) : filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <div key={app.id} className="px-6 py-6 grid grid-cols-12 gap-4 items-center hover:bg-slate-50/50 transition-colors group">
                      <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                        <div className="size-12 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[20px] text-slate-400">domain</span>
                        </div>
                        <div className="flex flex-col truncate">
                          <div className="flex items-center gap-2 mb-0.5">
                            <Link to={`/jobs/${app.job_id}`} className="text-[14px] font-bold text-slate-900 truncate group-hover:text-primary transition-colors">
                              {app.job_title}
                            </Link>
                            {getJobStatusBadge(app.job_status)}
                          </div>
                          <span className="text-[12px] font-medium text-slate-500 truncate">{app.company_name || 'HireMind Partner'}</span>
                        </div>
                      </div>
                      <div className="hidden md:flex col-span-3 items-center justify-center">
                        <span className="text-[13px] text-slate-600 font-medium">{formatDate(app.applied_at)}</span>
                      </div>
                      <div className="hidden md:flex col-span-2 justify-center">
                        {getStatusBadge(app.status)}
                      </div>
                      <div className="hidden md:flex col-span-2 items-center justify-end gap-3">
                        <Link to={`/jobs/${app.job_id}`} className="text-[13px] font-bold text-slate-500 hover:text-primary transition-colors whitespace-nowrap">
                          Chi tiết
                        </Link>
                        <button 
                          onClick={() => handleDeleteApplication(app.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                          title="Xóa đơn ứng tuyển"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 flex flex-col items-center justify-center gap-4 text-center">
                    <span className="material-symbols-outlined text-5xl text-slate-200">assignment_late</span>
                    <p className="text-slate-400 text-sm font-medium">Bạn chưa có đơn ứng tuyển nào ở trạng thái này.</p>
                    <Link to="/jobs" className="text-primary text-[13px] font-bold hover:underline">Khám phá công việc ngay</Link>
                  </div>
                )}
              </div>
            </div>

            {/* Pagination / Footer */}
            <div className="flex items-center justify-between mt-4 px-2 tracking-tight">
              <p className="text-[12px] font-medium text-slate-400">Hiển thị {filteredApplications.length} trong tổng số {applications.length} đơn ứng tuyển</p>
              <div className="flex gap-1.5">
                <button className="size-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-400 cursor-not-allowed">
                  <span className="material-symbols-outlined text-[14px]">chevron_left</span>
                </button>
                <button className="size-8 rounded bg-primary text-white font-bold text-[12px] flex items-center justify-center shadow-md">1</button>
                <button className="size-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors font-semibold text-[12px] text-slate-600">2</button>
                <button className="size-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors font-semibold text-[12px] text-slate-600">3</button>
                <button className="size-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600">
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileApplications;
