import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  return (
    <div className="bg-slate-50 text-slate-900 h-screen flex flex-col font-display antialiased">
      {/* Top Navigation Bar - Matching Jobs.jsx EXACTLY */}
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
            <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-200/60 text-slate-900 font-bold transition-colors">
              <span className="material-symbols-outlined text-[20px]">account_circle</span>
              <span className="text-[13px]">Hồ sơ</span>
            </Link>
            <Link to="/profile/cv" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-200/40 hover:text-slate-900 transition-colors font-semibold">
              <span className="material-symbols-outlined text-[20px]">description</span>
              <span className="text-[13px]">CV của tôi</span>
            </Link>
            <Link to="/profile/applications" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-200/40 hover:text-slate-900 transition-colors font-semibold">
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
            {/* Thông tin cá nhân */}
            <section className="mb-16">
              <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Thông tin cá nhân</h1>
                <p className="text-slate-500 text-[15px]">Cập nhật thông tin cá nhân và tóm tắt chuyên môn của bạn để thu hút nhà tuyển dụng.</p>
              </div>

              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Họ và tên</label>
                    <input 
                      type="text" 
                      defaultValue="Nguyễn Văn A" 
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] font-medium text-slate-800 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Email liên hệ</label>
                    <input 
                      type="email" 
                      defaultValue="nguyen.vana@example.com" 
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] font-medium text-slate-800 shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Vai trò</label>
                    <input 
                      type="text" 
                      defaultValue="Chuyên viên Tuyển dụng Cao cấp" 
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] font-medium text-slate-800 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Số điện thoại</label>
                    <input 
                      type="tel" 
                      defaultValue="090 123 4567" 
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] font-medium text-slate-800 shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Tóm tắt chuyên môn</label>
                  <textarea 
                    rows={4}
                    defaultValue="Hơn 5 năm kinh nghiệm trong lĩnh vực tuyển dụng nhân sự mảng IT. Có khả năng xây dựng chiến lược thu hút nhân tài và tối ưu hóa quy trình phỏng vấn."
                    className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] font-medium text-slate-800 shadow-sm resize-none leading-relaxed"
                  ></textarea>
                </div>

                <div className="flex justify-end pt-6 border-t border-slate-100">
                  <button className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-opacity text-sm shadow-lg shadow-primary/20">
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            </section>

            {/* Đổi mật khẩu */}
            <section className="mb-8">
              <div className="mb-10">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Đổi mật khẩu</h2>
                <p className="text-slate-500 text-[15px]">Đảm bảo tài khoản của bạn đang sử dụng một mật khẩu dài và ngẫu nhiên để giữ an toàn.</p>
              </div>

              <div className="flex flex-col gap-8">
                <div className="space-y-2.5 max-w-md">
                  <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Mật khẩu hiện tại</label>
                  <input 
                    type="password" 
                    defaultValue="12345678" 
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-lg tracking-widest text-slate-800 shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Mật khẩu mới</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-lg tracking-widest text-slate-800 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Xác nhận mật khẩu mới</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-lg tracking-widest text-slate-800 shadow-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-slate-100">
                  <button className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-opacity text-sm shadow-lg shadow-primary/20">
                    Cập nhật mật khẩu
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
