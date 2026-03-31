import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, removeToken, removeUser } from '@/utils/authUtils';
import jobService from '@/services/jobService';
import RecruiterSidebar from '@/components/common/RecruiterSidebar';
import RecruiterHeader from '@/components/common/RecruiterHeader';

const RecruiterJobs = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'open', 'closed', 'draft'

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await jobService.getRecruiterJobs();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching recruiter jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tin tuyển dụng này?')) {
      try {
        await jobService.deleteJob(id);
        setJobs(jobs.filter(job => job.id !== id));
        alert('Đã xóa tin tuyển dụng thành công.');
      } catch (error) {
        alert('Lỗi khi xóa tin tuyển dụng.');
      }
    }
  };

  const handleToggleStatus = async (job) => {
    const newStatus = job.status === 'open' ? 'closed' : 'open';
    const confirmMsg = newStatus === 'closed' ? 
      'Bạn có chắc chắn muốn đóng tin tuyển dụng này? (Tin sẽ không hiển thị với ứng viên)' : 
      'Bạn có muốn mở lại tin tuyển dụng này?';
    
    if (window.confirm(confirmMsg)) {
      try {
        await jobService.updateJob(job.id, { status: newStatus });
        setJobs(jobs.map(j => j.id === job.id ? { ...j, status: newStatus } : j));
      } catch (error) {
        alert('Lỗi khi cập nhật trạng thái.');
      }
    }
  };

  const filteredJobs = jobs.filter(job => {
    if (activeFilter === 'all') return true;
    return job.status === activeFilter;
  });

  return (
    <div className="bg-slate-50 text-slate-900 h-screen flex font-display antialiased overflow-hidden">
      
      <RecruiterSidebar activeTab="jobs" user={user} />

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <RecruiterHeader user={user} />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto w-full">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 w-full">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-900">Tin tuyển dụng của tôi</h1>
                <p className="text-slate-500 text-[15px]">Quản lý các vị trí đang tuyển dụng và theo dõi ứng viên.</p>
              </div>
              <div className="flex shrink-0 mt-4 sm:mt-0">
                <Link to="/recruiter/post-job" className="px-6 py-3 text-sm font-bold bg-primary text-white hover:opacity-90 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  Đăng tin mới
                </Link>
              </div>
            </div>

            {/* Dashboard Filters */}
            <div className="mb-6 flex flex-wrap items-center border-b border-slate-200 gap-x-8 gap-y-4">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`pb-3 text-[14px] transition-colors ${activeFilter === 'all' ? 'font-bold text-slate-900 border-b-2 border-slate-900' : 'font-semibold text-slate-500 hover:text-slate-900'}`}>
                Tất cả ({jobs.length})
              </button>
              <button 
                onClick={() => setActiveFilter('open')}
                className={`pb-3 text-[14px] transition-colors ${activeFilter === 'open' ? 'font-bold text-slate-900 border-b-2 border-slate-900' : 'font-semibold text-slate-500 hover:text-slate-900'}`}>
                Đang hoạt động ({jobs.filter(j => j.status === 'open').length})
              </button>
              <button 
                onClick={() => setActiveFilter('closed')}
                className={`pb-3 text-[14px] transition-colors ${activeFilter === 'closed' ? 'font-bold text-slate-900 border-b-2 border-slate-900' : 'font-semibold text-slate-500 hover:text-slate-900'}`}>
                Đã đóng ({jobs.filter(j => j.status === 'closed').length})
              </button>
            </div>

            {/* Jobs Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <th className="px-8 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500">Công việc</th>
                      <th className="px-6 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500">Địa điểm</th>
                      <th className="px-6 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500">Ngày đăng</th>
                      <th className="px-6 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500 text-center">Ứng viên</th>
                      <th className="px-8 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="px-8 py-10 text-center text-slate-500">Đang tải dữ liệu...</td>
                      </tr>
                    ) : filteredJobs.length > 0 ? (
                      filteredJobs.map(job => (
                        <tr key={job.id} className={`group hover:bg-slate-50/80 transition-colors ${job.status === 'closed' ? 'opacity-60 bg-slate-50/30' : ''}`}>
                          <td className="px-8 py-6">
                            <div className="flex flex-col gap-1">
                              <Link to={`/recruiter/jobs/${job.id}`} className="font-bold text-[15px] text-slate-900 group-hover:text-primary transition-colors">
                                {job.title}
                              </Link>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-medium text-slate-400">Mã: JOB-{job.id}</span>
                                {job.status === 'closed' && (
                                  <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-500 uppercase font-bold">Đã đóng</span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-6 text-slate-600 font-medium">{job.location}</td>
                          <td className="px-6 py-6 text-slate-600 font-medium">{new Date(job.created_at).toLocaleDateString('vi-VN')}</td>
                          <td className="px-6 py-6 text-center">
                            <span className="inline-flex items-center justify-center font-bold text-[15px] text-slate-800">{job.application_count || 0}</span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-2.5">
                              <Link to={`/recruiter/jobs/${job.id}/candidates`} className="flex h-9 px-4 items-center text-[13px] font-bold bg-slate-900 text-white rounded-lg hover:bg-primary hover:shadow-md transition-all shadow-sm whitespace-nowrap">Xem ứng viên</Link>
                              <Link to={`/recruiter/jobs/${job.id}`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/50 hover:bg-slate-50 transition-colors" title="Xem chi tiết">
                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                              </Link>
                              <Link to={`/recruiter/jobs/${job.id}/edit`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/50 hover:bg-slate-50 transition-colors" title="Chỉnh sửa">
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                              </Link>
                              <button onClick={() => handleToggleStatus(job)} className={`flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 transition-colors ${job.status === 'open' ? 'text-amber-500 hover:bg-amber-50 hover:border-amber-200' : 'text-emerald-500 hover:bg-emerald-50 hover:border-emerald-200'}`} title={job.status === 'open' ? 'Đóng tin' : 'Mở lại tin'}>
                                <span className="material-symbols-outlined text-[18px]">{job.status === 'open' ? 'block' : 'publish'}</span>
                              </button>
                              <button onClick={() => handleDeleteJob(job.id)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-rose-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors" title="Xóa">
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-8 py-10 text-center text-slate-500">
                          {activeFilter === 'all' ? 'Bạn chưa đăng tin tuyển dụng nào.' : 'Không có tin tuyển dụng nào phù hợp với bộ lọc.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterJobs;
