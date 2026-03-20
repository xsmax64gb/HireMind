import React from 'react';
import { Link } from 'react-router-dom';

const RecruiterDashboard = () => {
  return (
    <div className="bg-slate-50 text-slate-900 h-screen flex font-display antialiased overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-200 bg-white shrink-0 hidden lg:flex flex-col h-full z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Link className="flex items-center gap-2 group" to="/">
            <div className="bg-primary text-white p-1 rounded">
              <span className="material-symbols-outlined block text-[18px]">temp_preferences_custom</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">HireMind</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <Link to="/recruiter/dashboard" className="flex items-center gap-3 px-4 py-3 bg-slate-100 text-primary rounded-xl transition-colors font-bold">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span className="text-[13px]">Tổng quan</span>
          </Link>
          <Link to="/recruiter/profile" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors font-semibold">
            <span className="material-symbols-outlined text-[20px]">account_circle</span>
            <span className="text-[13px]">Hồ sơ công ty</span>
          </Link>
          <Link to="/recruiter/post-job" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors font-semibold">
            <span className="material-symbols-outlined text-[20px]">post_add</span>
            <span className="text-[13px]">Đăng tin tuyển dụng</span>
          </Link>
          <Link to="/recruiter/jobs" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors font-semibold">
            <span className="material-symbols-outlined text-[20px]">work</span>
            <span className="text-[13px]">Tin tuyển dụng</span>
          </Link>
          <Link to="/recruiter/interviews" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors font-semibold">
            <span className="material-symbols-outlined text-[20px]">quiz</span>
            <span className="text-[13px]">Tạo câu hỏi Phỏng vấn</span>
          </Link>
        </nav>
        
        <div className="p-5 border-t border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-3 w-full">
            <div className="size-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-lg border border-slate-800 shadow-sm">A</div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[13px] font-bold text-slate-900 truncate">Alex Nguyen</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold truncate">HR Manager</span>
            </div>
            <button className="text-slate-400 hover:text-rose-600 transition-colors tooltip" title="Đăng xuất">
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-end px-8 shrink-0 z-10 hidden sm:flex">
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-full transition-all relative">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              <span className="absolute top-2 right-2 size-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
            <Link to="/recruiter/profile" className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:border-slate-300 transition-all bg-slate-50">
              <span className="text-xs font-semibold px-2">Hồ sơ HR</span>
              <div className="size-8 rounded-full bg-slate-900 flex items-center justify-center">
                <span className="material-symbols-outlined text-sm text-white">person</span>
              </div>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto w-full">
          <div className="max-w-6xl mx-auto w-full">
            
            {/* Greeting Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-900">Chào mừng trở lại, Alex! 👋</h1>
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
                  <h3 className="text-[28px] font-extrabold text-slate-900 leading-none mb-1">2,450</h3>
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
                  <h3 className="text-[28px] font-extrabold text-slate-900 leading-none mb-1">14</h3>
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
                    {/* Applicant 1 */}
                    <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer">
                      <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-slate-200">A</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold text-slate-900 truncate group-hover:text-primary transition-colors">Nguyễn Văn An</p>
                        <p className="text-[12px] font-medium text-slate-500 truncate">Ứng tuyển: Senior Frontend Developer</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-[11px] font-bold">
                          <span className="size-1.5 rounded-full bg-amber-500"></span>
                          Đang chờ xử lý
                        </span>
                        <p className="text-[11px] text-slate-400 font-medium mt-1">2 giờ trước</p>
                      </div>
                    </div>

                    {/* Applicant 2 */}
                    <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer">
                      <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 border border-blue-200">B</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold text-slate-900 truncate group-hover:text-primary transition-colors">Lê Thị Bình</p>
                        <p className="text-[12px] font-medium text-slate-500 truncate">Ứng tuyển: UI/UX Designer</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-50 text-sky-700 text-[11px] font-bold">
                          <span className="size-1.5 rounded-full bg-sky-500"></span>
                          Đã xem xét
                        </span>
                        <p className="text-[11px] text-slate-400 font-medium mt-1">5 giờ trước</p>
                      </div>
                    </div>

                    {/* Applicant 3 */}
                    <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer">
                      <div className="size-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600 border border-emerald-200">M</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold text-slate-900 truncate group-hover:text-primary transition-colors">Trần Minh Quân</p>
                        <p className="text-[12px] font-medium text-slate-500 truncate">Ứng tuyển: Product Manager</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                          <span className="size-1.5 rounded-full bg-emerald-500"></span>
                          Phỏng vấn
                        </span>
                        <p className="text-[11px] text-slate-400 font-medium mt-1">Hôm qua</p>
                      </div>
                    </div>
                    
                    {/* Applicant 4 */}
                    <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer">
                      <div className="size-10 rounded-full bg-rose-100 flex items-center justify-center font-bold text-rose-600 border border-rose-200">T</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold text-slate-900 truncate group-hover:text-primary transition-colors">Phạm Thanh Tâm</p>
                        <p className="text-[12px] font-medium text-slate-500 truncate">Ứng tuyển: Mobile Engineer</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-bold">
                          <span className="size-1.5 rounded-full bg-slate-400"></span>
                          Đã từ chối
                        </span>
                        <p className="text-[11px] text-slate-400 font-medium mt-1">Hôm qua</p>
                      </div>
                    </div>
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
                    <Link to="/recruiter/jobs/1/candidates" className="flex flex-col gap-1 p-3 hover:bg-slate-50 rounded-xl transition-colors group">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">Senior Frontend Developer</span>
                        <span className="text-[12px] font-bold text-emerald-600">48 hồ sơ</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[40%]"></div>
                      </div>
                    </Link>

                    <Link to="/recruiter/jobs/2/candidates" className="flex flex-col gap-1 p-3 hover:bg-slate-50 rounded-xl transition-colors group">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">UI/UX Designer</span>
                        <span className="text-[12px] font-bold text-blue-600">24 hồ sơ</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[25%]"></div>
                      </div>
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

export default RecruiterDashboard;
