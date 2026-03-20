import React from 'react';
import { Link } from 'react-router-dom';

const ProfileApplications = () => {
  return (
    <div className="bg-slate-50 text-slate-900 h-screen flex flex-col font-display antialiased">
      {/* Top Navigation Bar */}
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
            <Link className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" to="/">Trang chủ</Link>
            <Link className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" to="/jobs">Tuyển dụng</Link>
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
      </header>

      <div className="flex-1 flex max-w-7xl w-full mx-auto overflow-hidden bg-white shadow-sm border-x border-slate-200">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-200 bg-slate-50/50 shrink-0 flex flex-col py-8">
          <div className="px-6 mb-8">
            <div className="flex items-center gap-3 w-full">
              <div className="size-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xl border border-slate-300 shadow-sm">A</div>
              <div className="flex flex-col flex-1 truncate">
                <span className="text-[15px] font-bold text-slate-900 truncate">Nguyễn Văn A</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold truncate">Premium Member</span>
              </div>
            </div>
          </div>

          <nav className="space-y-2 px-5 flex-1">
            <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-200/40 hover:text-slate-900 transition-colors font-semibold">
              <span className="material-symbols-outlined text-[20px]">account_circle</span>
              <span className="text-[13px]">Hồ sơ</span>
            </Link>
            <Link to="/profile/cv" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-200/40 hover:text-slate-900 transition-colors font-semibold">
              <span className="material-symbols-outlined text-[20px]">description</span>
              <span className="text-[13px]">CV của tôi</span>
            </Link>
            <Link to="/profile/applications" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-200/60 text-slate-900 font-bold transition-colors">
              <span className="material-symbols-outlined text-[20px]">work</span>
              <span className="text-[13px]">Đơn ứng tuyển</span>
            </Link>
            <Link to="/profile/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-200/40 hover:text-slate-900 transition-colors font-semibold">
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span className="text-[13px]">Cài đặt</span>
            </Link>
            <div className="pt-2 mt-2 border-t border-slate-200/50">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-bold">
                <span className="material-symbols-outlined text-[20px]">logout</span>
                <span className="text-[13px]">Đăng xuất tài khoản</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white p-12 overflow-y-auto">
          <div className="max-w-5xl">
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Đơn ứng tuyển của tôi</h1>
              <p className="text-slate-500 text-[15px]">Theo dõi trạng thái các công việc bạn đã ứng tuyển.</p>
            </div>

            {/* Tabs */}
            <div className="flex items-center border-b border-slate-200 mb-8 w-full gap-8">
              <button className="pb-3 text-[13px] font-bold text-slate-900 border-b-2 border-slate-900 transition-colors">Tất cả</button>
              <button className="pb-3 text-[13px] font-semibold text-slate-500 hover:text-slate-900 transition-colors">Đang chờ</button>
              <button className="pb-3 text-[13px] font-semibold text-slate-500 hover:text-slate-900 transition-colors">Đã duyệt</button>
              <button className="pb-3 text-[13px] font-semibold text-slate-500 hover:text-slate-900 transition-colors">Từ chối</button>
            </div>

            {/* Application List */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-6">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6 text-[11px] uppercase tracking-wider font-bold text-slate-500">Công việc</div>
                <div className="hidden md:block col-span-3 text-[11px] uppercase tracking-wider font-bold text-slate-500">Ngày ứng tuyển</div>
                <div className="hidden md:block col-span-2 text-[11px] uppercase tracking-wider font-bold text-slate-500">Trạng thái</div>
                <div className="hidden md:block col-span-1 text-[11px] uppercase tracking-wider font-bold text-slate-500 text-right">Thao tác</div>
              </div>

              <div className="divide-y divide-slate-100 bg-white">
                {/* Item 1 */}
                <div className="px-6 py-6 grid grid-cols-12 gap-4 items-center hover:bg-slate-50/50 transition-colors group">
                  <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                    <div className="size-12 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px] text-slate-400">domain</span>
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[14px] font-bold text-slate-900 truncate group-hover:text-primary transition-colors cursor-pointer">Senior Frontend Developer</span>
                      <span className="text-[12px] font-medium text-slate-500 truncate">TechCorp</span>
                    </div>
                  </div>
                  <div className="hidden md:flex col-span-3 items-center">
                    <span className="text-[13px] text-slate-600 font-medium">15/05/2024</span>
                  </div>
                  <div className="hidden md:flex col-span-2 items-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200/50 shadow-sm">
                      Đang chờ
                    </span>
                  </div>
                  <div className="hidden md:flex col-span-1 items-center justify-end">
                    <button className="text-[13px] font-bold text-slate-500 hover:text-primary transition-colors whitespace-nowrap">Xem chi tiết</button>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="px-6 py-6 grid grid-cols-12 gap-4 items-center hover:bg-slate-50/50 transition-colors group">
                  <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                    <div className="size-12 rounded-xl border border-slate-200 bg-slate-800 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px] text-white">design_services</span>
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[14px] font-bold text-slate-900 truncate group-hover:text-primary transition-colors cursor-pointer">UI/UX Designer</span>
                      <span className="text-[12px] font-medium text-slate-500 truncate">Design Systems Ltd.</span>
                    </div>
                  </div>
                  <div className="hidden md:flex col-span-3 items-center">
                    <span className="text-[13px] text-slate-600 font-medium">12/05/2024</span>
                  </div>
                  <div className="hidden md:flex col-span-2 items-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900 text-white shadow-sm hover:shadow-md transition-shadow">
                      Đã duyệt
                    </span>
                  </div>
                  <div className="hidden md:flex col-span-1 items-center justify-end">
                    <button className="text-[13px] font-bold text-slate-500 hover:text-primary transition-colors whitespace-nowrap">Xem chi tiết</button>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="px-6 py-6 grid grid-cols-12 gap-4 items-center hover:bg-slate-50/50 transition-colors group">
                  <div className="col-span-12 md:col-span-6 flex items-center gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                    <div className="size-12 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px] text-slate-400">terminal</span>
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[14px] font-bold text-slate-600 truncate group-hover:text-primary transition-colors cursor-pointer">Backend Engineer</span>
                      <span className="text-[12px] font-medium text-slate-400 truncate">Solutions Inc.</span>
                    </div>
                  </div>
                  <div className="hidden md:flex col-span-3 items-center opacity-70 group-hover:opacity-100 transition-opacity">
                    <span className="text-[13px] text-slate-500 font-medium">10/05/2024</span>
                  </div>
                  <div className="hidden md:flex col-span-2 items-center opacity-70 group-hover:opacity-100 transition-opacity">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-50 text-slate-400 border border-slate-200">
                      Từ chối
                    </span>
                  </div>
                  <div className="hidden md:flex col-span-1 items-center justify-end opacity-70 group-hover:opacity-100 transition-opacity">
                    <button className="text-[13px] font-bold text-slate-400 hover:text-primary transition-colors whitespace-nowrap">Xem chi tiết</button>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="px-6 py-6 grid grid-cols-12 gap-4 items-center hover:bg-slate-50/50 transition-colors group">
                  <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                    <div className="size-12 rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px] text-slate-500">inventory</span>
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[14px] font-bold text-slate-900 truncate group-hover:text-primary transition-colors cursor-pointer">Product Manager</span>
                      <span className="text-[12px] font-medium text-slate-500 truncate">Creative Studio</span>
                    </div>
                  </div>
                  <div className="hidden md:flex col-span-3 items-center">
                    <span className="text-[13px] text-slate-600 font-medium">08/05/2024</span>
                  </div>
                  <div className="hidden md:flex col-span-2 items-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200/50 shadow-sm">
                      Đang chờ
                    </span>
                  </div>
                  <div className="hidden md:flex col-span-1 items-center justify-end">
                    <button className="text-[13px] font-bold text-slate-500 hover:text-primary transition-colors whitespace-nowrap">Xem chi tiết</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination / Footer */}
            <div className="flex items-center justify-between mt-4 px-2 tracking-tight">
              <p className="text-[12px] font-medium text-slate-400">Hiển thị 4 trong tổng số 12 đơn ứng tuyển</p>
              <div className="flex gap-1.5">
                <button className="size-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-400 cursor-not-allowed">
                  <span className="material-symbols-outlined text-[14px]">chevron_left</span>
                </button>
                <button className="size-8 rounded bg-primary text-white font-bold text-[12px] flex items-center justify-center shadow-md">1</button>
                <button className="size-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors font-semibold text-[12px] text-slate-600">2</button>
                <button className="size-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors font-semibold text-[12px] text-slate-600">3</button>
                <button className="size-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600">
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileApplications;
