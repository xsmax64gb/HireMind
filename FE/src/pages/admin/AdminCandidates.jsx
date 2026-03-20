import React from 'react';
import { Link } from 'react-router-dom';

const AdminCandidates = () => {
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
          <Link to="/admin/candidates" className="flex items-center gap-3 px-3 py-2.5 text-[14px] font-bold rounded-xl bg-slate-100 text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">group</span>
            Quản lý Ứng viên
          </Link>
          <Link to="/admin/recruiters" className="flex items-center gap-3 px-3 py-2.5 text-[14px] font-semibold rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
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

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-[#fafafa] ml-64 min-w-0 h-screen overflow-y-auto">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center sticky top-0 z-40 shrink-0">
          <h2 className="text-[13px] font-semibold text-slate-500">
            Hệ thống / <span className="text-slate-900 font-bold">Quản lý Ứng viên</span>
          </h2>
        </header>

        {/* Page Body */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">Quản lý Ứng viên</h1>
              <p className="text-slate-500 text-[14px]">Xem và quản lý danh sách các ứng viên tham gia tuyển dụng.</p>
            </div>
            <button className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-[13px] hover:bg-primary transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 outline-none">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Thêm Ứng viên
            </button>
          </div>

          {/* Filters & Search */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
            <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                <input className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-medium focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-500" placeholder="Tìm kiếm theo tên hoặc email..." type="text" />
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  Bộ lọc
                </button>
                <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  Xuất dữ liệu
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Họ và Tên</th>
                    <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Email</th>
                    <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Ngày tham gia</th>
                    <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Trạng thái</th>
                    <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Row 1 */}
                  <tr className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[13px] font-bold text-slate-600">LH</div>
                        <span className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">Lê Hoàng</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">lehoang@email.com</td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">12/10/2023</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100">
                        Hoạt động
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors tooltip" title="Xem">
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
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
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[13px] font-bold text-slate-600">NP</div>
                        <span className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">Nguyễn Phương</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">nphuong@email.com</td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">15/10/2023</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                        Ngừng hoạt động
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors tooltip" title="Xem">
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
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
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[13px] font-bold text-slate-600">TM</div>
                        <span className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">Trần Minh</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">tranminh@email.com</td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">20/10/2023</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100">
                        Hoạt động
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors tooltip" title="Xem">
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
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
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[13px] font-bold text-slate-600">VT</div>
                        <span className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">Võ Thành</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">vothanh@email.com</td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">02/11/2023</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100">
                        Hoạt động
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors tooltip" title="Xem">
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip" title="Sửa">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors tooltip" title="Xóa">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 5 */}
                  <tr className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[13px] font-bold text-slate-600">KL</div>
                        <span className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">Kiều Loan</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">kieuloan@email.com</td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">05/11/2023</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                        Ngừng hoạt động
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors tooltip" title="Xem">
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
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

            {/* Pagination */}
            <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
              <span className="text-[13px] text-slate-500 font-medium">Hiển thị <span className="font-bold text-slate-900">1</span> đến <span className="font-bold text-slate-900">5</span> trong <span className="font-bold text-slate-900">24</span> ứng viên</span>
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

export default AdminCandidates;
