import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jobService from '@/services/jobService';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import apiClient from '@/services/apiClient';

const JobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobService.getAllJobs({ limit: 10 });
        setJobs(data.jobs);
        setTotal(data.total);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
       alert('Chỉ hỗ trợ tệp PDF');
       return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      setUploadSuccess(false);
      await apiClient.post('/cvs/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadSuccess(true);
      alert('Tải lên CV thành công! Bạn có thể quản lý CV tại trang hồ sơ.');
    } catch (error) {
      console.error('Error uploading CV:', error);
      alert(error.message || 'Lỗi khi tải lên CV');
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

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

  return (
    <div className="bg-background-light text-slate-900 min-h-screen flex flex-col font-display">
      {/* Header */}
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Tìm kiếm bước tiến sự nghiệp tại <span className="text-primary/60">HireMind</span>
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-lg text-slate-600">
            Gia nhập đội ngũ những người tiên phong định hình tương lai của việc học ngôn ngữ bằng AI. Hãy để AI của chúng tôi kết nối bạn với vị trí hoàn hảo dựa trên chuyên môn của bạn.
          </p>

          {/* CV Upload Section */}
          <div className="max-w-xl mx-auto mb-10">
            {uploadSuccess ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 flex flex-col items-center animate-in fade-in zoom-in duration-300">
                <div className="size-14 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Tải lên CV thành công!</h3>
                <p className="text-sm text-slate-500 mb-6">Hệ thống AI đang phân tích CV của bạn để tìm kiếm những công việc phù hợp nhất.</p>
                <div className="flex gap-3">
                  <Link to="/profile/cv" className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">Quản lý CV</Link>
                  <button onClick={() => setUploadSuccess(false)} className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-sm">Tải lên CV khác</button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-sm flex items-center hover:shadow-md transition-shadow">
                <div className="size-14 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 shrink-0 ml-1">
                  <span className="material-symbols-outlined text-2xl">upload_file</span>
                </div>
                <div className="flex-1 px-4 text-left">
                   <h4 className="text-[15px] font-bold text-slate-900 mb-0.5">Tải lên CV của bạn</h4>
                   <p className="text-[12px] text-slate-400 font-medium">Định dạng: PDF (Tối đa 5MB)</p>
                </div>
                <div className="relative overflow-hidden group">
                   <input 
                    type="file" 
                    accept="application/pdf"
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    onChange={handleFileChange}
                    disabled={uploading}
                   />
                   <div className={`px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${uploading ? 'bg-slate-100 text-slate-400' : 'bg-primary text-white group-hover:bg-slate-800'}`}>
                      {uploading ? (
                        <>										  
                          <div className="size-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin"></div>
                          Đang tải...
                        </>
                      ) : (
                        <>Tải lên CV</>
                      )}
                   </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Job List Section */}
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Vị trí đang tuyển dụng</h2>
                <p className="text-slate-500">
                  {loading ? 'Đang tải...' : `Khám phá cơ hội mới từ ${total} vị trí đang mở`}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors">
                  <span className="material-symbols-outlined text-sm">auto_awesome</span> Gợi ý cho bạn
                </button>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-64 bg-white rounded-xl border border-slate-200 animate-pulse"></div>
                ))}
              </div>
            ) : jobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map(job => (
                  <div key={job.id} className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg hover:border-primary/20">
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 uppercase">
                          {getEmploymentTypeLabel(job.employment_type)}
                        </span>
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase">
                          {job.experience_level}
                        </span>
                      </div>
                      <Link to={`/jobs/${job.id}`}>
                        <h3 className="text-lg font-bold text-slate-900 leading-snug hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                      </Link>
                      <div className="text-sm text-slate-600 font-bold mb-1">{job.company_name}</div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-sm text-slate-500">
                          <span className="material-symbols-outlined text-base">location_on</span> {job.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                          <span className="material-symbols-outlined text-base">payments</span> 
                          {formatSalary(job.salary_min, job.salary_max, job.currency)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 flex gap-2">
                      <Link to={`/jobs/${job.id}`} className="flex-1 text-center rounded-lg border border-slate-200 py-2 text-xs font-semibold hover:bg-slate-50 transition-all flex items-center justify-center">Chi tiết</Link>
                      <button className="flex-1 rounded-lg bg-primary py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-all">Ứng tuyển</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
                <span className="material-symbols-outlined text-5xl text-slate-300 block mb-4">search_off</span>
                <p className="text-slate-500 font-medium">Hiện tại chưa có tin tuyển dụng nào.</p>
              </div>
            )}

            {!loading && total > jobs.length && (
              <div className="mt-12 text-center">
                <button className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">Xem thêm vị trí</button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default JobsPage;
