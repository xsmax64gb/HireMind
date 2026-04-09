import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/common/AdminSidebar';
import adminService from '@/services/adminService';
import { getUser } from '@/utils/authUtils';

const AdminJobs = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1, total: 0 });
  const [filters, setFilters] = useState({ search: '', status: '' });
  
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [pagination.page, filters.status]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await adminService.getJobs({
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search,
        status: filters.status
      });
      if (response && response.success) {
        setJobs(response.data);
        setPagination(prev => ({ ...prev, ...response.pagination }));
      } else if (response && response.data) { // Interceptor case where response IS the body
        setJobs(response.data);
        if (response.pagination) {
            setPagination(prev => ({ ...prev, ...response.pagination }));
        }
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách việc làm:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchJobs();
  };

  const openStatusModal = (job) => {
    setSelectedJob(job);
    setNewStatus(job.status);
    setShowStatusModal(true);
  };

  const openDeleteModal = (job) => {
    setSelectedJob(job);
    setShowDeleteModal(true);
  };

  const handleUpdateStatus = async () => {
    try {
      await adminService.updateJobStatus(selectedJob.id, newStatus);
      setShowStatusModal(false);
      fetchJobs();
    } catch (error) {
      alert(error.message || 'Có lỗi xảy ra');
    }
  };

  const handleDeleteJob = async () => {
    try {
      await adminService.deleteJob(selectedJob.id);
      setShowDeleteModal(false);
      fetchJobs();
    } catch (error) {
      alert(error.message || 'Có lỗi xảy ra');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100">Đang mở</span>;
      case 'closed':
        return <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-rose-50 text-rose-600 border border-rose-100">Đã đóng</span>;
      case 'draft':
        return <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-slate-100 text-slate-600 border border-slate-200">Nháp</span>;
      default:
        return <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-slate-100 text-slate-600 border border-slate-200">{status}</span>;
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex font-display antialiased">
      <AdminSidebar activeTab="jobs" />

      <main className="ml-64 flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center sticky top-0 z-40 shrink-0">
          <h2 className="text-[13px] font-semibold text-slate-500">
            Hệ thống / <span className="text-slate-900 font-bold">Quản lý Tin tuyển dụng</span>
          </h2>
        </header>

        <div className="p-8 lg:p-10 max-w-[1400px] mx-auto w-full">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">Quản lý Tin tuyển dụng</h1>
              <p className="text-slate-500 text-[14px]">Theo dõi và quản lý trạng thái của tất cả các tin tuyển dụng trên hệ thống.</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[600px]">
            {/* Toolbar */}
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">work</span>
                </div>
                <div>
                  <h3 className="text-[18px] font-bold tracking-tight text-slate-900">Danh sách việc làm</h3>
                  <p className="text-[13px] font-semibold text-slate-400">Có tổng cộng {pagination.total} bản ghi</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                  <input
                    type="text"
                    placeholder="Tìm kiếm công việc/công ty..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 text-[13px] font-medium bg-white border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </form>
                
                <select
                  value={filters.status}
                  onChange={(e) => {
                    setFilters({ ...filters, status: e.target.value });
                    setPagination(p => ({ ...p, page: 1 }));
                  }}
                  className="px-4 py-2 text-[13px] font-bold bg-white border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none text-slate-700 cursor-pointer"
                >
                  <option value="">Tất cả trạng thái</option>
                  <option value="open">Đang mở (Open)</option>
                  <option value="closed">Đã đóng (Closed)</option>
                  <option value="draft">Bản nháp (Draft)</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-1">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-white border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest whitespace-nowrap">ID</th>
                      <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest w-1/3">Công việc</th>
                      <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Tuyển dụng bởi</th>
                      <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest text-center">Deadline</th>
                      <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest text-center">Trạng thái</th>
                      <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jobs.length > 0 ? jobs.map(job => (
                      <tr key={job.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-6 py-4 text-[13px] font-bold text-slate-400">#{job.id}</td>
                        <td className="px-6 py-4">
                          <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{job.title}</p>
                          <p className="text-[12px] font-medium text-slate-500 mt-1">{job.location} • {job.employment_type}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-[13px] font-bold text-slate-700 max-w-[200px] truncate" title={job.company_name}>{job.company_name || 'N/A'}</p>
                          <p className="text-[11px] font-medium text-slate-400 mt-1 truncate max-w-[200px]" title={job.recruiter_name}>{job.recruiter_name}</p>
                        </td>
                        <td className="px-6 py-4 text-center text-[13px] font-medium text-slate-600">
                          {formatDate(job.deadline)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {getStatusBadge(job.status)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openStatusModal(job)}
                              title="Thay đổi trạng thái"
                              className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors border border-emerald-100"
                            >
                              <span className="material-symbols-outlined text-[18px]">build</span>
                            </button>
                            <button
                              onClick={() => openDeleteModal(job)}
                              title="Xóa việc làm"
                              className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-colors border border-rose-100"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center justify-center opacity-50">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
                            <p className="text-[15px] font-bold text-slate-500">Không tìm thấy việc làm nào.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/30">
                <span className="text-[13px] font-semibold text-slate-500">
                  Trang <span className="text-slate-900 font-bold">{pagination.page}</span> / {pagination.totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={pagination.page === 1}
                    onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-white hover:text-primary hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                  >
                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                  </button>
                  <button
                    disabled={pagination.page === pagination.totalPages}
                    onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-white hover:text-primary hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                  >
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      {showStatusModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col font-display border border-slate-100 animate-in fade-in zoom-in duration-200">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-[16px] text-slate-900">Cập nhật trạng thái</h3>
              <button 
                onClick={() => setShowStatusModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6">
              <p className="text-[13px] text-slate-600 mb-4 font-medium">Chọn trạng thái mới cho công việc <strong className="text-slate-900">{selectedJob.title}</strong>:</p>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-bold text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                <option value="open">Đang mở (Open)</option>
                <option value="closed">Đã đóng (Closed)</option>
                <option value="draft">Bản nháp (Draft)</option>
              </select>
            </div>
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setShowStatusModal(false)}
                className="px-5 py-2.5 text-[13px] font-bold text-slate-600 hover:bg-slate-200/50 rounded-xl transition-colors bg-white border border-slate-200"
              >
                Hủy
              </button>
              <button 
                onClick={handleUpdateStatus}
                className="px-5 py-2.5 text-[13px] font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm transition-all shadow-primary/25"
              >
                Lưu Thay Đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col font-display border border-slate-100 animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-200">
                <span className="material-symbols-outlined text-[32px]">warning</span>
              </div>
              <h3 className="font-extrabold text-[18px] text-slate-900 mb-2">Xóa công việc này?</h3>
              <p className="text-[14px] text-slate-500 font-medium">Hành động này sẽ xóa vĩnh viễn tin <strong className="text-slate-800">"{selectedJob.title}"</strong> và toàn bộ hồ sơ ứng tuyển liên quan. Không thể hoàn tác!</p>
            </div>
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 text-[13px] font-bold text-slate-600 hover:bg-slate-200/50 rounded-xl transition-colors bg-white border border-slate-200"
              >
                Hủy
              </button>
              <button 
                onClick={handleDeleteJob}
                className="flex-1 py-3 text-[13px] font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-sm transition-all shadow-rose-500/25"
              >
                Xóa Vĩnh Viễn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobs;
