import React from 'react';
import { Link, useParams } from 'react-router-dom';

const MockInterview = () => {
  const { id } = useParams();

  return (
    <div className="bg-slate-50 text-slate-900 h-screen flex flex-col font-display antialiased overflow-hidden w-full">
      {/* Top Navigation Bar - Matching Jobs.jsx EXACTLY */}
      <header className="shrink-0 w-full border-b border-slate-200 bg-white shadow-sm z-20">
        <div className="w-[95%] xl:w-[90%] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8 flex-1">
            <Link className="flex items-center gap-2 group" to="/">
              <div className="bg-primary text-white p-1 rounded">
                <span className="material-symbols-outlined block text-[18px]">temp_preferences_custom</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-primary">HireMind</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" to="/">Trang chủ</Link>
            <Link className="text-sm font-bold text-primary border-b-2 border-primary" to="/jobs">Tuyển dụng</Link>

          </nav>
          <div className="flex items-center gap-4 flex-1 justify-end">
            <button className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-full transition-all">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>
            {/* Logged in state: User profile icon */}
            <Link to="/profile" className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:border-slate-300 transition-all bg-slate-50">
              <span className="text-xs font-semibold px-2 hidden sm:block">Hồ sơ</span>
              <div className="size-6 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px] text-slate-500">person</span>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Breadcrumbs Row */}
        <div className="border-t border-slate-100 bg-slate-50/80">
          <div className="w-[95%] xl:w-[90%] mx-auto px-6 py-2.5">
            <nav className="flex text-xs text-slate-500 gap-2 items-center">
              <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
              <span className="material-symbols-outlined text-[10px]">chevron_right</span>
              <Link className="hover:text-primary transition-colors" to="/jobs">Tuyển dụng</Link>
              <span className="material-symbols-outlined text-[10px]">chevron_right</span>
              <Link className="hover:text-primary transition-colors truncate max-w-[150px] sm:max-w-xs" to={`/jobs/${id}`}>Senior Frontend Developer</Link>
              <span className="material-symbols-outlined text-[10px]">chevron_right</span>
              <span className="text-primary font-bold">Phỏng vấn giả lập</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Main App Layout Wrapper - 90% Width */}
      <div className="flex flex-1 overflow-hidden w-[95%] xl:w-[90%] mx-auto border-x border-slate-200 shadow-sm bg-white shrink-0 h-full">
        
        {/* Left Sidebar / Progress Tracker */}
        <aside className="w-64 lg:w-72 border-r border-slate-200 bg-slate-50/40 flex flex-col hidden md:flex shrink-0">
          <div className="p-5 flex flex-col gap-6 h-full overflow-y-auto">
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">Tiến độ phỏng vấn</h3>
              <div className="space-y-2.5">
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-extrabold text-slate-800">2<span className="text-slate-400 font-medium text-lg">/5</span></span>
                  <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">40% Hoàn thành</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>

            <nav className="space-y-1.5 flex-1 mt-2">
              <div className="flex items-start gap-3 px-3 py-2.5 rounded-xl border border-transparent hover:bg-slate-100 transition-colors text-slate-500 cursor-pointer">
                <span className="material-symbols-outlined text-green-500 text-lg mt-0.5">check_circle</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-700">Câu hỏi 1</h4>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">Giới thiệu bản thân</p>
                </div>
              </div>

              <div className="flex items-start gap-3 px-3 py-2.5 rounded-xl border border-slate-200 bg-white shadow-sm text-slate-900">
                <div className="relative mt-1 flex h-4 w-4 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-20"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary">Câu hỏi 2</h4>
                  <p className="text-xs font-semibold text-slate-600 mt-0.5">React Performance</p>
                </div>
              </div>

              <div className="flex items-start gap-3 px-3 py-2.5 rounded-xl border border-transparent hover:bg-slate-100 transition-colors text-slate-400 cursor-pointer">
                <span className="material-symbols-outlined text-lg mt-0.5 opacity-40">circle</span>
                <div>
                  <h4 className="text-sm font-bold opacity-80">Câu hỏi 3</h4>
                  <p className="text-xs font-medium mt-0.5 opacity-70">State Management</p>
                </div>
              </div>

              <div className="flex items-start gap-3 px-3 py-2.5 rounded-xl border border-transparent hover:bg-slate-100 transition-colors text-slate-400 cursor-pointer">
                <span className="material-symbols-outlined text-lg mt-0.5 opacity-40">circle</span>
                <div>
                  <h4 className="text-sm font-bold opacity-80">Câu hỏi 4</h4>
                  <p className="text-xs font-medium mt-0.5 opacity-70">Architecture Design</p>
                </div>
              </div>

              <div className="flex items-start gap-3 px-3 py-2.5 rounded-xl border border-transparent hover:bg-slate-100 transition-colors text-slate-400 cursor-pointer">
                <span className="material-symbols-outlined text-lg mt-0.5 opacity-40">circle</span>
                <div>
                  <h4 className="text-sm font-bold opacity-80">Câu hỏi 5</h4>
                  <p className="text-xs font-medium mt-0.5 opacity-70">Culture Fit</p>
                </div>
              </div>
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-200">
              <button className="w-full flex items-center justify-center gap-2 rounded-xl h-11 bg-white border border-rose-200 text-rose-600 text-sm font-bold hover:bg-rose-50 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-lg">logout</span>
                Kết thúc
              </button>
            </div>
          </div>
        </aside>

        {/* Center: Main Conversation Area */}
        <main className="flex-1 flex flex-col bg-white relative h-full min-w-0">
          <div className="flex-1 overflow-y-auto px-6 py-8 scroll-smooth pb-32">
            <div className="max-w-2xl mx-auto flex flex-col gap-8">
              
              {/* AI Question Message */}
              <div className="flex gap-4 items-start">
                <div className="size-9 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <span className="material-symbols-outlined text-xl">smart_toy</span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="flex items-center gap-2 ml-1">
                    <span className="text-sm font-bold text-slate-700">Trợ lý AI HireMind</span>
                    <span className="text-[9px] text-primary font-bold uppercase tracking-widest bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">Expert</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-200 relative mr-10">
                    <p className="text-[14px] text-slate-800 leading-relaxed font-medium">
                      Chào mừng bạn đến với phần chuyên sâu về tối ưu hóa. Dựa trên kinh nghiệm làm việc với React của bạn trong các dự án quy mô lớn, bạn sẽ tiếp cận việc xử lý <strong className="text-primary bg-primary/5 px-1 rounded mx-0.5">performance bottleneck</strong> như thế nào khi ứng dụng bắt đầu có hiện tượng giật lag lúc render các danh sách phức tạp?
                    </p>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 ml-1">10:05 AM</span>
                </div>
              </div>

              {/* User Answer Area (Already Submitted) */}
              <div className="flex gap-4 items-start flex-row-reverse">
                <div className="size-9 rounded-full bg-slate-200 flex items-center justify-center shrink-0 border border-slate-300 mt-1">
                  <span className="material-symbols-outlined text-slate-500 text-lg">person</span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1 items-end">
                  <div className="flex items-center gap-2 mr-1">
                    <span className="text-sm font-bold text-slate-700">Bạn</span>
                  </div>
                  <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none shadow-sm relative ml-10">
                    <p className="text-[14px] leading-relaxed opacity-95">
                      Tôi sẽ phân tích component đó để xem phần nào đang trigger re-render không cần thiết. Thường thì tôi sẽ sử dụng `useMemo` và `useCallback` để cache lại kết quả tính toán và referrence của hàm.
                    </p>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 mr-1">Vừa xong</span>
                </div>
              </div>

            </div>
          </div>

          {/* Sticky Input Area at the bottom of center column */}
          <div className="shrink-0 bg-white border-t border-slate-200 p-4 z-10 sticky bottom-0 w-full left-0">
            <div className="max-w-2xl mx-auto flex flex-col gap-2.5">
              <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all shadow-sm">
                <textarea 
                  className="w-full border-0 bg-transparent text-slate-900 placeholder:text-slate-400 placeholder:font-medium resize-none min-h-[80px] max-h-[200px] p-4 text-[14px] leading-relaxed focus:ring-0 outline-none" 
                  placeholder="Nhập câu trả lời... hoặc đặt câu hỏi lại cho AI."
                ></textarea>
                <div className="flex items-center justify-between px-2 py-2 border-t border-slate-100 bg-white">
                  <div className="flex gap-1">
                    <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center" title="Ghi âm">
                      <span className="material-symbols-outlined text-[20px]">mic</span>
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center" title="Viết Code">
                      <span className="material-symbols-outlined text-[20px]">code</span>
                    </button>
                  </div>
                  <button className="flex items-center gap-1.5 bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:shadow-md hover:shadow-primary/20 transition-all active:scale-95">
                    Gửi
                    <span className="material-symbols-outlined text-[16px]">send</span>
                  </button>
                </div>
              </div>
              <p className="text-center text-[10px] text-slate-400 font-medium">Nhấn <kbd className="font-sans px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded font-bold mx-0.5">Shift</kbd> + <kbd className="font-sans px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded font-bold mx-0.5">Enter</kbd> để xuống dòng</p>
            </div>
          </div>
        </main>

        {/* Right Sidebar: AI Feedback */}
        <aside className="w-[350px] xl:w-[400px] border-l border-slate-200 bg-slate-50/70 flex flex-col hidden lg:flex shrink-0">
          <div className="p-6 h-full overflow-y-auto">
            {/* AI Feedback Box - Moved to Right Sidebar */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="size-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-sm border border-amber-200">
                  <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                </div>
                <h3 className="text-sm font-bold text-slate-800">AI Đánh giá & Gợi ý</h3>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                {/* Score Summary */}
                <div className="p-5 border-b border-slate-100 flex flex-col gap-4 bg-slate-50/50">
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Độ chính xác</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-green-600">8.5</span>
                      <span className="text-[10px] font-bold text-slate-400">/10</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Kỹ năng mềm</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-amber-500">7.0</span>
                      <span className="text-[10px] font-bold text-slate-400">/10</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 block">Khái quát</span>
                    <p className="text-[13px] font-medium text-slate-700 leading-snug">Bạn đã đề cập tốt về `useMemo` nhưng lại bỏ sót giải pháp quan trọng nhất cho mảng dữ liệu lớn là Windowing.</p>
                  </div>
                </div>
                
                {/* Detailed Suggestion */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-amber-500 bg-amber-50 p-1 rounded border border-amber-100 text-[16px]">lightbulb</span>
                    <span className="text-[13px] font-bold text-slate-800">Gợi ý trả lời hoàn hảo</span>
                  </div>
                  <div className="text-[13px] text-slate-600 space-y-3 leading-relaxed">
                    <p>Nên tư duy theo mô hình <strong>Identify → Measure → Action</strong> để thể hiện tư duy Senior:</p>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl mt-2 space-y-3">
                      <p className="flex flex-col gap-0.5">
                        <span className="font-bold text-primary text-xs uppercase tracking-wider">1. Đo lường:</span>
                        <span className="text-slate-700">Dùng React DevTools Profiler đánh giá (TBT) Total Blocking Time để khoanh vùng Component.</span>
                      </p>
                      <p className="flex flex-col gap-0.5">
                        <span className="font-bold text-primary text-xs uppercase tracking-wider">2. Hành động:</span>
                        <span className="text-slate-700">Danh sách khổng lồ không thể khắc phục bằng <code className="bg-white border border-slate-200 text-primary px-1 py-0.5 rounded font-mono text-[10px] mx-1">useMemo</code>. Cần sử dụng <strong>Virtualization / Windowing</strong> (<code className="bg-white border border-slate-200 text-primary px-1 py-0.5 rounded font-mono text-[10px] mx-1">react-window</code>).</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Feedback Actions */}
                <div className="px-5 py-3.5 flex items-center justify-between bg-slate-50 border-t border-slate-100">
                  <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[16px]">bookmark_add</span> Lưu ghi chú học tập
                  </button>
                </div>
              </div>

              {/* Next action button */}
              <button className="mt-4 flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-3.5 rounded-xl text-sm font-bold hover:bg-primary transition-all shadow-sm">
                Chuyển câu tiếp theo
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default MockInterview;
