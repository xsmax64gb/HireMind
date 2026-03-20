import React from 'react';
import { Link } from 'react-router-dom';

const RecruiterJobs = () => {
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
          <Link to="/recruiter/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors font-semibold">
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
          <Link to="/recruiter/jobs" className="flex items-center gap-3 px-4 py-3 bg-slate-100 text-primary rounded-xl transition-colors font-bold">
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
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto w-full">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 w-full">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-900">Tin tuyển dụng của tôi</h1>
                <p className="text-slate-500 text-[15px]">Quản lý các vị trí đang tuyển dụng và theo dõi ứng viên.</p>
              </div>
              <div className="flex shrink-0 mt-4 sm:mt-0">
                <Link to="/recruiter/post-job" className="px-6 py-3 text-sm font-bold bg-primary text-white hover:opacity-90 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  Đăng tin mới
                </Link>
              </div>
            </div>

            {/* Dashboard Filters */}
            <div className="mb-6 flex flex-wrap items-center border-b border-slate-200 gap-x-8 gap-y-4">
              <button className="pb-3 text-[14px] font-bold text-slate-900 border-b-2 border-slate-900 transition-colors">Tất cả (12)</button>
              <button className="pb-3 text-[14px] font-semibold text-slate-500 hover:text-slate-900 transition-colors">Đang hoạt động (8)</button>
              <button className="pb-3 text-[14px] font-semibold text-slate-500 hover:text-slate-900 transition-colors">Đã đóng (4)</button>
              
              <div className="ml-auto flex items-center gap-2 pb-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                  <input className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-[13px] font-medium focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white outline-none transition-all placeholder:text-slate-400" placeholder="Tìm kiếm tin..." type="text" />
                </div>
              </div>
            </div>

            {/* Jobs Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <th className="px-8 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500">Công việc</th>
                      <th className="px-6 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500">Địa điểm</th>
                      <th className="px-6 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500">Ngày đăng</th>
                      <th className="px-6 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500 text-center">Ứng viên</th>
                      <th className="px-8 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    
                    {/* Job Row 1 */}
                    <tr className="group hover:bg-slate-50/80 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-[15px] text-slate-900 group-hover:text-primary transition-colors cursor-pointer">Senior Frontend Developer</span>
                          <span className="text-[12px] font-medium text-slate-400">Mã: HM-1024</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-slate-600 font-medium">TP. Hồ Chí Minh</td>
                      <td className="px-6 py-6 text-slate-600 font-medium">12/10/2023</td>
                      <td className="px-6 py-6 text-center">
                        <span className="inline-flex items-center justify-center font-bold text-[15px] text-slate-800">48</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          <Link to="/recruiter/jobs/1/candidates" className="flex h-9 px-4 items-center text-[13px] font-bold bg-slate-900 text-white rounded-lg hover:bg-primary hover:shadow-md transition-all shadow-sm">Xem ứng viên</Link>
                          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/50 hover:bg-slate-50 transition-colors tooltip" title="Chỉnh sửa">
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-rose-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors tooltip" title="Khóa/Đóng tin">
                            <span className="material-symbols-outlined text-[18px]">block</span>
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Job Row 2 */}
                    <tr className="group hover:bg-slate-50/80 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-[15px] text-slate-900 group-hover:text-primary transition-colors cursor-pointer">UI/UX Designer</span>
                          <span className="text-[12px] font-medium text-slate-400">Mã: HM-0912</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-slate-600 font-medium">Hà Nội</td>
                      <td className="px-6 py-6 text-slate-600 font-medium">05/10/2023</td>
                      <td className="px-6 py-6 text-center">
                        <span className="inline-flex items-center justify-center font-bold text-[15px] text-slate-800">24</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          <Link to="/recruiter/jobs/1/candidates" className="flex h-9 px-4 items-center text-[13px] font-bold bg-slate-900 text-white rounded-lg hover:bg-primary hover:shadow-md transition-all shadow-sm">Xem ứng viên</Link>
                          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/50 hover:bg-slate-50 transition-colors tooltip" title="Chỉnh sửa">
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-rose-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors tooltip" title="Khóa/Đóng tin">
                            <span className="material-symbols-outlined text-[18px]">block</span>
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Job Row 3 (Closed) */}
                    <tr className="group hover:bg-slate-50/50 transition-colors opacity-60 hover:opacity-80">
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-[15px] text-slate-700 cursor-pointer">Product Manager</span>
                          <span className="text-[12px] font-medium text-slate-400">Mã: HM-0888</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-slate-500 font-medium">Đà Nẵng</td>
                      <td className="px-6 py-6 text-slate-500 font-medium">28/09/2023</td>
                      <td className="px-6 py-6 text-center">
                        <span className="inline-flex items-center justify-center font-bold text-[15px] text-slate-400">112</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2.5 text-slate-400">
                          <button className="h-9 px-4 text-[13px] font-bold bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 transition-colors">Xem ứng viên</button>
                          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 text-slate-400 hover:text-primary hover:border-slate-300 transition-colors tooltip" title="Xem chi tiết">
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Job Row 4 */}
                    <tr className="group hover:bg-slate-50/80 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-[15px] text-slate-900 group-hover:text-primary transition-colors cursor-pointer">Mobile Engineer (Flutter)</span>
                          <span className="text-[12px] font-medium text-slate-400">Mã: HM-1045</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-slate-600 font-medium">TP. Hồ Chí Minh</td>
                      <td className="px-6 py-6 text-slate-600 font-medium">20/10/2023</td>
                      <td className="px-6 py-6 text-center">
                        <span className="inline-flex items-center justify-center font-bold text-[15px] text-slate-800">12</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          <Link to="/recruiter/jobs/1/candidates" className="flex h-9 px-4 items-center text-[13px] font-bold bg-slate-900 text-white rounded-lg hover:bg-primary hover:shadow-md transition-all shadow-sm">Xem ứng viên</Link>
                          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/50 hover:bg-slate-50 transition-colors tooltip" title="Chỉnh sửa">
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-rose-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors tooltip" title="Khóa/Đóng tin">
                            <span className="material-symbols-outlined text-[18px]">block</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-8 py-5 border-t border-slate-100 bg-slate-50/50">
                <p className="text-[12.5px] font-medium text-slate-500">Hiển thị 1-10 trên 12 tin tuyển dụng</p>
                <div className="flex items-center gap-1.5">
                  <button className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-white transition-colors disabled:opacity-50 cursor-not-allowed" disabled>
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-white text-[12.5px] font-bold shadow-sm">1</button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors text-[12.5px] font-bold">2</button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterJobs;
