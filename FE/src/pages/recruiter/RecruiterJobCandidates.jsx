import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '@/utils/authUtils';
import RecruiterSidebar from '@/components/common/RecruiterSidebar';
import RecruiterHeader from '@/components/common/RecruiterHeader';

const RecruiterJobCandidates = () => {
  const user = getUser();
  return (
    <div className="bg-slate-50 text-slate-900 h-screen flex font-display antialiased overflow-hidden">
      
      <RecruiterSidebar activeTab="jobs" user={user} />

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <RecruiterHeader user={user} />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto w-full">
          <div className="max-w-6xl mx-auto w-full">
            
            {/* Breadcrumbs */}
            <nav className="flex text-slate-500 text-[13px] font-medium mb-6">
              <ol className="inline-flex items-center space-x-2">
                <li><Link className="hover:text-primary transition-colors" to="/recruiter/jobs">Tin tuyển dụng của tôi</Link></li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-[16px] mx-1 text-slate-300">chevron_right</span>
                  <span className="text-slate-900 font-bold">Senior Frontend Developer</span>
                </li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 w-full">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-900">Chi tiết ứng viên - Senior Frontend Developer</h1>
                <p className="text-slate-500 text-[15px]">Phòng kỹ thuật • Hồ Chí Minh • 24 hồ sơ mới</p>
              </div>
            </div>

            {/* Dashboard Filters */}
            <div className="mb-6 flex flex-wrap items-center border-b border-slate-200 gap-x-8 gap-y-4">
              <button className="pb-3 text-[14px] font-bold text-slate-900 border-b-2 border-slate-900 transition-colors flex items-center gap-1.5">
                Tất cả 
                <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md text-[11px]">48</span>
              </button>
              <button className="pb-3 text-[14px] font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1.5">
                Đang chờ xử lý 
                <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md text-[11px]">12</span>
              </button>
              <button className="pb-3 text-[14px] font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1.5">
                Đã xem xét 
                <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md text-[11px]">15</span>
              </button>
              <button className="pb-3 text-[14px] font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1.5">
                Đã chấp nhận 
                <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md text-[11px]">8</span>
              </button>
              <button className="pb-3 text-[14px] font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1.5">
                Bị từ chối 
                <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md text-[11px]">13</span>
              </button>
              
              <div className="ml-auto flex items-center gap-3 pb-3 w-full sm:w-auto">
                <span className="text-[13px] font-semibold text-slate-400">Sắp xếp theo:</span>
                <select className="bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-900 px-3 py-2 outline-none focus:ring-1 focus:ring-primary shadow-sm">
                  <option>Mới nhất</option>
                  <option>Cũ nhất</option>
                  <option>Đánh giá cao</option>
                </select>
              </div>
            </div>

            {/* Candidates Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <th className="px-8 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500">Tên ứng viên</th>
                      <th className="px-6 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500">Ngày ứng tuyển</th>
                      <th className="px-6 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500 text-center">CV</th>
                      <th className="px-8 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    
                    {/* Applicant 1 */}
                    <tr className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="size-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg font-bold text-slate-500 shrink-0">N</div>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-[15px] text-slate-900 group-hover:text-primary transition-colors cursor-pointer">Nguyễn Văn An</span>
                            <span className="text-[13px] font-medium text-slate-500">an.nguyen@example.com</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-slate-600 font-medium">14 thg 05, 2024</td>
                      <td className="px-6 py-6 text-center">
                        <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/30 transition-colors tooltip" title="Xem CV">
                          <span className="material-symbols-outlined text-[20px]">file_present</span>
                        </button>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            Đang xử lý
                          </button>
                          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">visibility</span>
                            Đã xem
                          </button>
                          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-emerald-200 bg-emerald-50 text-[12px] font-bold text-emerald-700 hover:bg-emerald-100 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            Chấp nhận
                          </button>
                          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-rose-200 bg-rose-50 text-[12px] font-bold text-rose-700 hover:bg-rose-100 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">cancel</span>
                            Từ chối
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Applicant 2 */}
                    <tr className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="size-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg font-bold text-slate-500 shrink-0">L</div>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-[15px] text-slate-900 group-hover:text-primary transition-colors cursor-pointer">Lê Thị Bình</span>
                            <span className="text-[13px] font-medium text-slate-500">binh.le@example.com</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-slate-600 font-medium">12 thg 05, 2024</td>
                      <td className="px-6 py-6 text-center">
                        <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/30 transition-colors tooltip" title="Xem CV">
                          <span className="material-symbols-outlined text-[20px]">file_present</span>
                        </button>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            Đang xử lý
                          </button>
                          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">visibility</span>
                            Đã xem
                          </button>
                          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-emerald-200 bg-emerald-50 text-[12px] font-bold text-emerald-700 hover:bg-emerald-100 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            Chấp nhận
                          </button>
                          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-rose-200 bg-rose-50 text-[12px] font-bold text-rose-700 hover:bg-rose-100 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">cancel</span>
                            Từ chối
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Applicant 3 */}
                    <tr className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="size-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg font-bold text-slate-500 shrink-0">T</div>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-[15px] text-slate-900 group-hover:text-primary transition-colors cursor-pointer">Trần Văn Cường</span>
                            <span className="text-[13px] font-medium text-slate-500">cuong.tran@example.com</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-slate-600 font-medium">10 thg 05, 2024</td>
                      <td className="px-6 py-6 text-center">
                        <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/30 transition-colors tooltip" title="Xem CV">
                          <span className="material-symbols-outlined text-[20px]">file_present</span>
                        </button>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            Đang xử lý
                          </button>
                          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">visibility</span>
                            Đã xem
                          </button>
                          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-emerald-200 bg-emerald-50 text-[12px] font-bold text-emerald-700 hover:bg-emerald-100 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            Chấp nhận
                          </button>
                          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-rose-200 bg-rose-50 text-[12px] font-bold text-rose-700 hover:bg-rose-100 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">cancel</span>
                            Từ chối
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Applicant 4 */}
                    <tr className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="size-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg font-bold text-slate-500 shrink-0">P</div>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-[15px] text-slate-900 group-hover:text-primary transition-colors cursor-pointer">Phạm Thị Dung</span>
                            <span className="text-[13px] font-medium text-slate-500">dung.pham@example.com</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-slate-600 font-medium">09 thg 05, 2024</td>
                      <td className="px-6 py-6 text-center">
                        <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/30 transition-colors tooltip" title="Xem CV">
                          <span className="material-symbols-outlined text-[20px]">file_present</span>
                        </button>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            Đang xử lý
                          </button>
                          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">visibility</span>
                            Đã xem
                          </button>
                          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-emerald-200 bg-emerald-50 text-[12px] font-bold text-emerald-700 hover:bg-emerald-100 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            Chấp nhận
                          </button>
                          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-rose-200 bg-rose-50 text-[12px] font-bold text-rose-700 hover:bg-rose-100 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">cancel</span>
                            Từ chối
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>

              {/* Pagination Placeholder */}
              <div className="flex items-center justify-between px-8 py-5 border-t border-slate-100 bg-slate-50/50">
                <p className="text-[12.5px] font-medium text-slate-500">Hiển thị 4 ứng viên</p>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterJobCandidates;
