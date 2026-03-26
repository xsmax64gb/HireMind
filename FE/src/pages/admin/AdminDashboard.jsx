import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '@/components/common/AdminSidebar';

const AdminDashboard = () => {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex font-display antialiased">
      
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="ml-64 flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* Header */}
        <header className="h-16 border-b border-slate-200 flex items-center px-8 bg-white/80 backdrop-blur-md sticky top-0 z-40 shrink-0">
          <h2 className="text-[13px] font-extrabold text-slate-500 uppercase tracking-widest">Tổng quan hệ thống</h2>
        </header>

        <div className="p-8 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* Stats Grid - 3 Columns since 4th was removed */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stat Card 1 */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[14px] font-bold text-slate-500">Tổng người dùng</span>
                <span className="material-symbols-outlined text-blue-500 bg-blue-50 p-2 rounded-xl">person</span>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900">12,840</span>
                <span className="text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mb-1 flex items-center gap-1">
                  +5.2% <span className="material-symbols-outlined text-[14px]">trending_up</span>
                </span>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[14px] font-bold text-slate-500">Việc làm đang mở</span>
                <span className="material-symbols-outlined text-violet-500 bg-violet-50 p-2 rounded-xl">work</span>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900">452</span>
                <span className="text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mb-1 flex items-center gap-1">
                  +2.1% <span className="material-symbols-outlined text-[14px]">trending_up</span>
                </span>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[14px] font-bold text-slate-500">Đơn ứng tuyển mới</span>
                <span className="material-symbols-outlined text-emerald-500 bg-emerald-50 p-2 rounded-xl">description</span>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900">1,205</span>
                <span className="text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mb-1 flex items-center gap-1">
                  +18.4% <span className="material-symbols-outlined text-[14px]">trending_up</span>
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activities Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-[16px] font-bold tracking-tight text-slate-900">Hoạt động gần đây</h3>
              <button className="px-4 py-2 bg-slate-900 text-white text-[12px] font-bold rounded-xl hover:bg-primary transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 outline-none">
                Tải báo cáo
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white border-b border-slate-100">
                    <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Người thực hiện</th>
                    <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Thao tác</th>
                    <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Trạng thái</th>
                    <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest text-right">Thời gian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 border border-blue-200 flex items-center justify-center font-bold text-[13px]">
                          TV
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">Trần Văn B</p>
                          <p className="text-[11px] font-semibold text-slate-400">Recruiter</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[14px] font-medium text-slate-700">
                      Đăng tin tuyển dụng <span className="font-bold text-slate-900">"Senior Dev"</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100">Hoàn tất</span>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-500 text-right">
                      Hôm nay, 14:20
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 border border-violet-200 flex items-center justify-center font-bold text-[13px]">
                          LN
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">Lê Nam</p>
                          <p className="text-[11px] font-semibold text-slate-400">Candidate</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[14px] font-medium text-slate-700">
                      Nộp hồ sơ cho vị trí <span className="font-bold text-slate-900">UI Designer</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-amber-50 text-amber-600 border border-amber-100">Đang chờ</span>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-500 text-right">
                      Hôm nay, 11:05
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 border border-rose-200 flex items-center justify-center font-bold text-[13px]">
                          PH
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">Phạm Hương</p>
                          <p className="text-[11px] font-semibold text-slate-400">HR Manager</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[14px] font-medium text-slate-700">
                      Phê duyệt <span className="font-bold text-slate-900">5</span> đơn ứng tuyển
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100">Hoàn tất</span>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-500 text-right">
                      Hôm qua, 18:45
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
