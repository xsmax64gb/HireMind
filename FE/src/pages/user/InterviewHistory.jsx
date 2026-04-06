import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '@/services/apiClient';
import Navbar from '@/components/layout/Navbar';
import UserSidebar from '@/components/common/UserSidebar';
import { getUser, removeToken, removeUser } from '@/utils/authUtils';

const InterviewHistory = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await apiClient.get('/mock-interviews/history');
        setHistory(data || []);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
        fetchHistory();
    } else {
        setLoading(false);
    }
  }, [user]);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    }).format(d);
  };

  if (!user) {
      return (
          <div className="bg-slate-50 min-h-screen font-display flex flex-col">
              <Navbar />
              <main className="flex-1 flex items-center justify-center">
                  <p>Vui lòng đăng nhập để xem lịch sử.</p>
              </main>
          </div>
      )
  }

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
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Lịch sử Phỏng vấn AI</h1>
              <p className="text-slate-500 text-[15px]">Theo dõi tiến trình và học hỏi từ các phiên đánh giá giả lập.</p>
            </div>

            {loading ? (
              <div className="p-12 flex flex-col items-center justify-center gap-4">
                <div className="size-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
                <p className="text-slate-400 text-sm font-medium">Đang tải lịch sử...</p>
              </div>
            ) : history.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {history.map((session) => (
                  <div key={session.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-slate-300 transition-colors flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg border shadow-sm ${session.status === 'completed' ? 'bg-green-100/50 text-green-700 border-green-200/50' : 'bg-amber-100/50 text-amber-700 border-amber-200/50'}`}>
                          {session.status === 'completed' ? 'Đã hoàn thành' : 'Đang xử lý'}
                        </span>
                        <span className="text-xs font-medium text-slate-400">{formatDate(session.created_at)}</span>
                      </div>
                      
                      <Link to={`/jobs/${session.job_id}`} className="text-lg font-bold text-slate-800 mb-1 leading-snug group-hover:text-primary transition-colors block truncate">
                        {session.job_title}
                      </Link>
                      <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mb-6">
                        <span className="material-symbols-outlined text-[16px]">business</span>
                        {session.company_name || 'HireMind Partner'}
                      </p>
                    </div>
                    
                    <div className="flex items-end justify-between pt-5 border-t border-slate-100">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Điểm AI Đánh giá</p>
                        {session.status === 'completed' ? (
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-extrabold text-primary">{parseFloat(session.overall_score || 0).toFixed(1)}</span>
                            <span className="text-sm font-bold text-slate-300">/ 10</span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-slate-300">-- / 10</span>
                        )}
                      </div>
                      <Link to={`/interview/${session.job_id}`} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-primary transition-all flex items-center gap-1.5 shadow-md">
                        {session.status === 'completed' ? 'Xem lại báo cáo' : 'Tiếp tục trả lời'}
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 flex flex-col items-center justify-center gap-4 text-center border shadow-sm border-slate-200 rounded-2xl bg-slate-50/50">
                <span className="material-symbols-outlined text-6xl text-slate-200">co_present</span>
                <p className="text-slate-500 font-medium">Bạn chưa tham gia phiên phỏng vấn AI nào.</p>
                <Link to="/jobs" className="text-primary text-[13px] font-bold hover:underline">Tìm việc & Bắt đầu phỏng vấn ngay</Link>
              </div>
            )}

            {/* Pagination / Footer */}
            {!loading && history.length > 0 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 tracking-tight">
                <p className="text-[12px] font-medium text-slate-400">Đã tham gia {history.length} cuộc phỏng vấn ảo</p>
              </div>
            )}
            
          </div>
        </main>
      </div>
    </div>
  );
};

export default InterviewHistory;
