import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getUser, removeToken, removeUser } from '@/utils/authUtils';
import jobService from '@/services/jobService';
import RecruiterSidebar from '@/components/common/RecruiterSidebar';
import RecruiterHeader from '@/components/common/RecruiterHeader';

const RecruiterJobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getUser();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await jobService.getJobById(id);
        setJob(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);


  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };


  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
        <p className="text-slate-500 mb-4">Không tìm thấy thông tin công việc.</p>
        <Link to="/recruiter/jobs" className="text-primary font-bold">Quay lại danh sách</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 text-slate-900 h-screen flex font-display antialiased overflow-hidden">
      <RecruiterSidebar activeTab="jobs" user={user} />

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <RecruiterHeader user={user}>
          <div className="flex items-center gap-4">
            <Link to="/recruiter/jobs" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-bold">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              Quay lại danh sách
            </Link>
          </div>
        </RecruiterHeader>

        <main className="flex-1 p-6 lg:p-12 overflow-y-auto w-full">
          <div className="max-w-[1400px] mx-auto space-y-8 pb-12">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Chi tiết tin tuyển dụng</h1>
                <p className="text-slate-500 text-[15px]">Xem thông tin chi tiết và danh sách ứng viên của vị trí này.</p>
              </div>
              <div className="flex items-center gap-3">
                <Link 
                  to="/recruiter/interviews"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[14px] bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">quiz</span>
                  Quản lý bộ câu hỏi
                </Link>
              </div>
            </div>
            {/* Main Info Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
              <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${job.status === 'open' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                      {job.status === 'open' ? 'Đang hoạt động' : 'Đã đóng'}
                    </span>
                    <span className="text-slate-400 text-xs font-medium">• Đăng ngày {new Date(job.created_at).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{job.title}</h1>
                  <p className="text-lg text-slate-600 font-medium mb-4">{job.company_name}</p>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span className="material-symbols-outlined text-[18px]">work</span>
                      {job.employment_type === 'fulltime' ? 'Toàn thời gian' : job.employment_type === 'parttime' ? 'Bán thời gian' : job.employment_type === 'intern' ? 'Thực tập' : 'Freelance'}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span className="material-symbols-outlined text-[18px]">payments</span>
                      {job.salary_min && job.salary_max ? `${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()} ${job.currency}` : 'Thỏa thuận'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-100 min-w-[160px]">
                  <span className="text-3xl font-black text-primary mb-1">{job.application_count || 0}</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Ứng viên <br/> đã nộp</span>
                  <Link to={`/recruiter/jobs/${job.id}/candidates`} className="mt-4 text-xs font-bold text-primary hover:underline">Xem danh sách</Link>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">psychology</span>
                  Kỹ năng yêu cầu
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills && job.skills.length > 0 ? job.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">
                      {skill}
                    </span>
                  )) : <span className="text-slate-400 italic text-sm">Chưa cập nhật kỹ năng</span>}
                </div>
              </div>
            </div>

            {/* Content Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <section className="bg-white rounded-2xl border border-slate-200 p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-50">Mô tả công việc</h3>
                  <div className="text-slate-600 text-[15px] leading-relaxed whitespace-pre-line">
                    {job.description}
                  </div>
                </section>

                <section className="bg-white rounded-2xl border border-slate-200 p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-50">Yêu cầu ứng viên</h3>
                  <div className="text-slate-600 text-[15px] leading-relaxed whitespace-pre-line">
                    {job.requirements || 'Chưa cập nhật'}
                  </div>
                </section>

                <section className="bg-white rounded-2xl border border-slate-200 p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-50">Quyền lợi</h3>
                  <div className="text-slate-600 text-[15px] leading-relaxed whitespace-pre-line">
                    {job.benefits || 'Chưa cập nhật'}
                  </div>
                </section>

              </div>

              <div className="space-y-8 text-white">
                <div className="bg-slate-900 rounded-2xl p-8 sticky top-8 shadow-xl shadow-slate-200">
                   <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Chi tiết vị trí</h3>
                   <div className="space-y-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Cấp bậc</span>
                        <span className="text-sm font-bold uppercase">{job.experience_level}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Số lượng</span>
                        <span className="text-sm font-bold uppercase">{job.quantity} người</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Hạn chót</span>
                        <span className="text-sm font-bold uppercase">{job.deadline ? new Date(job.deadline).toLocaleDateString('vi-VN') : 'Không giới hạn'}</span>
                      </div>
                   </div>
                   
                   <div className="mt-10 pt-8 border-t border-slate-800">
                      <p className="text-[11px] text-slate-500 italic mb-4 leading-relaxed italic">AI của chúng tôi đang tự động phân tích các hồ sơ nộp vào dựa trên mô tả này.</p>
                      <Link to={`/recruiter/jobs/${job.id}/candidates`} className="w-full flex items-center justify-center gap-2 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">
                        <span className="material-symbols-outlined text-[20px]">group</span>
                        Xem ứng viên ngay
                      </Link>
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

export default RecruiterJobDetail;
