import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '@/utils/authUtils';
import jobService from '@/services/jobService';
import RecruiterSidebar from '@/components/common/RecruiterSidebar';
import RecruiterHeader from '@/components/common/RecruiterHeader';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';

const RecruiterInterviews = () => {
  const user = getUser();
  const [activeSubTab, setActiveSubTab] = useState('generate'); // 'generate' or 'bank'
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [loading, setLoading] = useState(true);
  
  // State for Generation Tab
  const [categorizedQuestions, setCategorizedQuestions] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(['Technical', 'Soft Skills', 'Cultural Fit']);
  const [selectedNewQuestions, setSelectedNewQuestions] = useState([]); 

  // State for Bank Tab
  const [bankQuestions, setBankQuestions] = useState(null);
  const [selectedBankQuestions, setSelectedBankQuestions] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobService.getRecruiterJobs();
        setJobs(data);
        if (data.length > 0) setSelectedJobId(data[0].id);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (activeSubTab === 'bank' && selectedJobId) fetchBankQuestions();
  }, [activeSubTab, selectedJobId]);

  const fetchBankQuestions = async () => {
    try {
      const data = await jobService.getInterviewQuestions(selectedJobId);
      if (data?.length > 0) {
        const grouped = data.reduce((acc, q) => {
          const cat = q.category || 'Technical';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(q);
          return acc;
        }, {});
        setBankQuestions(grouped);
      } else {
        setBankQuestions(null);
      }
      setSelectedBankQuestions([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerate = async () => {
    if (!selectedJobId || selectedTypes.length === 0) return alert('Vui lòng chọn nhóm kỹ năng!');
    setGenerating(true);
    try {
      const response = await jobService.generateInterviewQuestions(selectedJobId, selectedTypes);
      setCategorizedQuestions(response.questions);
      setSelectedNewQuestions([]);
    } catch (error) {
      alert('Lỗi tạo câu hỏi.');
    } finally {
      setGenerating(false);
    }
  };

  const handleToggleType = (type) => {
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const handleSelectAllNew = () => {
    if (!categorizedQuestions) return;
    const all = [];
    Object.keys(categorizedQuestions).forEach(cat => {
      categorizedQuestions[cat].forEach(q => all.push({ ...q, category: cat }));
    });
    if (selectedNewQuestions.length === all.length) setSelectedNewQuestions([]);
    else setSelectedNewQuestions(all);
  };

  const handlePushToBank = async () => {
    if (selectedNewQuestions.length === 0) return alert('Hãy chọn câu hỏi!');
    const grouped = selectedNewQuestions.reduce((acc, q) => {
      if (!acc[q.category]) acc[q.category] = [];
      acc[q.category].push(q);
      return acc;
    }, {});
    try {
      await jobService.saveInterviewQuestions(selectedJobId, grouped);
      alert('Đã đẩy thành công!');
      
      const updatedGen = { ...categorizedQuestions };
      Object.keys(updatedGen).forEach(cat => {
        updatedGen[cat] = updatedGen[cat].filter(q => 
          !selectedNewQuestions.some(sq => sq.question === q.question && sq.category === cat)
        );
        if (updatedGen[cat].length === 0) delete updatedGen[cat];
      });
      setCategorizedQuestions(Object.keys(updatedGen).length > 0 ? updatedGen : null);
      setSelectedNewQuestions([]);
    } catch (error) {
      alert('Lỗi lưu.');
    }
  };

  const handleSelectAllBank = () => {
    if (!bankQuestions) return;
    const allIds = Object.values(bankQuestions).flat().map(q => q.id);
    if (selectedBankQuestions.length === allIds.length) setSelectedBankQuestions([]);
    else setSelectedBankQuestions(allIds);
  };

  const handleDeleteOne = async (id) => {
    if (!confirm('Xóa?')) return;
    try {
      await jobService.deleteInterviewQuestion(id);
      fetchBankQuestions();
    } catch (error) {
      alert('Lỗi.');
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedBankQuestions.length === 0) return;
    if (!confirm(`Xóa ${selectedBankQuestions.length} câu đã chọn?`)) return;
    try {
      await Promise.all(selectedBankQuestions.map(id => jobService.deleteInterviewQuestion(id)));
      fetchBankQuestions();
    } catch (error) {
       alert('Lỗi.');
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm('Xóa sạch kho?')) return;
    try {
      await jobService.deleteAllInterviewQuestions(selectedJobId);
      fetchBankQuestions();
    } catch (error) {
      alert('Lỗi.');
    }
  };

  const handleExportWord = async () => {
    if (selectedBankQuestions.length === 0) return alert('Chọn câu hỏi để xuất.');
    const jobTitle = jobs.find(j => j.id == selectedJobId)?.title || 'Job';
    const allQuestions = Object.values(bankQuestions).flat();
    const questionsToExport = allQuestions.filter(q => selectedBankQuestions.includes(q.id));

    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({ text: `CÂU HỎI & TIÊU CHÍ ĐÁNH GIÁ (HR) - ${jobTitle.toUpperCase()}`, heading: HeadingLevel.HEADING_2, spacing: { after: 300 } }),
          ...questionsToExport.flatMap((q, index) => [
            new Paragraph({
              children: [new TextRun({ text: `Câu ${index + 1}: `, bold: true }), new TextRun({ text: q.question })],
              spacing: { before: 200, after: 100 },
            }),
            new Paragraph({
              children: [new TextRun({ text: "Tiêu chí đánh giá: ", bold: true, italics: true }), new TextRun({ text: q.suggested_answer, italics: true })],
              spacing: { after: 200 },
            })
          ])
        ]
      }]
    });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Questions_${jobTitle}.docx`);
  };

  return (
    <div className="bg-slate-50 text-slate-900 h-screen flex font-display antialiased overflow-hidden">
      <RecruiterSidebar activeTab="interviews" user={user} />
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <RecruiterHeader user={user} />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-1">AI Interviews Hub</h1>
                <p className="text-slate-500 text-sm">Quản lý tiêu chí đánh giá và kho câu hỏi tập trung.</p>
              </div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200">
                <button 
                  onClick={() => setActiveSubTab('generate')}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeSubTab === 'generate' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">psychology</span> Tạo câu hỏi
                </button>
                <button 
                  onClick={() => setActiveSubTab('bank')}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeSubTab === 'bank' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">inventory_2</span> Kho lưu trữ
                </button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-8 items-start">
              {/* Left Column: Side Config */}
              <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-0 space-y-6">
                 <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="space-y-6">
                       <div>
                          <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 tracking-[0.1em] pl-1">Vị trí phỏng vấn</label>
                          <select value={selectedJobId} onChange={(e) => setSelectedJobId(e.target.value)} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none appearance-none cursor-pointer">
                            {jobs.map(job => <option key={job.id} value={job.id}>{job.title}</option>)}
                          </select>
                       </div>

                       {activeSubTab === 'generate' ? (
                         <>
                            <div>
                               <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 tracking-[0.1em] pl-1">Nhóm câu hỏi AI</label>
                               <div className="space-y-2">
                                  {[
                                    { id: 'Technical', label: 'Chuyên môn', icon: 'code' },
                                    { id: 'Soft Skills', label: 'Kỹ năng mềm', icon: 'psychology' },
                                    { id: 'Cultural Fit', label: 'Văn hóa', icon: 'favorite' }
                                  ].map(type => (
                                    <button
                                      key={type.id}
                                      onClick={() => handleToggleType(type.id)}
                                      className={`w-full flex items-center gap-3 px-4 h-12 rounded-xl text-xs font-bold border transition-all ${
                                        selectedTypes.includes(type.id) 
                                        ? 'bg-slate-900 text-white border-slate-900' 
                                        : 'bg-white text-slate-400 border-slate-100'
                                      }`}
                                    >
                                      <span className="material-symbols-outlined text-[18px]">{type.icon}</span>
                                      {type.label.toUpperCase()}
                                    </button>
                                  ))}
                               </div>
                            </div>
                            <button onClick={handleGenerate} disabled={generating} className="w-full h-14 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all text-sm">
                               <span className={`material-symbols-outlined text-[20px] ${generating ? 'animate-spin' : ''}`}>{generating ? 'sync' : 'auto_awesome'}</span>
                               {generating ? 'AI ĐANG SOẠN...' : 'TẠO CÂU HỎI BẰNG AI'}
                            </button>
                         </>
                       ) : (
                         <div className="space-y-4">
                            <div className="p-5 bg-slate-50 rounded-xl">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Thống kê kho</p>
                               <p className="text-2xl font-bold text-slate-900">{bankQuestions ? Object.values(bankQuestions).flat().length : 0} <span className="text-xs font-medium text-slate-500">câu đã lưu</span></p>
                            </div>
                            <div className="space-y-2">
                               <button onClick={handleExportWord} disabled={selectedBankQuestions.length === 0} className={`w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${selectedBankQuestions.length === 0 ? 'bg-slate-100 text-slate-300' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                                  <span className="material-symbols-outlined text-[18px]">download</span> Xuất file Word ({selectedBankQuestions.length})
                               </button>
                               <button onClick={handleDeleteAll} className="w-full py-2.5 text-rose-500 font-bold text-[11px] uppercase tracking-widest hover:bg-rose-50 rounded-lg transition-all">Xóa toàn bộ kho</button>
                            </div>
                         </div>
                       )}
                    </div>
                 </div>
              </div>

              {/* Right Column: Cards Display */}
              <div className="col-span-12 lg:col-span-8 pb-32">
                 {activeSubTab === 'generate' ? (
                    categorizedQuestions ? (
                      <div className="space-y-10">
                        <div className="flex items-center justify-between px-2">
                           <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-600">
                              <input type="checkbox" className="w-4 h-4 rounded border-slate-300" checked={selectedNewQuestions.length === Object.values(categorizedQuestions).flat().length} onChange={handleSelectAllNew} />
                              Chọn tất cả bộ {Object.values(categorizedQuestions).flat().length} câu
                           </label>
                           <button onClick={handlePushToBank} disabled={selectedNewQuestions.length === 0} className={`px-5 h-10 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${selectedNewQuestions.length === 0 ? 'bg-slate-100 text-slate-300' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
                              <span className="material-symbols-outlined text-[18px]">send</span> ĐẨY VÀO KHO
                           </button>
                        </div>

                        {Object.keys(categorizedQuestions).map(cat => (
                          <div key={cat} className="space-y-4">
                             <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-[0.1em] flex items-center gap-3">
                                {cat} <span className="flex-1 h-px bg-slate-200"></span>
                             </h3>
                             <div className="grid gap-3">
                                {categorizedQuestions[cat].map((q, i) => (
                                  <div key={i} onClick={() => {
                                      const isSelected = selectedNewQuestions.some(sq => sq.question === q.question);
                                      if (isSelected) setSelectedNewQuestions(prev => prev.filter(sq => sq.question !== q.question));
                                      else setSelectedNewQuestions(prev => [...prev, { ...q, category: cat }]);
                                  }} className={`bg-white border p-6 rounded-2xl flex items-start gap-4 cursor-pointer transition-all ${selectedNewQuestions.some(sq => sq.question === q.question) ? 'border-primary ring-2 ring-primary/5 shadow-sm' : 'border-slate-100 shadow-sm'}`}>
                                     <input type="checkbox" className="w-5 h-5 rounded border-slate-300 mt-0.5" checked={selectedNewQuestions.some(sq => sq.question === q.question)} readOnly />
                                     <div className="flex-1">
                                        <p className="font-bold text-slate-900 mb-4 text-[16px] leading-tight">{q.question}</p>
                                        <div className="bg-emerald-50/30 p-5 rounded-xl border border-emerald-100/30">
                                           <div className="flex items-center gap-2 mb-2 text-emerald-600">
                                              <span className="material-symbols-outlined text-[16px]">verified</span>
                                              <span className="text-[9px] font-bold uppercase tracking-widest">Tiêu chí đánh giá của HR</span>
                                           </div>
                                           <p className="text-[13px] text-slate-600 italic leading-relaxed">{q.evaluation_criteria || q.suggested_answer}</p>
                                        </div>
                                     </div>
                                  </div>
                                ))}
                             </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-96 bg-white rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center">
                         <div className="size-16 bg-slate-50 rounded-full flex items-center justify-center mb-5">
                            <span className="material-symbols-outlined text-slate-200 text-3xl">psychology</span>
                         </div>
                         <h2 className="text-lg font-bold mb-1">AI Sẵn sàng soạn thảo</h2>
                         <p className="text-slate-400 text-sm max-w-sm">Chọn nhóm kỹ năng ở bên trái và bấm để AI khởi tạo bộ tiêu chí phỏng vấn.</p>
                      </div>
                    )
                 ) : (
                    bankQuestions ? (
                      <div className="space-y-10">
                         <div className="flex justify-between items-center px-2">
                           <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-600">
                              <input type="checkbox" className="w-4 h-4 rounded border-slate-300" checked={selectedBankQuestions.length === Object.values(bankQuestions).flat().length} onChange={handleSelectAllBank} />
                              Chọn tất cả kho lưu trữ
                           </label>
                           {selectedBankQuestions.length > 0 && (
                             <button onClick={handleDeleteSelected} className="text-rose-500 font-bold text-xs hover:underline">Xóa các câu đã chọn</button>
                           )}
                         </div>

                         {Object.keys(bankQuestions).map(cat => (
                            <div key={cat} className="space-y-4">
                               <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-[0.1em] flex items-center gap-3">
                                  {cat} <span className="flex-1 h-px bg-slate-200"></span>
                               </h3>
                               <div className="grid gap-3">
                                  {bankQuestions[cat].map((q) => (
                                    <div key={q.id} className={`group relative bg-white border p-6 rounded-2xl flex items-start gap-4 shadow-sm transition-all ${selectedBankQuestions.includes(q.id) ? 'border-primary ring-2 ring-primary/5' : 'border-slate-100'}`}>
                                       <input type="checkbox" className="w-5 h-5 rounded border-slate-300 mt-0.5" checked={selectedBankQuestions.includes(q.id)} onChange={() => {
                                          if (selectedBankQuestions.includes(q.id)) setSelectedBankQuestions(p => p.filter(x => x !== q.id));
                                          else setSelectedBankQuestions(p => [...p, q.id]);
                                       }} />
                                       <div className="flex-1">
                                          <p className="font-bold text-slate-900 mb-4 text-[16px] pr-8 leading-tight">{q.question}</p>
                                          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                                             <span className="block text-[9px] font-bold text-slate-400 uppercase mb-2">Tiêu chí đánh giá</span>
                                             <p className="text-[13px] text-slate-600 italic leading-relaxed">{q.suggested_answer}</p>
                                          </div>
                                       </div>
                                       <button onClick={() => handleDeleteOne(q.id)} className="opacity-0 group-hover:opacity-100 absolute top-6 right-8 text-slate-200 hover:text-rose-500 transition-all">
                                          <span className="material-symbols-outlined text-[18px]">close</span>
                                       </button>
                                    </div>
                                  ))}
                               </div>
                            </div>
                         ))}
                      </div>
                    ) : (
                      <div className="h-96 bg-white rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center">
                         <div className="size-16 bg-slate-50 rounded-full flex items-center justify-center mb-5">
                            <span className="material-symbols-outlined text-slate-200 text-3xl">inventory_2</span>
                         </div>
                         <h2 className="text-lg font-bold mb-1">Kho lưu trữ đang trống</h2>
                         <p className="text-slate-400 text-sm max-w-sm">Hãy tạo câu hỏi ở tab bên cạnh để lưu trữ vào kho.</p>
                      </div>
                    )
                 )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterInterviews;
