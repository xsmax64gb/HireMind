import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '@/components/common/AdminSidebar';

const AdminJobs = () => {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex font-display antialiased">
      
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-[#fafafa] ml-64 min-w-0 h-screen overflow-y-auto">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center sticky top-0 z-40 shrink-0">
          <h2 className="text-[13px] font-semibold text-slate-500">
            Hệ thống / <span className="text-slate-900 font-bold">Quản lý Tin tuyển dụng</span>
          </h2>
        </header>

        {/* Page Body */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">Quản lý Tin tuyển dụng</h1>
              <p className="text-slate-500 text-[14px]">Quản lý và theo dõi các vị trí công việc đang đăng tuyển trên hệ thống.</p>
            </div>
            {/* User requested to remove "Đăng tin mới" button, so it is omitted here */}
          </div>

          {/* Filters & Search */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
            <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                <input className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-medium focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-500" placeholder="Tìm kiếm theo tiêu đề, công ty..." type="text" />
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  Bộ lọc
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Tiêu đề công việc</th>
                    <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Công ty</th>
                    <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Ngày đăng</th>
                    <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Trạng thái</th>
                    <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Row 1 */}
                  <tr className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">Kỹ sư Phần mềm Senior</span>
                        <span className="text-[12px] font-medium text-slate-500">Full-time • Từ xa</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-600">FPT</div>
                         <span className="text-[13px] font-bold text-slate-700">FPT Software</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">15/10/2023</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 relative pl-4">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-emerald-500"></span>
                        Published
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors tooltip" title="Đóng tin">
                          <span className="material-symbols-outlined text-[18px]">cancel</span>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors tooltip" title="Xóa">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">Chuyên viên Marketing</span>
                        <span className="text-[12px] font-medium text-slate-500">Full-time • Hà Nội</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-600">VN</div>
                         <span className="text-[13px] font-bold text-slate-700">Vingroup</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">14/10/2023</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 relative pl-4">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-emerald-500"></span>
                        Published
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors tooltip" title="Đóng tin">
                          <span className="material-symbols-outlined text-[18px]">cancel</span>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors tooltip" title="Xóa">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">UI/UX Designer</span>
                        <span className="text-[12px] font-medium text-slate-500">Hợp đồng • TP.HCM</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-600">MO</div>
                         <span className="text-[13px] font-bold text-slate-700">Momo</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">12/10/2023</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200 relative pl-4">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-slate-400"></span>
                        Closed
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors tooltip" title="Đóng tin">
                          <span className="material-symbols-outlined text-[18px]">cancel</span>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors tooltip" title="Xóa">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">Product Manager</span>
                        <span className="text-[12px] font-medium text-slate-500">Full-time • Hà Nội</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-600">ZA</div>
                         <span className="text-[13px] font-bold text-slate-700">Zalo</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">10/10/2023</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 relative pl-4">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-emerald-500"></span>
                        Published
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors tooltip" title="Đóng tin">
                          <span className="material-symbols-outlined text-[18px]">cancel</span>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors tooltip" title="Xóa">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
              <span className="text-[13px] text-slate-500 font-medium">Hiển thị <span className="font-bold text-slate-900">1</span> đến <span className="font-bold text-slate-900">4</span> trong <span className="font-bold text-slate-900">24</span> tin tuyển dụng</span>
              <div className="flex items-center gap-1.5">
                <button className="p-2 border border-slate-200 bg-white rounded-lg text-slate-400 hover:bg-slate-50 disabled:opacity-50 transition-colors shadow-sm" disabled>
                  <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-900 text-white text-[13px] font-bold shadow-sm">1</button>
                <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-[13px] font-bold transition-colors shadow-sm">2</button>
                <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-[13px] font-bold transition-colors shadow-sm">3</button>
                <button className="p-2 border border-slate-200 bg-white rounded-lg text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminJobs;
