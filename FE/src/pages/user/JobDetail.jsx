import React from 'react';
import { Link, useParams } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();
  const [isAnalyzed, setIsAnalyzed] = React.useState(false);
  const [selectedCV, setSelectedCV] = React.useState("");

  return (
    <div className="bg-background-light text-slate-900 min-h-screen flex flex-col font-display antialiased">
      {/* Top Navigation Bar - Matching Jobs.jsx EXACTLY */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8 flex-1">
            <Link className="flex items-center gap-2 group" to="/">
              <div className="bg-primary text-white p-1 rounded">
                <span className="material-symbols-outlined block text-[20px]">temp_preferences_custom</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">HireMind</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" to="/">Home</Link>
            <Link className="text-sm font-bold text-primary border-b-2 border-primary" to="/jobs">Tuyển dụng</Link>
            <Link className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" to="/solutions">Giải pháp</Link>
          </nav>
          <div className="flex items-center gap-4 flex-1 justify-end">
            <button className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-full transition-all">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
            {/* Logged in state: User profile icon */}
            <Link to="/profile" className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:border-slate-300 transition-all bg-slate-50">
              <span className="text-xs font-semibold px-2">Hồ sơ</span>
              <div className="size-8 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                <span className="material-symbols-outlined text-sm text-slate-500">person</span>
              </div>
            </Link>
          </div>
        </div>
        {/* Breadcrumbs Row */}
        <div className="border-t border-slate-100 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <nav className="flex text-xs text-slate-500 gap-2 items-center">
              <Link className="hover:text-primary" to="/">Trang chủ</Link>
              <span className="material-symbols-outlined text-[10px]">chevron_right</span>
              <Link className="hover:text-primary" to="/jobs">Tuyển dụng</Link>
              <span className="material-symbols-outlined text-[10px]">chevron_right</span>
              <span className="text-primary font-medium">Senior Frontend Developer</span>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 flex-grow w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-10 border-b border-slate-200">
          <div className="flex gap-6 items-start">
            <div className="w-20 h-20 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-2 shadow-sm">
              <img alt="Company Logo" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn819rpxX8SqFTrXSP1qHg7DoQcHvTNV9Ey3EDtTZfEDxjmCOq4U28rcmaNAYkVTCSwraTGaUNVOC9GpebtGhhVJuyktMXzD3yH4Mg3ECV6FJPF2OCdK4p-FdbwXBbRv825iVHzYBAla25dwsqMOosbSBrzHjDhkAoOgUV4HldEMoRrK2TX8GPk1fzw18_saebUhA523sRAObDNjA-BrNJTBr92fQg89JMu8c2AGnhsyBG7jKbexB44258YYSMToBd9ACUA-GBG2I"/>
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">Senior Frontend Developer</h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-600">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">business</span> HireMind Recruitment</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">calendar_today</span> Đăng tải 2 ngày trước</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 border border-slate-200 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">bookmark</span> Lưu tin
            </button>
            <button className="px-8 py-3 bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/10">
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
                          <option value="cv_1">CV_Frontend_Developer_Senior.pdf</option>
                          <option value="cv_2">CV_Mobile_App_Dev_2024.pdf</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                          <span className="material-symbols-outlined">expand_more</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      className={`group mt-2 w-full py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${selectedCV ? 'bg-slate-900 text-white hover:bg-primary hover:shadow-lg hover:-translate-y-0.5' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                      disabled={!selectedCV}
                      onClick={() => setIsAnalyzed(true)}
                    >
                      <span className="material-symbols-outlined text-lg group-hover:animate-spin">magic_button</span> Phân tích ngay
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
                      onClick={() => { setIsAnalyzed(false); setSelectedCV(''); }}
                      className="text-xs flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-sm">refresh</span> Phân tích lại
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative flex items-center justify-center">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
                        <circle className="text-white/10" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                        <circle className="text-white" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="36.44" strokeWidth="8"></circle>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">90%</span>
                        <span className="text-[10px] uppercase font-medium opacity-70">Độ phù hợp</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <h3 className="text-xl font-bold">Bạn rất tiềm năng cho vị trí này!</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                          <p className="text-xs font-bold text-white/60 mb-2 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">trending_up</span> ĐIỂM MẠNH
                          </p>
                          <ul className="text-sm space-y-1.5 opacity-90">
                            <li>• 5+ năm kinh nghiệm React</li>
                            <li>• Kỹ năng tối ưu hóa performance</li>
                          </ul>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                          <p className="text-xs font-bold text-white/60 mb-2 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">edit_note</span> GỢI Ý CẢI THIỆN
                          </p>
                          <ul className="text-sm space-y-1.5 opacity-90">
                            <li>• Thêm chứng chỉ Next.js</li>
                            <li>• Cập nhật các dự án TypeScript</li>
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
              <div className="text-slate-700 leading-relaxed space-y-4">
                <p>Chúng tôi đang tìm kiếm một Senior Frontend Developer tài năng để gia nhập đội ngũ phát triển sản phẩm cốt lõi. Bạn sẽ đóng vai trò quan trọng trong việc xây dựng giao diện người dùng hiện đại, hiệu suất cao và dễ mở rộng.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Thiết kế và xây dựng các component UI phức tạp sử dụng React và Tailwind CSS.</li>
                  <li>Tối ưu hóa hiệu năng ứng dụng (Web Vitals, Code Splitting, Caching).</li>
                  <li>Hợp tác chặt chẽ với đội ngũ Design để chuyển đổi Figma sang code hoàn hảo.</li>
                  <li>Hướng dẫn và review code cho các thành viên junior trong team.</li>
                </ul>
              </div>
            </section>

            {/* Requirements */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">Yêu cầu ứng viên</h2>
              <div className="text-slate-700 leading-relaxed space-y-4">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Ít nhất 5 năm kinh nghiệm làm việc chuyên sâu với Frontend.</li>
                  <li>Thành thạo ReactJS, Next.js và TypeScript.</li>
                  <li>Hiểu rõ về State Management (Zustand, Redux hoặc React Query).</li>
                  <li>Kinh nghiệm với Testing (Jest, React Testing Library).</li>
                  <li>Kỹ năng giải quyết vấn đề tốt và tư duy sản phẩm.</li>
                </ul>
              </div>
            </section>

            {/* Benefits */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">Quyền lợi</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-100 rounded-xl flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary">payments</span>
                  <div>
                    <p className="font-semibold text-sm">Lương & Thưởng</p>
                    <p className="text-sm text-slate-500">Lương tháng 13 & thưởng dự án hấp dẫn</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-100 rounded-xl flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary">laptop_mac</span>
                  <div>
                    <p className="font-semibold text-sm">Thiết bị làm việc</p>
                    <p className="text-sm text-slate-500">MacBook Pro M3 & Màn hình 4K</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-100 rounded-xl flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary">health_and_safety</span>
                  <div>
                    <p className="font-semibold text-sm">Bảo hiểm</p>
                    <p className="text-sm text-slate-500">Gói chăm sóc sức khỏe PVI cao cấp</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-100 rounded-xl flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary">home_work</span>
                  <div>
                    <p className="font-semibold text-sm">Remote</p>
                    <p className="text-sm text-slate-500">Làm việc linh hoạt 2 ngày/tuần tại nhà</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Summary Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold mb-6">Tóm tắt công việc</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Địa điểm</p>
                    <p className="text-sm font-semibold">Quận 1, TP. Hồ Chí Minh</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Mức lương</p>
                    <p className="text-sm font-semibold">$2,500 - $4,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">work</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Hình thức</p>
                    <p className="text-sm font-semibold">Full-time, Hybrid</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">military_tech</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Kinh nghiệm</p>
                    <p className="text-sm font-semibold">Senior (5+ năm)</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-100">
                <button className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all mb-4">
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

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <Link className="flex items-center gap-2 mb-6" to="/">
                <div className="bg-primary text-white p-1 rounded">
                  <span className="material-symbols-outlined block text-[18px]">temp_preferences_custom</span>
                </div>
                <span className="text-lg font-bold tracking-tight text-primary">HireMind</span>
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Giải pháp tuyển dụng thông minh hàng đầu cho các doanh nghiệp công nghệ tại Việt Nam.
              </p>
              <div className="flex gap-4">
                <a className="size-8 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary transition-colors" href="https://hiremind.vn">
                  <span className="material-symbols-outlined text-[18px]">public</span>
                </a>
                <a className="size-8 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary transition-colors" href="mailto:contact@hiremind.vn">
                  <span className="material-symbols-outlined text-[18px]">alternate_email</span>
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900">Sản phẩm</h4>
              <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/features">Tính năng</Link>
              <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/pricing">Bảng giá</Link>
              <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/integrations">Tích hợp</Link>
              <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/ecosystem">Hệ sinh thái</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900">Về chúng tôi</h4>
              <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/about">Giới thiệu</Link>
              <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/careers">Tuyển dụng</Link>
              <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/blog">Blog</Link>
              <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/contact">Liên hệ</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900">Hỗ trợ</h4>
              <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/help">Trung tâm hỗ trợ</Link>
              <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/terms">Điều khoản dịch vụ</Link>
              <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/privacy">Chính sách bảo mật</Link>
              <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/cookies">Cookie Policy</Link>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400">
              © 2024 HireMind Recruitment Platform. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">language</span> Tiếng Việt (VN)
              </span>
              <span className="text-xs text-slate-400">Powered by HireMind AI Engine</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobDetail;
