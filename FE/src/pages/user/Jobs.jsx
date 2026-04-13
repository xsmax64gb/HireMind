import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '@/utils/authUtils';
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
  const [userCvs, setUserCvs] = useState([]);
  const [isSelectCvModalOpen, setIsSelectCvModalOpen] = useState(false);
  const [cvLoading, setCvLoading] = useState(false);
  const [isRecommendationMode, setIsRecommendationMode] = useState(false);
  const [allJobsCache, setAllJobsCache] = useState({ jobs: [], total: 0 });
  const [filters, setFilters] = useState({ search: '', location: '', type: '', level: '' });
  const [provinces, setProvinces] = useState([]);
  const user = getUser();

  useEffect(() => {
    fetchJobs();
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await fetch('https://provinces.open-api.vn/api/');
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  const formatProvinceName = (name) => {
    return name.replace(/^(Thành phố |Tỉnh )/i, '');
  };

  const fetchJobs = async (appliedFilters = filters) => {
    try {
      setLoading(true);
      const data = await jobService.getAllJobs({ limit: 10, ...appliedFilters });
      setJobs(data.jobs);
      setTotal(data.total);
      if (!appliedFilters.search && !appliedFilters.location && !appliedFilters.type && !appliedFilters.level) {
        setAllJobsCache(data);
      }
      setIsRecommendationMode(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(filters);
  };

  const clearFilters = () => {
    const emptyFilters = { search: '', location: '', type: '', level: '' };
    setFilters(emptyFilters);
    fetchJobs(emptyFilters);
  };

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

  const openRecommendationModal = async () => {
    if (!user) {
        navigate('/login');
        return;
    }

    try {
        setIsSelectCvModalOpen(true);
        setCvLoading(true);
        const data = await apiClient.get('/cvs');
        setUserCvs(data || []);
    } catch (error) {
        console.error('Error fetching CVs:', error);
        alert('Không thể lấy danh sách CV của bạn');
    } finally {
        setCvLoading(false);
    }
  };

  const handleSelectCv = async (cvId) => {
    try {
        setIsSelectCvModalOpen(false);
        setLoading(true);
        // Step 2: Fetch recommendations
        const data = await apiClient.get(`/cvs/${cvId}/recommendations`);
        setJobs(data || []);
        setIsRecommendationMode(true);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        alert('Có lỗi xảy ra khi lấy gợi ý việc làm');
    } finally {
        setLoading(false);
    }
  };

  const resetJobs = () => {
    setJobs(allJobsCache.jobs);
    setTotal(allJobsCache.total);
    setFilters({ search: '', location: '', type: '', level: '' });
    setIsRecommendationMode(false);
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

        {/* Search and Filters Section */}
        <section className="mx-auto max-w-6xl px-6 relative z-20">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-3">
              {/* Search Input */}
              <div className="flex-[1.5] relative border border-slate-200 rounded-xl hover:border-primary/30 transition-colors bg-white">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input 
                  type="text" 
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Tên công việc, từ khóa..." 
                  className="w-full bg-transparent py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-0"
                />
              </div>
              
              {/* Location */}
              <div className="flex-1 relative border border-slate-200 rounded-xl hover:border-primary/30 transition-colors bg-white">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">location_on</span>
                <select 
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full bg-transparent py-3 pl-11 pr-10 text-sm font-medium focus:outline-none focus:ring-0 appearance-none cursor-pointer truncate"
                >
                  <option value="">Tất cả địa điểm</option>
                  {provinces.map(p => (
                    <option key={p.code} value={formatProvinceName(p.name)}>{formatProvinceName(p.name)}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
              </div>

              {/* Type */}
              <div className="flex-1 relative border border-slate-200 rounded-xl hover:border-primary/30 transition-colors bg-white">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">work</span>
                <select 
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full bg-transparent py-3 pl-11 pr-10 text-sm font-medium focus:outline-none focus:ring-0 appearance-none cursor-pointer truncate"
                >
                  <option value="">Tất cả hình thức</option>
                  <option value="fulltime">Toàn thời gian</option>
                  <option value="parttime">Bán thời gian</option>
                  <option value="intern">Thực tập</option>
                  <option value="freelance">Freelance</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
              </div>
              
              {/* Level */}
              <div className="flex-1 relative border border-slate-200 rounded-xl hover:border-primary/30 transition-colors bg-white">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">military_tech</span>
                <select 
                  name="level"
                  value={filters.level}
                  onChange={handleFilterChange}
                  className="w-full bg-transparent py-3 pl-11 pr-10 text-sm font-medium focus:outline-none focus:ring-0 appearance-none cursor-pointer truncate"
                >
                  <option value="">Tất cả cấp độ</option>
                  <option value="intern">Intern</option>
                  <option value="fresher">Fresher</option>
                  <option value="junior">Junior</option>
                  <option value="mid">Mid-level</option>
                  <option value="senior">Senior</option>
                  <option value="lead">Lead</option>
                  <option value="manager">Manager</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
              </div>

              {/* Submit */}
              <button type="submit" className="bg-primary text-white rounded-xl px-8 py-3 font-bold hover:bg-slate-800 transition-colors whitespace-nowrap shadow-sm">
                Tìm kiếm
              </button>
              
              {/* Clear Filters */}
              {(filters.search || filters.location || filters.type || filters.level) && (
                <button 
                  type="button" 
                  onClick={clearFilters}
                  className="absolute -top-3 -right-3 size-8 bg-white text-slate-400 rounded-full shadow-md border border-slate-100 flex items-center justify-center hover:text-rose-500 hover:border-rose-100 transition-all z-10"
                  title="Xóa bộ lọc"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </form>
          </div>
        </section>

        {/* Job List Section */}
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {isRecommendationMode ? '🔥 Việc làm phù hợp cho bạn' : 'Vị trí đang tuyển dụng'}
                </h2>
                <p className="text-slate-500">
                  {loading ? 'Đang tải...' : isRecommendationMode 
                    ? `HireMind AI đã tìm thấy ${jobs.length} vị trí phù hợp nhất`
                    : `Khám phá cơ hội mới từ ${total} vị trí đang mở`}
                </p>
              </div>
              <div className="flex gap-2">
                {isRecommendationMode ? (
                  <button 
                    onClick={resetJobs}
                    className="flex items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-300 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">close</span> Xem tất cả
                  </button>
                ) : (
                  <button 
                    onClick={openRecommendationModal}
                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">auto_awesome</span> Gợi ý cho bạn
                  </button>
                )}
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
                        {job.match_score && (
                          <span className="ml-auto rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-black text-white uppercase animate-pulse">
                            {Math.round(job.match_score * 100)}% MATCH
                          </span>
                        )}
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

      {/* CV Selection Modal - Refined UI */}
      {isSelectCvModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/10 backdrop-blur-[2px] animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-xl font-black text-slate-800 leading-tight">Chọn CV của bạn</h3>
                        <p className="text-slate-400 text-xs font-medium mt-0.5">Chúng tôi sẽ tìm các job phù hợp nhất</p>
                    </div>
                    <button 
                        onClick={() => setIsSelectCvModalOpen(false)}
                        className="size-10 rounded-xl bg-white flex items-center justify-center text-slate-300 hover:text-slate-500 transition-all border border-slate-100 shadow-sm"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>
                
                <div className="p-6 max-h-[380px] overflow-y-auto">
                    {cvLoading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-16 bg-slate-50/50 animate-pulse rounded-2xl"></div>
                            ))}
                        </div>
                    ) : userCvs.length > 0 ? (
                        <div className="space-y-3">
                            {userCvs.map(cv => (
                                <button
                                    key={cv.id}
                                    onClick={() => handleSelectCv(cv.id)}
                                    className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-primary/20 hover:bg-primary/5 transition-all text-left group"
                                >
                                    <div className="size-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <div className="text-[14px] font-bold text-slate-700 truncate group-hover:text-primary transition-colors">{cv.file_name}</div>
                                        <div className="text-[10px] font-medium text-slate-400 italic">Cập nhật: {new Date(cv.created_at).toLocaleDateString('vi-VN')}</div>
                                    </div>
                                    <span className="material-symbols-outlined text-transparent group-hover:text-primary transition-all text-[18px]">done_all</span>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 px-6 bg-slate-50/50 rounded-3xl border border-dashed border-slate-100">
                            <p className="text-slate-400 font-bold mb-4 text-xs uppercase tracking-widest">Hồ sơ trống</p>
                            <Link 
                              to="/profile/cv" 
                              onClick={() => setIsSelectCvModalOpen(false)}
                              className="text-xs font-black text-primary hover:underline flex items-center justify-center gap-1"
                            >
                                <span className="material-symbols-outlined text-[16px]">upload_file</span> Tải lên hồ sơ ngay
                            </Link>
                        </div>
                    )}
                </div>
                
                <div className="p-6 pt-2 pb-8 flex justify-center">
                    <button 
                        onClick={() => setIsSelectCvModalOpen(false)}
                        className="text-slate-300 font-black text-[12px] hover:text-slate-400 transition-all uppercase tracking-widest"
                    >
                        Hủy bỏ
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
