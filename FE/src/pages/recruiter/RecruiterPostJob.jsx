import React from 'react';
import { Link } from 'react-router-dom';

const RecruiterPostJob = () => {
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
          <Link to="/recruiter/post-job" className="flex items-center gap-3 px-4 py-3 bg-slate-100 text-primary rounded-xl transition-colors font-bold">
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
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 w-full">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-900">Đăng tin tuyển dụng mới</h1>
                <p className="text-slate-500 text-[15px]">Điền thông tin chi tiết để tìm ứng viên phù hợp nhất cho vị trí của bạn.</p>
              </div>
              <div className="flex gap-3 shrink-0 mt-4 sm:mt-0">
                <button className="px-5 py-2.5 text-sm font-bold border border-slate-200 bg-white hover:bg-slate-50 rounded-xl transition-colors text-slate-700 shadow-sm">Lưu bản nháp</button>
                <button className="px-6 py-2.5 text-sm font-bold bg-primary text-white hover:opacity-90 rounded-xl transition-colors shadow-lg shadow-primary/20">Đăng tin</button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
              <div className="p-8 md:p-10 space-y-12">
                
                {/* 1. Basic */}
                <section>
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-8">
                    <div className="bg-slate-100 p-2 rounded-xl text-slate-600">
                      <span className="material-symbols-outlined text-[20px] block">article</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Thông tin cơ bản</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2.5 md:col-span-2">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Tiêu đề công việc <span className="text-rose-500">*</span></label>
                      <input className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-[15px] shadow-sm font-medium" placeholder="VD: Senior Frontend Developer" type="text" />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Địa điểm <span className="text-rose-500">*</span></label>
                      <input className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-[15px] shadow-sm font-medium" placeholder="VD: Quận 1, TP. Hồ Chí Minh" type="text" />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Loại hình làm việc</label>
                      <select className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] shadow-sm text-slate-800 bg-white font-medium">
                        <option>Toàn thời gian</option>
                        <option>Bán thời gian</option>
                        <option>Thực tập</option>
                        <option>Freelance</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2.5 md:col-span-2">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Cấp bậc kinh nghiệm</label>
                      <select className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] shadow-sm text-slate-800 bg-white font-medium">
                        <option>Intern / Fresher</option>
                        <option>Junior</option>
                        <option>Middle</option>
                        <option>Senior</option>
                        <option>Manager</option>
                        <option>Director</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* 2. Salary */}
                <section>
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-8">
                    <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl border border-emerald-100">
                      <span className="material-symbols-outlined text-[20px] block">payments</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Mức lương</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Tối thiểu</label>
                      <div className="relative">
                        <input className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-[15px] shadow-sm font-bold text-slate-800" placeholder="0" type="number" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Tối đa</label>
                      <div className="relative">
                        <input className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-[15px] shadow-sm font-bold text-slate-800" placeholder="Thỏa thuận" type="number" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Đơn vị tiền tệ</label>
                      <select className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] shadow-sm text-slate-800 bg-white font-bold">
                        <option>VNĐ</option>
                        <option>USD</option>
                        <option>EUR</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* 3. Content */}
                <section>
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-8">
                    <div className="bg-sky-50 text-sky-600 p-2 rounded-xl border border-sky-100">
                      <span className="material-symbols-outlined text-[20px] block">edit_document</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Nội dung chi tiết</h3>
                  </div>
                  <div className="space-y-8">
                    {/* Description */}
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Mô tả công việc</label>
                      <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-primary transition-all shadow-sm">
                        <div className="flex gap-1 p-2 bg-slate-50 border-b border-slate-200">
                          <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-600"><span className="material-symbols-outlined text-[18px] block">format_bold</span></button>
                          <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-600"><span className="material-symbols-outlined text-[18px] block">format_italic</span></button>
                          <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-600"><span className="material-symbols-outlined text-[18px] block">format_list_bulleted</span></button>
                        </div>
                        <textarea className="w-full px-5 py-4 border-none focus:ring-0 resize-y outline-none text-[15px] leading-relaxed font-medium" placeholder="Mô tả các nhiệm vụ hàng ngày..." rows="4"></textarea>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Yêu cầu công việc</label>
                      <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-primary transition-all shadow-sm">
                        <div className="flex gap-1 p-2 bg-slate-50 border-b border-slate-200">
                          <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-600"><span className="material-symbols-outlined text-[18px] block">format_bold</span></button>
                          <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-600"><span className="material-symbols-outlined text-[18px] block">format_list_bulleted</span></button>
                        </div>
                        <textarea className="w-full px-5 py-4 border-none focus:ring-0 resize-y outline-none text-[15px] leading-relaxed font-medium" placeholder="Các kỹ năng và kinh nghiệm cần thiết..." rows="4"></textarea>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Quyền lợi & Phúc lợi</label>
                      <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-primary transition-all shadow-sm">
                        <div className="flex gap-1 p-2 bg-slate-50 border-b border-slate-200">
                          <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-600"><span className="material-symbols-outlined text-[18px] block">format_bold</span></button>
                          <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-600"><span className="material-symbols-outlined text-[18px] block">format_list_bulleted</span></button>
                        </div>
                        <textarea className="w-full px-5 py-4 border-none focus:ring-0 resize-y outline-none text-[15px] leading-relaxed font-medium" placeholder="Chế độ bảo hiểm, thưởng, nghỉ phép..." rows="4"></textarea>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 4. Skills */}
                <section>
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-8">
                    <div className="bg-fuchsia-50 text-fuchsia-600 p-2 rounded-xl border border-fuchsia-100">
                      <span className="material-symbols-outlined text-[20px] block">psychology</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Kỹ năng yêu cầu</h3>
                  </div>
                  <div className="space-y-5">
                    <div className="flex flex-wrap gap-2.5">
                      <span className="flex items-center gap-1 bg-slate-50 border border-slate-200 pl-3 pr-1.5 py-1.5 rounded-lg text-[13px] font-bold text-slate-700 shadow-sm cursor-default">
                        React.js <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-rose-500 hover:bg-rose-50 rounded transition-colors ml-1 p-0.5">close</span>
                      </span>
                      <span className="flex items-center gap-1 bg-slate-50 border border-slate-200 pl-3 pr-1.5 py-1.5 rounded-lg text-[13px] font-bold text-slate-700 shadow-sm cursor-default">
                        Tailwind CSS <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-rose-500 hover:bg-rose-50 rounded transition-colors ml-1 p-0.5">close</span>
                      </span>
                      <span className="flex items-center gap-1 bg-slate-50 border border-slate-200 pl-3 pr-1.5 py-1.5 rounded-lg text-[13px] font-bold text-slate-700 shadow-sm cursor-default">
                        TypeScript <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-rose-500 hover:bg-rose-50 rounded transition-colors ml-1 p-0.5">close</span>
                      </span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">search</span>
                      <input className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-[15px] font-medium shadow-sm" placeholder="Tìm kiếm và thêm kỹ năng (VD: Figma, Next.js...)" type="text" />
                    </div>
                  </div>
                </section>

                {/* 5. Khác */}
                <section>
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-8">
                    <div className="bg-amber-50 text-amber-600 p-2 rounded-xl border border-amber-100">
                      <span className="material-symbols-outlined text-[20px] block">schedule</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Thông tin khác</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Số lượng cần tuyển</label>
                      <input className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-[15px] font-medium shadow-sm" placeholder="1" type="number" />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Hạn chót nộp hồ sơ</label>
                      <input className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-slate-600 text-[15px] font-bold shadow-sm" type="date" />
                    </div>
                  </div>
                </section>
                
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-end pb-12 border-t border-slate-200 pt-8">
              <button className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold border border-slate-200 bg-white hover:bg-slate-50 rounded-xl transition-colors shadow-sm text-slate-700">
                Lưu bản nháp
              </button>
              <button className="w-full sm:w-auto px-10 py-3.5 text-sm font-bold bg-primary text-white hover:opacity-90 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-[20px]">send</span>
                Đăng tin ngay
              </button>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterPostJob;
