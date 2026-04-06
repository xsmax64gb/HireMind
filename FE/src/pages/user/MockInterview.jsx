import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import apiClient from '@/services/apiClient';
import Navbar from '@/components/layout/Navbar';

const MockInterview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [interviewId, setInterviewId] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerText, setAnswerText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const messagesEndRef = useRef(null);

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const startInterview = async () => {
      try {
        setLoading(true);
        const data = await apiClient.post('/mock-interviews/start', { jobId: id });
        if (data.questions) {
            setInterviewId(data.sessionId || data.interviewId);
            setJobTitle(data.jobTitle);
            setQuestions(data.questions);
            const firstUnanswered = data.questions.findIndex(q => !q.is_answered);
            setCurrentQuestionIndex(firstUnanswered !== -1 ? firstUnanswered : 0);
        }
      } catch (error) {
        console.error('Error starting interview', error);
        alert(error?.message || error || 'Máy chủ đang bận hoặc có lỗi xảy ra. Hãy thử lại sau!');
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };
    startInterview();
  }, [id, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentQuestionIndex, questions]);

  const handleSend = async () => {
    if (!answerText.trim() || submitting) return;
    const currentQ = questions[currentQuestionIndex];
    if (currentQ.is_answered) return;

    try {
        setSubmitting(true);
        const data = await apiClient.post('/mock-interviews/evaluate', {
            questionId: currentQ.id,
            answer: answerText
        });
        
        const newQuestions = [...questions];
        newQuestions[currentQuestionIndex] = {
            ...currentQ,
            answer: answerText,
            is_answered: 1,
            ai_score: data.evaluation.score,
            ai_feedback: data.evaluation.feedback,
            ai_perfect_answer: data.evaluation.perfect_answer
        };
        setQuestions(newQuestions);
        setAnswerText("");

        if (data.isCompleted) {
            alert('Bạn đã hoàn thành phỏng vấn!');
        }
    } catch (error) {
        console.error(error);
        alert('Có lỗi khi đánh giá. Vui lòng thử lại!');
    } finally {
        setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setAnswerText("");
    } else {
        navigate('/interview-history');
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-50 text-slate-900 h-screen flex flex-col font-display antialiased overflow-hidden w-full items-center justify-center">
        <div className="size-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="font-bold text-slate-700">Đang chuẩn bị bộ câu hỏi phỏng vấn AI...</p>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex] || {};

  return (
    <div className="bg-slate-50 text-slate-900 h-screen flex flex-col font-display antialiased overflow-hidden w-full">
      {/* Top Navigation Bar */}
      <Navbar />
        
        {/* Breadcrumbs Row */}
        <div className="border-t border-slate-100 bg-slate-50/80">
          <div className="w-[95%] xl:w-[90%] mx-auto px-6 py-2.5">
            <nav className="flex text-xs text-slate-500 gap-2 items-center">
              <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
              <span className="material-symbols-outlined text-[10px]">chevron_right</span>
              <Link className="hover:text-primary transition-colors" to="/jobs">Tuyển dụng</Link>
              <span className="material-symbols-outlined text-[10px]">chevron_right</span>
              <Link className="hover:text-primary transition-colors truncate max-w-[150px] sm:max-w-xs" to={`/jobs/${id}`}>{jobTitle || `Công việc #${id}`}</Link>
              <span className="material-symbols-outlined text-[10px]">chevron_right</span>
              <span className="text-primary font-bold">Phỏng vấn giả lập</span>
            </nav>
          </div>
        </div>

      {/* Main App Layout Wrapper - 90% Width */}
      <div className="flex flex-1 overflow-hidden w-[95%] xl:w-[90%] mx-auto border-x border-slate-200 shadow-sm bg-white shrink-0 h-full">
        
        {/* Left Sidebar / Progress Tracker */}
        <aside className="w-64 lg:w-72 border-r border-slate-200 bg-slate-50/40 flex flex-col hidden md:flex shrink-0">
          <div className="p-5 flex flex-col gap-6 h-full overflow-y-auto">
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">Tiến độ phỏng vấn</h3>
              <div className="space-y-2.5">
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-extrabold text-slate-800">{currentQuestionIndex + 1}<span className="text-slate-400 font-medium text-lg">/{questions.length}</span></span>
                  <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">{Math.round((questions.filter(q => q.is_answered).length / questions.length) * 100)}% Hoàn thành</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(questions.filter(q => q.is_answered).length / questions.length) * 100}%` }}></div>
                </div>
              </div>
            </div>

            <nav className="space-y-1.5 flex-1 mt-2">
              {questions.map((q, idx) => (
                <div key={idx} onClick={() => { if(q.is_answered || idx === questions.findIndex(qt => !qt.is_answered)) setCurrentQuestionIndex(idx); }} 
                     className={`flex items-start gap-3 px-3 py-2.5 rounded-xl border ${idx === currentQuestionIndex ? 'border-slate-200 bg-white shadow-sm text-slate-900' : 'border-transparent hover:bg-slate-100 transition-colors text-slate-500 cursor-pointer'}`}>
                  {q.is_answered ? (
                      <span className="material-symbols-outlined text-green-500 text-lg mt-0.5">check_circle</span>
                  ) : idx === currentQuestionIndex ? (
                      <div className="relative mt-1 flex h-4 w-4 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-20"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                      </div>
                  ) : (
                      <span className="material-symbols-outlined text-lg mt-0.5 opacity-40">circle</span>
                  )}
                  <div className="overflow-hidden">
                    <h4 className={`text-sm font-bold ${idx === currentQuestionIndex ? 'text-primary' : ''}`}>Câu hỏi {idx + 1}</h4>
                    <p className={`text-xs font-medium mt-0.5 truncate w-40 ${idx === currentQuestionIndex ? 'text-slate-600' : 'text-slate-400'}`}>
                        {q.question}
                    </p>
                  </div>
                </div>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-200">
              <button onClick={() => navigate('/interview-history')} className="w-full flex items-center justify-center gap-2 rounded-xl h-11 bg-white border border-rose-200 text-rose-600 text-sm font-bold hover:bg-rose-50 transition-colors shadow-sm">
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
                <div className="flex flex-col gap-1.5 flex-1 w-full overflow-hidden">
                  <div className="flex items-center gap-2 ml-1">
                    <span className="text-sm font-bold text-slate-700">Trợ lý AI HireMind</span>
                    <span className="text-[9px] text-primary font-bold uppercase tracking-widest bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">HR Expert</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-200 relative w-fit max-w-[90%]">
                    <p className="text-[14px] text-slate-800 leading-relaxed font-medium whitespace-pre-wrap break-words">
                      {currentQ.question}
                    </p>
                  </div>
                </div>
              </div>

              {/* User Answer Area */}
              {currentQ.is_answered ? (
                  <div className="flex gap-4 items-start flex-row-reverse">
                    <div className="size-9 rounded-full bg-slate-200 flex items-center justify-center shrink-0 border border-slate-300 mt-1">
                      <span className="material-symbols-outlined text-slate-500 text-lg">person</span>
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 items-end w-full overflow-hidden">
                      <div className="flex items-center gap-2 mr-1">
                        <span className="text-sm font-bold text-slate-700">Bạn</span>
                      </div>
                      <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none shadow-sm relative w-fit max-w-[90%]">
                        <p className="text-[14px] leading-relaxed opacity-95 whitespace-pre-wrap break-words">
                          {currentQ.answer}
                        </p>
                      </div>
                    </div>
                  </div>
              ) : null}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Sticky Input Area */}
          <div className="shrink-0 bg-white border-t border-slate-200 p-4 z-10 sticky bottom-0 w-full left-0">
            {!currentQ.is_answered ? (
            <div className="max-w-2xl mx-auto flex flex-col gap-2.5">
              <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all shadow-sm">
                <textarea 
                  className="w-full border-0 bg-transparent text-slate-900 placeholder:text-slate-400 placeholder:font-medium resize-none min-h-[80px] max-h-[200px] p-4 text-[14px] leading-relaxed focus:ring-0 outline-none" 
                  placeholder="Nhập câu trả lời của bạn..."
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                      }
                  }}
                  disabled={submitting}
                ></textarea>
                <div className="flex items-center justify-end px-2 py-2 border-t border-slate-100 bg-white">
                  <button 
                    onClick={handleSend}
                    disabled={submitting || !answerText.trim()}
                    className={`flex items-center gap-1.5 bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 ${submitting || !answerText.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md hover:shadow-primary/20'}`}>
                    {submitting ? 'Đang gửi...' : 'Gửi'}
                    {!submitting && <span className="material-symbols-outlined text-[16px]">send</span>}
                  </button>
                </div>
              </div>
              <p className="text-center text-[10px] text-slate-400 font-medium">Nhấn <kbd className="font-sans px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded font-bold mx-0.5">Enter</kbd> để gửi, <kbd className="font-sans px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded font-bold mx-0.5">Shift</kbd> + <kbd className="font-sans px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded font-bold mx-0.5">Enter</kbd> để xuống dòng</p>
            </div>
            ) : (
               <div className="max-w-2xl mx-auto flex items-center justify-center p-4">
                  <p className="text-sm font-medium text-slate-400">Bạn đã trả lời câu hỏi này. Vui lòng xem đánh giá và chuyển sang câu tiếp theo.</p>
               </div>
            )}
          </div>
        </main>

        {/* Right Sidebar: AI Feedback */}
        <aside className="w-[350px] xl:w-[400px] border-l border-slate-200 bg-slate-50/70 flex flex-col hidden lg:flex shrink-0">
          <div className="p-6 h-full overflow-y-auto">
            {currentQ.is_answered ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="size-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-sm border border-amber-200">
                  <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                </div>
                <h3 className="text-sm font-bold text-slate-800">AI Đánh giá & Gợi ý</h3>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100 flex flex-col gap-4 bg-slate-50/50">
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Độ chính xác</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-green-600">{currentQ.ai_score || 0}</span>
                      <span className="text-[10px] font-bold text-slate-400">/10</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 block">Khái quát</span>
                    <p className="text-[13px] font-medium text-slate-700 leading-snug whitespace-pre-wrap">{currentQ.ai_feedback}</p>
                  </div>
                </div>
                
                {currentQ.ai_perfect_answer && (
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-amber-500 bg-amber-50 p-1 rounded border border-amber-100 text-[16px]">lightbulb</span>
                    <span className="text-[13px] font-bold text-slate-800">Gợi ý trả lời hoàn hảo</span>
                  </div>
                  <div className="text-[13px] text-slate-600 space-y-3 leading-relaxed whitespace-pre-wrap px-2">
                    {currentQ.ai_perfect_answer}
                  </div>
                </div>
                )}
              </div>

              <button onClick={handleNext} className="mt-4 flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-3.5 rounded-xl text-sm font-bold hover:bg-primary transition-all shadow-sm">
                {currentQuestionIndex < questions.length - 1 ? 'Chuyển câu tiếp theo' : 'Hoàn thành / Xem Lịch sử'}
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
            ) : (
               <div className="flex flex-col gap-4 items-center justify-center h-full text-slate-400 text-center px-6">
                  <span className="material-symbols-outlined text-5xl py-4 opacity-20">hourglass_empty</span>
                  <h3 className="text-sm font-bold text-slate-600">Chờ câu trả lời</h3>
                  <p className="text-[13px] font-medium text-slate-400">Hãy hoàn thành câu trả lời của bạn ở khung chat để nhận được đánh giá chi tiết từ tính năng AI.</p>
               </div>
            )}
          </div>
        </aside>

      </div>
    </div>
  );
};

export default MockInterview;
