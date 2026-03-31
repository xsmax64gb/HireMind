import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import jobService from '@/services/jobService';
import apiClient from '@/services/apiClient';
import { getUser } from '@/utils/authUtils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const JobDetail = () => {
  const { id } = useParams();
  const user = getUser();
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCV, setSelectedCV] = useState("");
  const [cvs, setCvs] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiResult, setAiResult] = useState(null);
  
  // Apply Modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applySelectedCV, setApplySelectedCV] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để ứng tuyển.");
      return;
    }
    if (!applySelectedCV) return;
    try {
      setIsApplying(true);
      
      const payload = {
        cvId: applySelectedCV
      };

      // Tối ưu: Tận dụng lại kết quả AI nếu ứng viên ứng tuyển bằng chính CV đang xem phân tích
      if (aiResult && selectedCV === applySelectedCV) {
        payload.match_score = aiResult.match_score;
        payload.missing_skills = aiResult.improvements;
        payload.ai_feedback = aiResult.summary;
      }

      await apiClient.post(`/jobs/${job.id}/apply`, payload);
      alert('Ứng tuyển thành công! Nhà tuyển dụng sẽ xem xét hồ sơ của bạn.');
      setIsApplyModalOpen(false);
    } catch (error) {
      console.error('Error applying:', error);
      alert(error?.message || error?.response?.data?.message || 'Có lỗi xảy ra khi ứng tuyển. Vui lòng thử lại.');
    } finally {
      setIsApplying(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedCV || !job) return;
    try {
      setIsAnalyzing(true);
      const data = await apiClient.post(`/cvs/${selectedCV}/analyze`, {
        jobId: job.id
      });
      setAiResult(data);
      setIsAnalyzed(true);
    } catch (error) {
      console.error('Error analyzing CV:', error);
      alert('Có lỗi xảy ra khi phân tích CV. Vui lòng thử lại sau.');
    } finally {
      setIsAnalyzing(false);
    }
  };

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

    const fetchCVs = async () => {
      try {
        const data = await apiClient.get('/cvs');
        setCvs(data || []);
      } catch (error) {
        console.error('Error fetching CVs:', error);
      }
    };

    fetchJob();
    if (user) {
      fetchCVs();
    }
  }, [id]);

  const formatSalary = (min, max, currency) => {
    if (!min && !max) return 'Thỏa thuận';
    if (min && max) return `${min.toLocaleString()} - ${max.toLocaleString()} ${currency}`;
    if (min) return `Từ ${min.toLocaleString()} ${currency}`;
    if (max) return `Đến ${max.toLocaleString()} ${currency}`;
    return 'Thỏa thuận';
  };

  const getEmploymentTypeLabel = (type) => {
    const types = {
      'fulltime': 'Toàn thời gian',
      'parttime': 'Bán thời gian',
      'intern': 'Thực tập',
      'freelance': 'Freelance'
    };
    return types[type] || type;
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

  if (loading) {
    return (
      <div className="bg-background-light text-slate-900 min-h-screen flex flex-col font-display antialiased">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-8 flex-grow w-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="size-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">Đang tải thông tin công việc...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="bg-background-light text-slate-900 min-h-screen flex flex-col font-display antialiased">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-8 flex-grow w-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <span className="material-symbols-outlined text-6xl text-slate-300">work_off</span>
            <h2 className="text-2xl font-bold text-slate-900">Không tìm thấy công việc</h2>
            <p className="text-slate-500">Công việc này có thể đã bị xóa hoặc không còn tồn tại.</p>
            <Link to="/jobs" className="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
              Quay lại danh sách tuyển dụng
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background-light text-slate-900 min-h-screen flex flex-col font-display antialiased">
      <Navbar />
      {/* Breadcrumbs Row */}
      <div className="border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex text-xs text-slate-500 gap-2 items-center">
            <Link className="hover:text-primary" to="/">Trang chủ</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <Link className="hover:text-primary" to="/jobs">Tuyển dụng</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-primary font-medium">{job.title}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8 flex-grow w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-10 border-b border-slate-200">
          <div className="flex gap-6 items-start flex-1 min-w-0">
            <div className="w-20 h-20 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-2 shadow-sm shrink-0">
              <span className="material-symbols-outlined text-4xl text-slate-300">business</span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 break-words">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-600">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">business</span> {job.company_name || 'HireMind'}</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">calendar_today</span> Đăng ngày {formatDate(job.created_at)}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 shrink-0 w-full md:w-auto mt-2 md:mt-0">
            <button className="flex-1 md:flex-none px-6 py-3 border border-slate-200 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
              <span className="material-symbols-outlined text-lg">bookmark</span> Lưu tin
            </button>
            <button 
              onClick={() => user ? setIsApplyModalOpen(true) : alert('Vui lòng đăng nhập')}
              className="flex-1 md:flex-none px-8 py-3 bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/10 whitespace-nowrap">
              Ứng tuyển ngay
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            {/* AI Analysis Card */}
            {!isAnalyzed ? (
              <section className="bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-sm relative overflow-hidden hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-2 mb-6 text-slate-700">
                  <span className="material-symbols-outlined text-lg text-primary">auto_awesome</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Trợ lý AI HireMind</span>
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-bold text-slate-900">Kiểm tra mức độ phù hợp với yêu cầu</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      AI của chúng tôi sẽ phân tích chuyên sâu CV của bạn và đối chiếu với bản mô tả công việc (JD), từ đó tính toán tỉ lệ phần trăm phù hợp và đề xuất những ý kiến cải thiện để CV của bạn nổi bật hơn trong mắt nhà tuyển dụng.
                    </p>
                  </div>
                  <div className="w-full md:w-[320px] flex flex-col gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Chọn CV phân tích</label>
                      <div className="relative">
                        <select 
                          className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-700 shadow-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                          value={selectedCV}
                          onChange={(e) => setSelectedCV(e.target.value)}
                        >
                          <option value="" disabled>-- Chọn CV lưu trong tài khoản --</option>
                          {cvs.length > 0 ? cvs.map(cv => (
                            <option key={cv.id} value={cv.id}>{cv.file_name}</option>
                          )) : (
                            <option value="" disabled>Chưa có CV nào (Vui lòng tải lên ở mục Quản lý CV)</option>
                          )}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                          <span className="material-symbols-outlined">expand_more</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      className={`group mt-2 w-full py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${selectedCV && !isAnalyzing ? 'bg-slate-900 text-white hover:bg-primary hover:shadow-lg hover:-translate-y-0.5' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                      disabled={!selectedCV || isAnalyzing}
                      onClick={handleAnalyze}
                    >
                      {isAnalyzing ? (
                        <div className="size-5 border-2 border-slate-400 border-t-slate-600 rounded-full animate-spin"></div>
                      ) : (
                        <span className="material-symbols-outlined text-lg group-hover:animate-spin">magic_button</span>
                      )}
                      {isAnalyzing ? 'Đang phân tích...' : 'Phân tích ngay'}
                    </button>
                  </div>
                </div>
              </section>
            ) : (
              <section className="bg-primary text-white p-8 rounded-2xl shadow-xl relative overflow-hidden transition-all duration-500">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <span className="material-symbols-outlined text-8xl">bolt</span>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-slate-300">
                      <span className="material-symbols-outlined text-lg">auto_awesome</span>
                      <span className="text-xs font-bold uppercase tracking-widest">Kết quả phân tích từ AI</span>
                    </div>
                    <button 
                      onClick={() => { setIsAnalyzed(false); setAiResult(null); }}
                      className="text-xs flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-sm">refresh</span> Phân tích lại
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative flex items-center justify-center">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
                        <circle className="text-white/10" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                        <circle className="text-white" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray={`${aiResult?.match_score ? (aiResult.match_score * 3.644) : 0} 364.4`} strokeDashoffset="0" strokeWidth="8"></circle>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">{aiResult?.match_score || 0}%</span>
                        <span className="text-[10px] uppercase font-medium opacity-70">Độ phù hợp</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <h3 className="text-xl font-bold">{aiResult?.summary || 'Kết quả phân tích AI'}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                          <p className="text-xs font-bold text-white/60 mb-2 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">trending_up</span> ĐIỂM MẠNH
                          </p>
                          <ul className="text-sm space-y-1.5 opacity-90">
                            {aiResult?.strengths?.map((item, index) => (
                                <li key={index}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                          <p className="text-xs font-bold text-white/60 mb-2 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">edit_note</span> GỢI Ý CẢI THIỆN
                          </p>
                          <ul className="text-sm space-y-1.5 opacity-90">
                            {aiResult?.improvements?.map((item, index) => (
                                <li key={index}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-center md:justify-start">
                        <Link to={`/interview/${id}`} className="inline-flex group relative items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                          <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">record_voice_over</span>
                          <span>Phỏng vấn thử với AI</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Detailed Job Description */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">Mô tả công việc</h2>
              <div className="text-slate-700 leading-relaxed space-y-4 whitespace-pre-wrap">
                {job.description || 'Chưa có mô tả chi tiết.'}
              </div>
            </section>

            {/* Requirements */}
            {job.requirements && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">Yêu cầu ứng viên</h2>
                <div className="text-slate-700 leading-relaxed space-y-4 whitespace-pre-wrap">
                  {job.requirements}
                </div>
              </section>
            )}

            {/* Benefits */}
            {job.benefits && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">Quyền lợi</h2>
                <div className="text-slate-700 leading-relaxed space-y-4 whitespace-pre-wrap">
                  {job.benefits}
                </div>
              </section>
            )}


          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Summary Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold mb-6">Tóm tắt công việc</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Địa điểm</p>
                    <p className="text-sm font-semibold">{job.location || 'Không xác định'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Mức lương</p>
                    <p className="text-sm font-semibold">{formatSalary(job.salary_min, job.salary_max, job.currency)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">work</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Hình thức</p>
                    <p className="text-sm font-semibold">{getEmploymentTypeLabel(job.employment_type)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">military_tech</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Kinh nghiệm</p>
                    <p className="text-sm font-semibold">{job.experience_level || 'Không yêu cầu'}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-100">
                <button 
                  onClick={() => user ? setIsApplyModalOpen(true) : alert('Vui lòng đăng nhập')}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all mb-4">
                  Ứng tuyển ngay
                </button>
                <p className="text-[11px] text-center text-slate-400 italic">Hạn chót ứng tuyển: 30/11/2023</p>
              </div>

              {/* Company Mini Section */}
              <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <h4 className="text-sm font-bold mb-3">Về công ty</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  HireMind là nền tảng tuyển dụng ứng dụng AI hàng đầu tại Đông Nam Á, kết nối tài năng với các cơ hội đột phá.
                </p>
                <Link className="text-xs font-bold text-primary flex items-center gap-1 hover:underline" to="/company">
                  Xem trang công ty <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Apply Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-all pb-10">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden border border-slate-100 transform transition-all translate-y-0 scale-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-900">Ứng tuyển công việc</h3>
                <button onClick={() => setIsApplyModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <p className="text-sm text-slate-500 mb-6">Bạn đang ứng tuyển cho vị trí <strong>{job.title}</strong> tại <strong>{job.company_name || 'HireMind'}</strong>.</p>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Chọn CV của bạn</label>
                  <div className="relative">
                    <select 
                      className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-700 shadow-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                      value={applySelectedCV}
                      onChange={(e) => setApplySelectedCV(e.target.value)}
                    >
                      <option value="" disabled>-- Vui lòng chọn CV --</option>
                      {cvs.length > 0 ? cvs.map(cv => (
                        <option key={cv.id} value={cv.id}>{cv.file_name}</option>
                      )) : (
                        <option value="" disabled>Chưa có CV (Đăng tải CV ở trang Quản lý CV)</option>
                      )}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                      <span className="material-symbols-outlined">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  onClick={() => setIsApplyModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button 
                  onClick={handleApply}
                  disabled={!applySelectedCV || isApplying}
                  className={`flex-1 px-4 py-3 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${(applySelectedCV && !isApplying) ? 'bg-primary hover:bg-primary/90' : 'bg-slate-300 cursor-not-allowed'}`}
                >
                  {isApplying ? (
                    <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <span className="material-symbols-outlined text-lg">send</span>
                  )}
                  {isApplying ? 'Đang gửi...' : 'Nộp CV'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default JobDetail;
