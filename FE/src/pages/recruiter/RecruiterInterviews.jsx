import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '@/utils/authUtils';
import RecruiterSidebar from '@/components/common/RecruiterSidebar';
import RecruiterHeader from '@/components/common/RecruiterHeader';

const RecruiterInterviews = () => {
  const user = getUser();
  return (
    <div className="bg-slate-50 text-slate-900 h-screen flex font-display antialiased overflow-hidden">
      
      <RecruiterSidebar activeTab="interviews" user={user} />

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <RecruiterHeader user={user} />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto w-full">
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-900">Tạo câu hỏi phỏng vấn AI</h1>
                <p className="text-slate-500 text-[15px]">Tự động hóa quy trình soạn thảo câu hỏi phỏng vấn dựa trên JD của bạn.</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button className="px-5 py-2.5 text-sm font-bold border border-slate-200 bg-white hover:bg-slate-50 rounded-xl transition-colors text-slate-700 shadow-sm">
                  Lưu bản nháp
                </button>
                <button className="px-5 py-2.5 text-sm font-bold bg-slate-900 text-white hover:bg-primary rounded-xl transition-colors shadow-lg shadow-black/10 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  Xuất bộ câu hỏi
                </button>
              </div>
            </div>

            {/* Step 1: Selection */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-10 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div className="md:col-span-2 flex flex-col gap-2.5">
                  <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Chọn vị trí tuyển dụng</label>
                  <select className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[15px] font-medium text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm">
                    <option>Senior Fullstack Engineer (React/Node.js)</option>
                    <option>Product Marketing Manager</option>
                    <option>UI/UX Designer - Fintech Project</option>
                    <option>Data Analyst (Supply Chain)</option>
                  </select>
                </div>
                <button className="w-full h-[52px] bg-primary text-white font-bold text-[14px] rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-md shadow-primary/20">
                  <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                  Tạo câu hỏi AI
                </button>
              </div>
            </div>

            {/* Question Categories */}
            <div className="space-y-10">
              {/* Category: Technical */}
              <section>
                <div className="flex items-center gap-3 mb-5 pl-2 border-l-4 border-sky-500">
                  <h3 className="text-lg font-bold text-slate-800 leading-none">Kỹ năng chuyên môn <span className="text-slate-500 font-semibold">(Technical)</span></h3>
                  <span className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-600 uppercase rounded-md border border-slate-200">4 câu hỏi</span>
                </div>
                <div className="flex flex-col gap-4">
                  {/* Card 1 */}
                  <label className="group bg-white border border-slate-200 p-5 rounded-2xl flex items-start gap-4 hover:border-primary hover:shadow-md transition-all cursor-pointer shadow-sm relative">
                    <div className="pt-0.5">
                      <input className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer transition-all" type="checkbox" defaultChecked />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[15px] text-slate-900 mb-2 leading-snug group-hover:text-primary transition-colors">Bạn hãy giải thích cách tối ưu hóa Performance cho một ứng dụng React quy mô lớn?</p>
                      <div className="flex gap-2">
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">Performance</span>
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">React.js</span>
                      </div>
                    </div>
                    <button type="button" className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-primary hover:bg-slate-50 transition-all rounded-lg absolute right-4 top-4">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                  </label>

                  {/* Card 2 */}
                  <label className="group bg-white border border-slate-200 p-5 rounded-2xl flex items-start gap-4 hover:border-primary hover:shadow-md transition-all cursor-pointer shadow-sm relative">
                    <div className="pt-0.5">
                      <input className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer transition-all" type="checkbox" defaultChecked />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[15px] text-slate-900 mb-2 leading-snug group-hover:text-primary transition-colors">Kể về một sự cố hệ thống nghiêm trọng bạn từng gặp và cách bạn debug nó?</p>
                      <div className="flex gap-2">
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">Problem Solving</span>
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">System Design</span>
                      </div>
                    </div>
                    <button type="button" className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-primary hover:bg-slate-50 transition-all rounded-lg absolute right-4 top-4">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                  </label>
                </div>
              </section>

              {/* Category: Soft Skills */}
              <section>
                <div className="flex items-center gap-3 mb-5 pl-2 border-l-4 border-amber-500">
                  <h3 className="text-lg font-bold text-slate-800 leading-none">Kỹ năng mềm <span className="text-slate-500 font-semibold">(Soft skills)</span></h3>
                  <span className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-600 uppercase rounded-md border border-slate-200">3 câu hỏi</span>
                </div>
                <div className="flex flex-col gap-4">
                  {/* Card 3 */}
                  <label className="group bg-white border border-slate-200 p-5 rounded-2xl flex items-start gap-4 hover:border-primary hover:shadow-md transition-all cursor-pointer shadow-sm relative">
                    <div className="pt-0.5">
                      <input className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer transition-all" type="checkbox" defaultChecked />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[15px] text-slate-900 mb-2 leading-snug group-hover:text-primary transition-colors">Làm thế nào để bạn thuyết phục các stakeholders khi có bất đồng về technical debt?</p>
                      <div className="flex gap-2">
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">Communication</span>
                      </div>
                    </div>
                    <button type="button" className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-primary hover:bg-slate-50 transition-all rounded-lg absolute right-4 top-4">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                  </label>
                </div>
              </section>

              {/* Category: Culture */}
              <section>
                <div className="flex items-center gap-3 mb-5 pl-2 border-l-4 border-emerald-500">
                  <h3 className="text-lg font-bold text-slate-800 leading-none">Văn hóa công ty <span className="text-slate-500 font-semibold">(Cultural fit)</span></h3>
                  <span className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-600 uppercase rounded-md border border-slate-200">2 câu hỏi</span>
                </div>
                <div className="flex flex-col gap-4">
                  {/* Card 4 */}
                  <label className="group bg-white border border-slate-200 p-5 rounded-2xl flex items-start gap-4 hover:border-primary hover:shadow-md transition-all cursor-pointer shadow-sm relative">
                    <div className="pt-0.5">
                      <input className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer transition-all" type="checkbox" defaultChecked />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[15px] text-slate-900 mb-2 leading-snug group-hover:text-primary transition-colors">Giá trị cốt lõi nào của một team công nghệ mà bạn đánh giá cao nhất?</p>
                      <div className="flex gap-2">
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">Ownership</span>
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">Teamwork</span>
                      </div>
                    </div>
                    <button type="button" className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-primary hover:bg-slate-50 transition-all rounded-lg absolute right-4 top-4">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                  </label>
                </div>
              </section>
            </div>

            {/* Footer Action */}
            <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 bg-slate-100/80 rounded-2xl border border-slate-200 gap-6">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="bg-white rounded-full p-1.5 shadow-sm">
                  <span className="material-symbols-outlined block text-[24px]">info</span>
                </div>
                <p className="text-[14px] font-medium">Bạn đã chọn <span className="font-bold text-primary">3 câu hỏi</span> để thêm vào Interview Kit.</p>
              </div>
              <button className="w-full md:w-auto px-8 py-3.5 bg-primary text-white text-[14px] font-bold rounded-xl shadow-md hover:bg-slate-800 transition-colors shadow-black/10">
                Thêm vào Bộ câu hỏi
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterInterviews;
