import React from 'react';
import { Link } from 'react-router-dom';

const RecruiterProfile = () => {
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
          <Link to="/recruiter/profile" className="flex items-center gap-3 px-4 py-3 bg-slate-100 text-primary rounded-xl transition-colors font-bold">
            <span className="material-symbols-outlined text-[20px]">account_circle</span>
            <span className="text-[13px]">Hồ sơ công ty</span>
          </Link>
          <Link to="/recruiter/post-job" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors font-semibold">
            <span className="material-symbols-outlined text-[20px]">post_add</span>
            <span className="text-[13px]">Đăng tin tuyển dụng</span>
          </Link>
          <Link to="/recruiter/jobs" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors font-semibold">
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
            <Link to="/recruiter/profile" className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border-2 border-primary bg-slate-50 shadow-sm transition-all">
              <span className="text-xs font-bold text-primary px-2">Hồ sơ HR</span>
              <div className="size-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-sm text-white">person</span>
              </div>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto w-full">
          <div className="max-w-4xl mx-auto w-full">
            
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-900">Hồ sơ Công ty</h1>
              <p className="text-slate-500 text-[15px]">Quản lý thông tin doanh nghiệp và tài khoản nhà tuyển dụng của bạn.</p>
            </div>

            <div className="flex flex-col gap-8">
              
              {/* Company Information Form */}
              <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transform transition-all hover:shadow-md">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <span className="material-symbols-outlined text-[20px] block">domain</span>
                  </div>
                  <h2 className="text-[16px] font-bold text-slate-900">Thông tin Doanh nghiệp</h2>
                </div>
                
                <div className="p-8 flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-slate-700">Tên công ty</label>
                      <input className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" type="text" placeholder="Nhập tên công ty" defaultValue="TechNova Solutions" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-slate-700">Website (URL)</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">language</span>
                        <input className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" type="url" placeholder="https://example.com" defaultValue="https://technova.io" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-slate-700">Quy mô công ty</label>
                      <select className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-medium text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
                        <option value="1-50">1 - 50 nhân viên</option>
                        <option value="51-200" selected>51 - 200 nhân viên</option>
                        <option value="201-500">201 - 500 nhân viên</option>
                        <option value="500+">Trên 500 nhân viên</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-slate-700">Vị trí trụ sở chính</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">location_on</span>
                        <input className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" type="text" placeholder="Thành phố, Tỉnh" defaultValue="TP. Hồ Chí Minh" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-slate-700">Mô tả ngắn gọn về công ty</label>
                    <textarea className="w-full px-4 py-3 h-28 resize-none bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" placeholder="Viết vài dòng giới thiệu về lĩnh vực hoạt động của công ty bạn..."></textarea>
                  </div>

                  <div className="flex justify-end mt-2">
                    <button className="px-6 py-2.5 bg-slate-900 text-white text-[13px] font-bold rounded-xl hover:bg-primary transition-colors shadow-sm">
                      Lưu thông tin công ty
                    </button>
                  </div>
                </div>
              </section>

              {/* Security & Password Section */}
              <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transform transition-all hover:shadow-md">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <span className="material-symbols-outlined text-[20px] block">lock</span>
                  </div>
                  <h2 className="text-[16px] font-bold text-slate-900">Tính năng Bảo mật</h2>
                </div>
                
                <div className="p-8 flex flex-col gap-6">
                  <p className="text-[14px] text-slate-500 mb-2">Đảm bảo tài khoản tuyển dụng của bạn có một mật khẩu mạnh và an toàn.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2 md:col-span-2 max-w-md">
                      <label className="text-[13px] font-bold text-slate-700">Mật khẩu hiện tại</label>
                      <input className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" type="password" placeholder="••••••••" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-slate-700">Mật khẩu mới</label>
                      <input className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" type="password" placeholder="Tạo mật khẩu mới" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-slate-700">Xác nhận mật khẩu mới</label>
                      <input className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" type="password" placeholder="Nhập lại mật khẩu mới" />
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button className="px-6 py-2.5 bg-slate-900 text-white text-[13px] font-bold rounded-xl hover:bg-primary transition-colors shadow-sm">
                      Đổi mật khẩu
                    </button>
                  </div>
                </div>
              </section>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterProfile;
