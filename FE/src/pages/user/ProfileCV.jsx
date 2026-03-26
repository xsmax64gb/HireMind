import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, removeToken, removeUser } from '@/utils/authUtils';
import Navbar from '@/components/layout/Navbar';
import UserSidebar from '@/components/common/UserSidebar';

const ProfileCV = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };
  return (
    <div className="bg-slate-50 text-slate-900 h-screen flex flex-col font-display antialiased">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto overflow-hidden bg-white shadow-sm border-x border-slate-200">
        <UserSidebar 
          user={user} 
          handleLogout={handleLogout} 
          profileName={user?.name || 'Người dùng'} 
        />

        {/* Main Content */}
        <main className="flex-1 bg-white p-12 overflow-y-auto">
          <div className="max-w-5xl">
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Quản lý CV</h1>
              <p className="text-slate-500 text-[15px]">Danh sách các CV bạn đã tải lên hệ thống.</p>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center mb-10 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="size-16 bg-white rounded-full flex items-center justify-center border border-slate-200 mb-4 group-hover:shadow-md transition-all group-hover:border-primary/30">
                <span className="material-symbols-outlined text-3xl text-slate-700 group-hover:text-primary transition-colors">upload_file</span>
              </div>
              <h3 className="text-[15px] font-bold text-slate-900 mb-1">Tải lên CV mới</h3>
              <p className="text-[13px] text-slate-500">Kéo và thả tệp tại đây hoặc nhấp để chọn tệp (PDF, DOCX - Tối đa 5MB)</p>
            </div>

            {/* CV List */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 grid grid-cols-12 gap-4">
                <div className="col-span-8 md:col-span-6 text-[13px] font-bold text-slate-600">Tên tệp tin</div>
                <div className="hidden md:block col-span-4 text-[13px] font-bold text-slate-600">Ngày tải lên</div>
                <div className="col-span-4 md:col-span-2 text-[13px] font-bold text-slate-600 text-right">Thao tác</div>
              </div>

              <div className="divide-y divide-slate-100 bg-white">
                {/* Item 1 */}
                <div className="px-6 py-5 grid grid-cols-12 gap-4 items-center hover:bg-slate-50/50 transition-colors group">
                  <div className="col-span-8 md:col-span-6 flex items-center gap-4">
                    <div className="text-rose-500 flex items-center justify-center bg-rose-50 p-2 rounded-lg">
                      <span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
                    </div>
                    <span className="text-[14px] font-bold text-slate-800 truncate group-hover:text-primary transition-colors cursor-pointer">NguyenVanA_CV_Recruiter_2024.pdf</span>
                  </div>
                  <div className="hidden md:block col-span-4 text-[13px] text-slate-500 font-medium">12 tháng 05, 2024</div>
                  <div className="col-span-4 md:col-span-2 flex items-center gap-4 justify-end text-slate-400">
                    <button className="hover:text-primary transition-colors tooltip" title="Xem trước">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                    <button className="hover:text-primary transition-colors tooltip" title="Tải xuống">
                      <span className="material-symbols-outlined text-[20px]">download</span>
                    </button>
                    <button className="hover:text-rose-600 transition-colors tooltip" title="Xóa">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="px-6 py-5 grid grid-cols-12 gap-4 items-center hover:bg-slate-50/50 transition-colors group">
                  <div className="col-span-8 md:col-span-6 flex items-center gap-4">
                    <div className="text-blue-500 flex items-center justify-center bg-blue-50 p-2 rounded-lg">
                      <span className="material-symbols-outlined text-[24px]">description</span>
                    </div>
                    <span className="text-[14px] font-bold text-slate-800 truncate group-hover:text-primary transition-colors cursor-pointer">CV_Tieng_Anh_HR_Manager.docx</span>
                  </div>
                  <div className="hidden md:block col-span-4 text-[13px] text-slate-500 font-medium">28 tháng 04, 2024</div>
                  <div className="col-span-4 md:col-span-2 flex items-center gap-4 justify-end text-slate-400">
                    <button className="hover:text-primary transition-colors tooltip" title="Xem trước">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                    <button className="hover:text-primary transition-colors tooltip" title="Tải xuống">
                      <span className="material-symbols-outlined text-[20px]">download</span>
                    </button>
                    <button className="hover:text-rose-600 transition-colors tooltip" title="Xóa">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
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

export default ProfileCV;
