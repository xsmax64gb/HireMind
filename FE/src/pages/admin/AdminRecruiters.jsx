import React from 'react';
import { Link } from 'react-router-dom';

const AdminRecruiters = () => {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex font-display antialiased">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col fixed h-full z-50">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">mindfulness</span>
          </div>
          <span className="font-bold text-xl tracking-tight uppercase">HireMind</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-[14px] font-semibold rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Dashboard
          </Link>
          <Link to="/admin/candidates" className="flex items-center gap-3 px-3 py-2.5 text-[14px] font-semibold rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <span className="material-symbols-outlined text-[20px]">group</span>
            Quản lý Ứng viên
          </Link>
          <Link to="/admin/recruiters" className="flex items-center gap-3 px-3 py-2.5 text-[14px] font-bold rounded-xl bg-slate-100 text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">badge</span>
            Quản lý Nhà tuyển dụng
          </Link>
          <Link to="/admin/jobs" className="flex items-center gap-3 px-3 py-2.5 text-[14px] font-semibold rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <span className="material-symbols-outlined text-[20px]">work</span>
            Quản lý tin tuyển dụng
          </Link>
          
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold overflow-hidden shadow-sm shrink-0">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-slate-900 truncate">Quản trị viên</p>
              <p className="text-[11px] font-semibold text-slate-500 truncate">admin@hiremind.vn</p>
            </div>
            <Link to="/login" className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex-shrink-0" title="Đăng xuất">
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-[#fafafa] ml-64 min-w-0 h-screen overflow-y-auto">
        {/* Header Area */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center sticky top-0 z-40 shrink-0">
          <h2 className="text-[13px] font-semibold text-slate-500">
            Hệ thống / <span className="text-slate-900 font-bold">Quản lý Nhà tuyển dụng</span>
          </h2>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">Quản lý Nhà tuyển dụng</h1>
              <p className="text-slate-500 text-[14px]">Xem, thiết lập và phê duyệt danh sách các doanh nghiệp trên hệ thống.</p>
            </div>
            <button className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-[13px] hover:bg-primary transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 outline-none">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Thêm Nhà tuyển dụng
            </button>
          </div>

          {/* Filters and Search */}
          <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
              <input className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-medium focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-500 shadow-sm" placeholder="Tìm kiếm công ty, người đại diện..." type="text" />
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                Bộ lọc
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Xuất dữ liệu
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Tên công ty</th>
                    <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Người đại diện</th>
                    <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest text-center">Tổng số việc</th>
                    <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Trạng thái</th>
                    <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  
                  {/* Row 1 */}
                  <tr className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-[13px] text-slate-600">ABC</div>
                        <span className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">Công ty Công nghệ ABC</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">Nguyễn Văn A</td>
                    <td className="px-6 py-4 text-[14px] text-center font-bold text-slate-900">12</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100">
                        Đang hoạt động
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip" title="Sửa">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
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
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-[13px] text-slate-600">XYZ</div>
                        <span className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">Tập đoàn Giáo dục XYZ</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">Trần Thị B</td>
                    <td className="px-6 py-4 text-[14px] text-center font-bold text-slate-900">05</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-100">
                        Chờ duyệt
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip" title="Sửa">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
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
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-[13px] text-slate-600">GL</div>
                        <span className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">Logistics Toàn Cầu</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">Phạm Văn D</td>
                    <td className="px-6 py-4 text-[14px] text-center font-bold text-slate-900">28</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100">
                        Đang hoạt động
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip" title="Sửa">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
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
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-[13px] text-slate-600">ST</div>
                        <span className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">Startup Sáng tạo</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">Lê Văn C</td>
                    <td className="px-6 py-4 text-[14px] text-center font-bold text-slate-900">00</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                        Ngừng hoạt động
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip" title="Sửa">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
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

            {/* Pagination Area */}
            <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
              <span className="text-[13px] text-slate-500 font-medium">Hiển thị <span className="font-bold text-slate-900">1</span> đến <span className="font-bold text-slate-900">4</span> trong <span className="font-bold text-slate-900">24</span> nhà tuyển dụng</span>
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

export default AdminRecruiters;
