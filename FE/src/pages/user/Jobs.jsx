import React from 'react';
import { Link } from 'react-router-dom';

const JobsPage = () => {
  return (
    <div className="bg-background-light text-slate-900 min-h-screen flex flex-col font-display">
      {/* Header (Same as Home.jsx but with profile instead of Login) */}
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
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Tìm kiếm bước tiến sự nghiệp tại <span className="text-primary/60">HireMind</span>
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-lg text-slate-600">
            Gia nhập đội ngũ những người tiên phong định hình tương lai của việc học ngôn ngữ bằng AI. Hãy để AI của chúng tôi kết nối bạn với vị trí hoàn hảo dựa trên chuyên môn của bạn.
          </p>

          {/* Compact CV Upload Area */}
          <div className="group relative mx-auto max-w-md rounded-xl border border-dashed border-slate-300 bg-white p-6 transition-all hover:border-primary">
            <div className="flex items-center justify-center gap-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-2xl">cloud_upload</span>
              </div>
              <div className="flex flex-col items-start">
                <button className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white transition-transform active:scale-95 hover:bg-slate-800">
                  Tải lên CV
                </button>
                <p className="mt-1 text-[10px] text-slate-400">Định dạng: PDF, DOCX (Tối đa 10MB)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Job List Section */}
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Vị trí đang tuyển dụng</h2>
                <p className="text-slate-500">Khám phá cơ hội mới từ 12 vị trí đang mở</p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors">
                  <span className="material-symbols-outlined text-sm">auto_awesome</span> Gợi ý cho bạn
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-white transition-colors">
                  <span className="material-symbols-outlined text-sm">filter_list</span> Lọc
                </button>
              </div>
            </div>

            {/* 3-Column Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Job Card 1 */}
              <div className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg hover:border-primary/20">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 uppercase">Toàn thời gian</span>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase">Kỹ thuật</span>
                  </div>
                  <Link to="/jobs/1"><h3 className="text-lg font-bold text-slate-900 leading-snug hover:text-primary transition-colors">Kỹ sư Frontend Cao cấp</h3></Link>
                  <div className="space-y-1.5 mt-1">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <span className="material-symbols-outlined text-base">location_on</span> Từ xa
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <span className="material-symbols-outlined text-base">payments</span> $80k - $120k
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex gap-2">
                  <Link to="/jobs/1" className="flex-1 text-center rounded-lg border border-slate-200 py-2 text-xs font-semibold hover:bg-slate-50 transition-all flex items-center justify-center">Chi tiết</Link>
                  <button className="flex-1 rounded-lg bg-primary py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-all">Ứng tuyển</button>
                </div>
              </div>

              {/* Job Card 2 */}
              <div className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg hover:border-primary/20">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 uppercase">Toàn thời gian</span>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase">AI & Data</span>
                  </div>
                  <Link to="/jobs/2"><h3 className="text-lg font-bold text-slate-900 leading-snug hover:text-primary transition-colors">Nhà khoa học Nghiên cứu AI</h3></Link>
                  <div className="space-y-1.5 mt-1">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <span className="material-symbols-outlined text-base">location_on</span> Hà Nội, VN
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <span className="material-symbols-outlined text-base">payments</span> Thỏa thuận
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex gap-2">
                  <Link to="/jobs/2" className="flex-1 text-center rounded-lg border border-slate-200 py-2 text-xs font-semibold hover:bg-slate-50 transition-all flex items-center justify-center">Chi tiết</Link>
                  <button className="flex-1 rounded-lg bg-primary py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-all">Ứng tuyển</button>
                </div>
              </div>

              {/* Job Card 3 */}
              <div className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg hover:border-primary/20">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 uppercase">Hợp đồng</span>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase">Thiết kế</span>
                  </div>
                  <Link to="/jobs/3"><h3 className="text-lg font-bold text-slate-900 leading-snug hover:text-primary transition-colors">Nhà thiết kế Sản phẩm Cao cấp</h3></Link>
                  <div className="space-y-1.5 mt-1">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <span className="material-symbols-outlined text-base">location_on</span> TP. Hồ Chí Minh, VN
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <span className="material-symbols-outlined text-base">payments</span> $60k - $90k
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex gap-2">
                  <Link to="/jobs/3" className="flex-1 text-center rounded-lg border border-slate-200 py-2 text-xs font-semibold hover:bg-slate-50 transition-all flex items-center justify-center">Chi tiết</Link>
                  <button className="flex-1 rounded-lg bg-primary py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-all">Ứng tuyển</button>
                </div>
              </div>

              {/* Job Card 4 */}
              <div className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg hover:border-primary/20">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 uppercase">Toàn thời gian</span>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase">Vận hành</span>
                  </div>
                  <Link to="/jobs/4"><h3 className="text-lg font-bold text-slate-900 leading-snug hover:text-primary transition-colors">Quản lý Chăm sóc Khách hàng</h3></Link>
                  <div className="space-y-1.5 mt-1">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <span className="material-symbols-outlined text-base">location_on</span> Từ xa
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <span className="material-symbols-outlined text-base">payments</span> $50k - $75k
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex gap-2">
                  <Link to="/jobs/4" className="flex-1 text-center rounded-lg border border-slate-200 py-2 text-xs font-semibold hover:bg-slate-50 transition-all flex items-center justify-center">Chi tiết</Link>
                  <button className="flex-1 rounded-lg bg-primary py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-all">Ứng tuyển</button>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">Xem thêm vị trí</button>
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

export default JobsPage;
