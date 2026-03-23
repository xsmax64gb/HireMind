import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, removeToken, removeUser } from '@/utils/authUtils';

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
      {/* Top Navigation Bar - Matching Home.jsx */}
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
            <Link className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" to="/jobs">Tuyển dụng</Link>

          </nav>
          <div className="flex items-center gap-4 flex-1 justify-end">
            <button className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-full transition-all">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>

            {/* User Profile Dropdown */}
            <div className="relative group">
              <Link to="/profile" className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:border-slate-300 transition-all bg-slate-50 cursor-pointer">
                <span className="text-xs font-semibold px-2">Hồ sơ</span>
                <div className="size-8 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm text-slate-500">person</span>
                </div>
              </Link>
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2 space-y-1">
                  <Link to="/profile" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-50 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">account_circle</span>
                    Quản lý tài khoản
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-rose-600 rounded-md hover:bg-rose-50 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl w-full mx-auto overflow-hidden bg-white shadow-sm border-x border-slate-200">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-200 bg-slate-50/50 shrink-0 flex flex-col py-8">
          <div className="px-6 mb-8">
            <div className="flex items-center gap-3 w-full">
              <div className="size-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xl border border-slate-300 shadow-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex flex-col flex-1 truncate">
                <span className="text-[15px] font-bold text-slate-900 truncate">{user?.name || 'Người dùng'}</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold truncate">Premium Member</span>
              </div>
            </div>
          </div>

          <nav className="space-y-2 px-5 flex-1">
            <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-200/40 hover:text-slate-900 transition-colors font-semibold">
              <span className="material-symbols-outlined text-[20px]">account_circle</span>
              <span className="text-[13px]">Hồ sơ</span>
            </Link>
            <Link to="/profile/cv" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-200/60 text-slate-900 font-bold transition-colors">
              <span className="material-symbols-outlined text-[20px]">description</span>
              <span className="text-[13px]">CV của tôi</span>
            </Link>
            <Link to="/profile/applications" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-200/40 hover:text-slate-900 transition-colors font-semibold">
              <span className="material-symbols-outlined text-[20px]">work</span>
              <span className="text-[13px]">Đơn ứng tuyển</span>
            </Link>

            <div className="pt-2 mt-2 border-t border-slate-200/50">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-bold">
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
