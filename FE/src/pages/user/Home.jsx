import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, removeToken, removeUser } from '@/utils/authUtils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

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
      <Navbar />

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

      <Footer />
    </div>
  );
};

export default HomePage;
