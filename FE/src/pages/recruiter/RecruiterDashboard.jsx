import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, removeToken, removeUser } from '@/utils/authUtils';
import RecruiterSidebar from '@/components/common/RecruiterSidebar';
import RecruiterHeader from '@/components/common/RecruiterHeader';
import jobService from '@/services/jobService';

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [stats, setStats] = useState({
    totalCandidates: 0,
    activeJobs: 0,
    recentCandidates: [],
    popularJobs: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const data = await jobService.getRecruiterDashboard();
        if (data && !data.message) {
          setStats(data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };

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

  if (loading) {
    return (
      <div className="bg-slate-50 text-slate-900 h-screen flex font-display antialiased overflow-hidden">
        <RecruiterSidebar activeTab="dashboard" user={user} />
        <div className="flex-1 flex flex-col min-w-0 h-full">
          <RecruiterHeader user={user} />
          <main className="flex-1 p-6 lg:p-10 overflow-y-auto w-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 text-slate-900 h-screen flex font-display antialiased overflow-hidden">
      
      <RecruiterSidebar activeTab="dashboard" user={user} />

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <RecruiterHeader user={user} />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto w-full">
          <div className="max-w-6xl mx-auto w-full">
            
            {/* Greeting Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-900">Chào mừng trở lại, {user?.name || 'Nhà tuyển dụng'}! 👋</h1>
                <p className="text-slate-500 text-[15px]">Đây là tổng quan về tình hình tuyển dụng của bạn hôm nay.</p>
              </div>
              <div className="flex gap-3 shrink-0 mb-1">
                <Link to="/recruiter/post-job" className="px-5 py-2.5 text-[14px] font-bold bg-primary text-white hover:opacity-90 rounded-xl transition-all shadow-lg shadow-black/10 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Tạo tin mới
                </Link>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Metric 1 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                    <span className="material-symbols-outlined text-[24px]">people</span>
                  </div>
                  <span className="text-emerald-600 text-[12px] font-bold bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                    +12%
                  </span>
                </div>
                <div>
                  <h3 className="text-[28px] font-extrabold text-slate-900 leading-none mb-1">{stats?.totalCandidates?.toLocaleString() ?? 0}</h3>
                  <p className="text-[13px] font-semibold text-slate-500">Tổng ứng viên</p>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-xl bg-violet-50 text-violet-600">
                    <span className="material-symbols-outlined text-[24px]">work</span>
                  </div>
                  <span className="text-slate-500 text-[12px] font-bold bg-slate-100 px-2 py-0.5 rounded">Hiện tại</span>
                </div>
                <div>
                  <h3 className="text-[28px] font-extrabold text-slate-900 leading-none mb-1">{stats?.activeJobs?.toLocaleString() ?? 0}</h3>
                  <p className="text-[13px] font-semibold text-slate-500">Vị trí đang tuyển</p>
                </div>
              </div>
            </div>

            {/* Layout Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Recent Applicants */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex-1">
                  <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-[16px] text-slate-900">Ứng viên mới nhất</h3>
                    <Link to="/recruiter/jobs/1/candidates" className="text-[13px] font-bold text-primary hover:underline">Xem tất cả</Link>
                  </div>
                  <div className="p-2">
                    {stats?.recentCandidates && stats.recentCandidates.length > 0 ? stats.recentCandidates.map((applicant, index) => {
                      const colors = ['slate', 'blue', 'emerald', 'amber', 'rose', 'violet', 'sky'];
                      const colorTheme = colors[index % colors.length];
                      
                      let statusText = 'Đang chờ xử lý';
                      let bgStatus = 'bg-amber-50';
                      let textStatus = 'text-amber-700';
                      let dotStatus = 'bg-amber-500';

                      if (applicant.status === 'reviewed') {
                        statusText = 'Đã xem xét';
                        bgStatus = 'bg-sky-50';
                        textStatus = 'text-sky-700';
                        dotStatus = 'bg-sky-500';
                      } else if (applicant.status === 'interviewing') {
                        statusText = 'Phỏng vấn';
                        bgStatus = 'bg-emerald-50';
                        textStatus = 'text-emerald-700';
                        dotStatus = 'bg-emerald-500';
                      } else if (applicant.status === 'rejected') {
                        statusText = 'Đã từ chối';
                        bgStatus = 'bg-slate-100';
                        textStatus = 'text-slate-600';
                        dotStatus = 'bg-slate-400';
                      }

                      return (
                        <div key={applicant.id} onClick={() => navigate(`/recruiter/jobs/${applicant.job_id}/candidates`)} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer">
                          <div className={`size-10 rounded-full bg-${colorTheme}-100 flex items-center justify-center font-bold text-${colorTheme}-600 border border-${colorTheme}-200`}>
                            {getInitials(applicant.candidate_name)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-bold text-slate-900 truncate group-hover:text-primary transition-colors">{applicant.candidate_name}</p>
                            <p className="text-[12px] font-medium text-slate-500 truncate">Ứng tuyển: {applicant.job_title}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${bgStatus} ${textStatus} text-[11px] font-bold`}>
                              <span className={`size-1.5 rounded-full ${dotStatus}`}></span>
                              {statusText}
                            </span>
                            <p className="text-[11px] text-slate-400 font-medium mt-1">{getTimeAgo(applicant.applied_at)}</p>
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="p-8 text-center text-slate-500">
                        <p>Chưa có ứng viên nào.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Matching Banner */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-2xl shadow-md text-white flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <span className="material-symbols-outlined text-[100px]">auto_awesome</span>
                  </div>
                  <div className="relative z-10 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-yellow-400 text-[20px]">bolt</span>
                      <h3 className="font-bold text-[16px]">Gợi ý Ứng viên AI</h3>
                    </div>
                    <p className="text-slate-300 text-[13px] leading-relaxed">Hệ thống AI vừa tìm thấy 12 ứng viên thụ động cực kỳ phù hợp với vị trí Senior Frontend Developer của bạn.</p>
                  </div>
                  <button className="shrink-0 relative z-10 px-5 py-2.5 bg-white text-slate-900 text-[13px] font-bold rounded-xl hover:bg-slate-100 shadow-sm transition-colors">
                    Xem gợi ý ngay
                  </button>
                </div>
              </div>

              {/* Right Column: Upcoming Interviews & Tasks */}
              <div className="flex flex-col gap-6">

                {/* Popular Jobs */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-[16px] text-slate-900">Tin tuyển dụng nổi bật</h3>
                  </div>
                  <div className="p-2">
                    {stats?.popularJobs && stats.popularJobs.length > 0 ? stats.popularJobs.map((job, index) => {
                      const colors = ['emerald', 'blue', 'amber', 'rose', 'violet'];
                      const colorTheme = colors[index % colors.length];
                      // Randomize width for skeleton effect if we want, or just set it fixed. Let's make it fixed based on count.
                      const maxApp = Math.max(...stats.popularJobs.map(j => j.application_count), 1);
                      const width = Math.max(10, Math.floor((job.application_count / maxApp) * 100));

                      return (
                        <Link key={job.id} to={`/recruiter/jobs/${job.id}/candidates`} className="flex flex-col gap-1 p-3 hover:bg-slate-50 rounded-xl transition-colors group">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">{job.title}</span>
                            <span className={`text-[12px] font-bold text-${colorTheme}-600`}>{job.application_count} hồ sơ</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className={`bg-${colorTheme}-500 h-full`} style={{ width: `${width}%` }}></div>
                          </div>
                        </Link>
                      );
                    }) : (
                      <div className="p-4 text-center text-slate-500">
                        <p>Chưa có dữ liệu.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
