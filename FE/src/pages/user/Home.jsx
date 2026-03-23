import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, removeToken, removeUser } from '@/utils/authUtils';

const HomePage = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };

  return (
    <div className="bg-background-light text-slate-900 font-display">
      {/* Top Navigation */}
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
            <Link className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" to="/jobs">Tuyển dụng</Link>

          </nav>
          <div className="flex items-center gap-4 flex-1 justify-end">
            <button className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-full transition-all">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
            {user ? (
              <div className="relative group">
                <Link to={user.role === 'recruiter' ? "/recruiter/dashboard" : "/profile"} className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:border-slate-300 transition-all bg-slate-50 cursor-pointer">
                  <span className="text-xs font-semibold px-2">Hồ sơ</span>
                  <div className="size-8 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm text-slate-500">person</span>
                  </div>
                </Link>
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2 space-y-1">
                    <Link to={user.role === 'recruiter' ? "/recruiter/dashboard" : "/profile"} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-50 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">account_circle</span>
                      Quản lý tài khoản
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-rose-600 rounded-md hover:bg-rose-50 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="px-5 py-2 text-sm font-semibold rounded-full border border-slate-200 hover:border-slate-300 transition-all bg-slate-50">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                New: AI-Matching Engine v2.0
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-primary">
                Tuyển dụng thông minh – <br />
                <span className="text-slate-400">Kết nối đúng người, đúng việc.</span>
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                Nâng tầm quy trình nhân sự với AI-powered recruitment. Tiết kiệm 70% thời gian lọc hồ sơ và nâng cao chất lượng ứng viên ngay hôm nay.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/register" className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-slate-800 transition-all shadow-lg shadow-black/10 inline-block">
                  Bắt đầu miễn phí
                </Link>
                <button className="px-8 py-4 bg-white border border-slate-200 text-primary font-bold rounded-lg hover:bg-slate-50 transition-all">
                  Xem bản Demo
                </button>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-slate-100 to-white rounded-3xl -z-10 blur-2xl opacity-50"></div>
              <div className="relative rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden p-2">
                <div className="bg-slate-50 rounded-xl overflow-hidden aspect-[4/3] relative">
                  {/* Mockup UI Element */}
                  <div className="absolute inset-0 p-6 flex flex-col gap-4">
                    <div className="h-8 w-1/3 bg-slate-200 rounded animate-pulse"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-24 bg-white rounded-lg border border-slate-200 p-3 shadow-sm">
                        <div className="h-3 w-1/2 bg-slate-100 mb-2"></div>
                        <div className="h-6 w-3/4 bg-slate-800 rounded"></div>
                      </div>
                      <div className="h-24 bg-white rounded-lg border border-slate-200 p-3 shadow-sm">
                        <div className="h-3 w-1/2 bg-slate-100 mb-2"></div>
                        <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
                      </div>
                      <div className="h-24 bg-white rounded-lg border border-slate-200 p-3 shadow-sm">
                        <div className="h-3 w-1/2 bg-slate-100 mb-2"></div>
                        <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="size-12 rounded-full bg-slate-100"></div>
                        <div className="flex-1">
                          <div className="h-4 w-1/4 bg-slate-200 mb-2"></div>
                          <div className="h-3 w-1/2 bg-slate-100"></div>
                        </div>
                        <div className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full">98% MATCH</div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-2 w-full bg-slate-50 rounded"></div>
                        <div className="h-2 w-full bg-slate-50 rounded"></div>
                        <div className="h-2 w-2/3 bg-slate-50 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <img className="w-full h-full object-cover mix-blend-overlay opacity-20" alt="Modern SaaS dashboard visualization with abstract UI elements" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvTbKd5wSWPemLxHZXbsTXVVIf2rJrzOq8ta_UMc37FOWQ1HrVXtzilydxSshT4JLXKZHRRnoipnICdyqTqCSFDhVCYlD53B2Dgyol6BjYtxY4_RuA9btBIFfEYA1WHrkr-3xjFT9_bdeh3Ps8MzUjle0HUA-6vlDClttX7Fv9GxriIiBPuGU4cezOu5lM8Fvfi5vE1lKV8gC3I-Uhb399BxYh_t42rB1RGKNYO9LbSVy_2B_jOEdgNJd9ukfRgiUUY2EdGFq3Wg8" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access Grid Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col gap-2 mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-primary">Tính năng cốt lõi</h2>
              <p className="text-slate-500">Mọi công cụ bạn cần để xây dựng đội ngũ trong mơ.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature Card 1 */}
              <div className="shadcn-card bg-white p-8 rounded-xl flex flex-col gap-6">
                <div className="size-12 rounded-lg bg-primary flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">person_search</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Tuyển dụng</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Tự động đăng tin lên hàng trăm nền tảng và thu hút nhân tài hàng đầu.
                  </p>
                </div>
                <Link className="text-xs font-bold text-primary flex items-center gap-1 mt-auto hover:underline" to="/services/recruitment">
                  Tìm hiểu thêm <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>

              {/* Feature Card 2 */}
              <div className="shadcn-card bg-white p-8 rounded-xl flex flex-col gap-6">
                <div className="size-12 rounded-lg bg-slate-100 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Quản lý hồ sơ</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Lưu trữ và phân loại CV thông minh với hệ thống thẻ tag tùy chỉnh.
                  </p>
                </div>
                <Link className="text-xs font-bold text-primary flex items-center gap-1 mt-auto hover:underline" to="/services/management">
                  Khám phá <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>

              {/* Feature Card 3 */}
              <div className="shadcn-card bg-white p-8 rounded-xl flex flex-col gap-6">
                <div className="size-12 rounded-lg bg-slate-100 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Phân tích AI</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Đánh giá kỹ năng và văn hóa ứng viên bằng thuật toán học sâu.
                  </p>
                </div>
                <Link className="text-xs font-bold text-primary flex items-center gap-1 mt-auto hover:underline" to="/services/ai-analysis">
                  Xem công nghệ <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>

              {/* Feature Card 4 */}
              <div className="shadcn-card bg-white p-8 rounded-xl flex flex-col gap-6">
                <div className="size-12 rounded-lg bg-slate-100 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">calendar_today</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Lịch phỏng vấn</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Tự động hóa việc sắp xếp lịch hẹn giữa HR và ứng viên tiềm năng.
                  </p>
                </div>
                <Link className="text-xs font-bold text-primary flex items-center gap-1 mt-auto hover:underline" to="/services/interview">
                  Trải nghiệm <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Sẵn sàng nâng tầm quy trình tuyển dụng?</h2>
            <p className="text-slate-500 text-lg mb-10">Gia nhập cùng hàng ngàn doanh nghiệp đang sử dụng HireMind để tìm kiếm những mảnh ghép hoàn hảo cho tổ chức.</p>
            <div className="flex justify-center gap-4">
              <Link to="/register" className="px-10 py-4 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-all inline-block">Bắt đầu ngay hôm nay</Link>
              <button className="px-10 py-4 bg-slate-50 text-primary border border-slate-200 font-bold rounded-lg hover:bg-slate-100 transition-all">Liên hệ tư vấn</button>
            </div>
          </div>
        </section>
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

export default HomePage;
