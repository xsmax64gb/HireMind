import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUser } from '@/utils/authUtils';
import RecruiterSidebar from '@/components/common/RecruiterSidebar';
import RecruiterHeader from '@/components/common/RecruiterHeader';
import jobService from '@/services/jobService';

const RecruiterJobCandidates = () => {
    const { id } = useParams();
    const user = getUser();
    const [job, setJob] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest'); // newest, oldest, match_score
    const [updatingId, setUpdatingId] = useState(null);
    
    // Modal state
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [jobData, candidateData] = await Promise.all([
                    jobService.getJobById(id),
                    jobService.getJobCandidates(id)
                ]);
                setJob(jobData);
                setCandidates(candidateData || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleUpdateStatus = async (applicationId, status) => {
        try {
            setUpdatingId(applicationId);
            await jobService.updateApplicationStatus(id, applicationId, status);
            setCandidates(prev => prev.map(c => c.id === applicationId ? { ...c, status } : c));
            
            // Sync with modal if open
            if (selectedCandidate?.id === applicationId) {
                setSelectedCandidate(prev => ({ ...prev, status }));
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Có lỗi xảy ra khi cập nhật trạng thái');
        } finally {
            setUpdatingId(null);
        }
    };

    const formatDate = (dateString, full = false) => {
        if (!dateString) return '';
        const options = full ? {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        } : {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        };
        return new Intl.DateTimeFormat('vi-VN', options).format(new Date(dateString));
    };

    const openCandidateDetail = (candidate) => {
        setSelectedCandidate(candidate);
        setIsModalOpen(true);
    };

    const getFilteredAndSortedCandidates = () => {
        let result = [...candidates];
        
        // Filter
        if (filter !== 'all') {
            result = result.filter(c => c.status === filter);
        }

        // Sort
        if (sortBy === 'newest') {
            result.sort((a, b) => new Date(b.applied_at) - new Date(a.applied_at));
        } else if (sortBy === 'oldest') {
            result.sort((a, b) => new Date(a.applied_at) - new Date(b.applied_at));
        } else if (sortBy === 'match_score') {
            result.sort((a, b) => (b.match_score || 0) - (a.match_score || 0));
        }

        return result;
    };

    const displayedCandidates = getFilteredAndSortedCandidates();

    if (loading) {
        return (
            <div className="bg-slate-50 min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="size-10 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium tracking-tight">Đang tải danh sách hồ sơ...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 text-slate-900 h-screen flex font-display antialiased overflow-hidden">
            
            <RecruiterSidebar activeTab="jobs" user={user} />

            <div className="flex-1 flex flex-col min-w-0 h-full relative">
                <RecruiterHeader user={user} />

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-12 overflow-y-auto w-full">
                    <div className="max-w-6xl mx-auto w-full pb-20">
                        
                        {/* Breadcrumbs */}
                        <nav className="flex text-slate-500 text-[13px] font-medium mb-6">
                            <ol className="inline-flex items-center space-x-2">
                                <li><Link className="hover:text-primary transition-colors" to="/recruiter/jobs">Tin tuyển dụng của tôi</Link></li>
                                <li className="flex items-center">
                                    <span className="material-symbols-outlined text-[16px] mx-1 text-slate-300">chevron_right</span>
                                    <span className="text-slate-900 font-bold">{job?.title || 'Công việc'}</span>
                                </li>
                            </ol>
                        </nav>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 w-full">
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-900 truncate max-w-2xl">Ứng viên cho: {job?.title}</h1>
                                <p className="text-slate-500 text-[15px]">
                                    {job?.location} • {job?.employment_type} • {candidates.length} hồ sơ ứng tuyển
                                </p>
                            </div>
                        </div>

                        {/* Dashboard Filters */}
                        <div className="mb-6 flex flex-wrap items-center border-b border-slate-200 gap-x-8 gap-y-4">
                            <button 
                                onClick={() => setFilter('all')}
                                className={`pb-3 text-[14px] font-bold transition-colors flex items-center gap-1.5 ${filter === 'all' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
                            >
                                Tất cả 
                                <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md text-[11px]">{candidates.length}</span>
                            </button>
                            <button 
                                onClick={() => setFilter('pending')}
                                className={`pb-3 text-[14px] font-bold transition-colors flex items-center gap-1.5 ${filter === 'pending' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
                            >
                                Đang chờ 
                                <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md text-[11px]">{candidates.filter(c => c.status === 'pending').length}</span>
                            </button>
                            <button 
                                onClick={() => setFilter('reviewed')}
                                className={`pb-3 text-[14px] font-bold transition-colors flex items-center gap-1.5 ${filter === 'reviewed' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
                            >
                                Đã xem xét 
                                <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md text-[11px]">{candidates.filter(c => c.status === 'reviewed').length}</span>
                            </button>
                            <button 
                                onClick={() => setFilter('accepted')}
                                className={`pb-3 text-[14px] font-bold transition-colors flex items-center gap-1.5 ${filter === 'accepted' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
                            >
                                Chấp nhận 
                                <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md text-[11px]">{candidates.filter(c => c.status === 'accepted').length}</span>
                            </button>
                            <button 
                                onClick={() => setFilter('rejected')}
                                className={`pb-3 text-[14px] font-bold transition-colors flex items-center gap-1.5 ${filter === 'rejected' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
                            >
                                Từ chối 
                                <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md text-[11px]">{candidates.filter(c => c.status === 'rejected').length}</span>
                            </button>
                            
                            <div className="ml-auto flex items-center gap-3 pb-3 w-full sm:w-auto">
                                <span className="text-[13px] font-semibold text-slate-400">Sắp xếp theo:</span>
                                <select 
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-900 px-3 py-2 outline-none focus:ring-1 focus:ring-primary shadow-sm cursor-pointer"
                                >
                                    <option value="newest">Mới nhất</option>
                                    <option value="oldest">Cũ nhất</option>
                                    <option value="match_score">✨ Phù hợp nhất (AI)</option>
                                </select>
                            </div>
                        </div>

                        {/* Candidates Table */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-[14px]">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50/50">
                                            <th className="px-8 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500">Ứng viên</th>
                                            <th className="px-6 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500">Sàng lọc AI</th>
                                            <th className="px-6 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500">Ngày nộp</th>
                                            <th className="px-6 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500 text-center">Hồ sơ</th>
                                            <th className="px-8 py-5 font-bold text-[12px] uppercase tracking-wider text-slate-500 text-right">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        
                                        {displayedCandidates.length > 0 ? displayedCandidates.map((candidate) => (
                                            <tr key={candidate.id} className="hover:bg-slate-50/80 transition-colors group">
                                                <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                                <div className="size-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg font-bold text-slate-500 shrink-0 overflow-hidden">
                                                                        {candidate.candidate_avatar ? (
                                                                                <img src={candidate.candidate_avatar} alt="" className="w-full h-full object-cover" />
                                                                        ) : (
                                                                                candidate.candidate_name.charAt(0)
                                                                        )}
                                                                </div>
                                                                <div className="flex flex-col gap-0.5 cursor-pointer" onClick={() => openCandidateDetail(candidate)}>
                                                                        <span className="font-bold text-[15px] text-slate-900 group-hover:text-primary transition-colors">{candidate.candidate_name}</span>
                                                                        <span className="text-[13px] font-medium text-slate-500">{candidate.candidate_email}</span>
                                                                </div>
                                                        </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                        <div className="flex items-center gap-2">
                                                                <span className={`text-[13px] font-bold px-2 py-1 rounded-md ${
                                                                        candidate.match_score >= 80 ? 'bg-emerald-50 text-emerald-600' : 
                                                                        candidate.match_score >= 50 ? 'bg-amber-50 text-amber-600' : 
                                                                        'bg-red-50 text-red-600'
                                                                }`}>
                                                                        {candidate.match_score || 0}%
                                                                </span>
                                                                {candidate.ai_feedback && (
                                                                        <span className="material-symbols-outlined text-[16px] text-slate-400 cursor-help" title={candidate.ai_feedback}>info</span>
                                                                )}
                                                        </div>
                                                </td>
                                                <td className="px-6 py-6 text-slate-600 font-medium">{formatDate(candidate.applied_at)}</td>
                                                <td className="px-6 py-6 text-center">
                                                        <a 
                                                                href={candidate.cv_url} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/30 transition-colors"
                                                                title="Xem CV"
                                                        >
                                                                <span className="material-symbols-outlined text-[20px]">description</span>
                                                        </a>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <div className="relative group/actions inline-flex gap-1.5">
                                                                <button 
                                                                        onClick={() => handleUpdateStatus(candidate.id, 'pending')}
                                                                        disabled={updatingId === candidate.id}
                                                                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-sm ${candidate.status === 'pending' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                                                                >
                                                                        Đang chờ
                                                                </button>
                                                                <button 
                                                                        onClick={() => handleUpdateStatus(candidate.id, 'reviewed')}
                                                                        disabled={updatingId === candidate.id}
                                                                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-sm ${candidate.status === 'reviewed' ? 'bg-primary text-white' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                                                                >
                                                                        Đã xem xét
                                                                </button>
                                                                <button 
                                                                        onClick={() => handleUpdateStatus(candidate.id, 'accepted')}
                                                                        disabled={updatingId === candidate.id}
                                                                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-sm ${candidate.status === 'accepted' ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                                                                >
                                                                        Chấp nhận
                                                                </button>
                                                                <button 
                                                                        onClick={() => handleUpdateStatus(candidate.id, 'rejected')}
                                                                        disabled={updatingId === candidate.id}
                                                                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-sm ${candidate.status === 'rejected' ? 'bg-rose-600 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                                                                >
                                                                        Từ chối
                                                                </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                                <tr>
                                                        <td colSpan="5" className="px-8 py-20 text-center">
                                                                <div className="flex flex-col items-center gap-3">
                                                                        <span className="material-symbols-outlined text-5xl text-slate-200">person_off</span>
                                                                        <p className="text-slate-400 font-medium">Chưa có ứng viên nào ứng tuyển ở trạng thái này.</p>
                                                                </div>
                                                        </td>
                                                </tr>
                                        )}
                                        
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex items-center justify-between px-8 py-5 border-t border-slate-100 bg-slate-50/50">
                                <p className="text-[12.5px] font-medium text-slate-500">Hiển thị {displayedCandidates.length} ứng viên</p>
                            </div>
                        </div>

                    </div>
                </main>

                {/* Candidate Detail Modal */}
                {isModalOpen && selectedCandidate && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                        <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
                            {/* Modal Header */}
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="size-14 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-primary/20 overflow-hidden">
                                        {selectedCandidate.candidate_avatar ? (
                                            <img src={selectedCandidate.candidate_avatar} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            selectedCandidate.candidate_name.charAt(0)
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-extrabold text-slate-900">{selectedCandidate.candidate_name}</h2>
                                        <p className="text-sm font-medium text-slate-500">{selectedCandidate.candidate_email}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="size-10 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                                {/* AI Overview Section */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col gap-2">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Độ phù hợp (AI)</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-black text-emerald-700">{selectedCandidate.match_score || 0}</span>
                                            <span className="text-lg font-bold text-emerald-600">%</span>
                                        </div>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-2">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Ngày ứng tuyển</span>
                                        <span className="text-[14px] font-bold text-slate-900">{formatDate(selectedCandidate.applied_at, true)}</span>
                                    </div>
                                </div>

                                {selectedCandidate.missing_skills && (
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-amber-500 text-[18px]">warning</span>
                                            Hạn chế & Thiếu sót (AI tự động bóc tách)
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {(() => {
                                                try {
                                                    const skills = typeof selectedCandidate.missing_skills === 'string' 
                                                        ? JSON.parse(selectedCandidate.missing_skills) 
                                                        : selectedCandidate.missing_skills;
                                                    
                                                    return Array.isArray(skills) ? skills.map((skill, i) => (
                                                        <span key={i} className="px-3 py-1 rounded-lg bg-red-50 text-red-700 text-[12px] font-bold border border-red-100">
                                                            {skill}
                                                        </span>
                                                    )) : <span className="text-slate-400 italic text-sm">Không bóc tách được chi tiết.</span>;
                                                } catch (e) {
                                                    return <span className="text-slate-400 italic text-sm">Dữ liệu phân tích lỗi.</span>;
                                                }
                                            })()}
                                        </div>
                                    </div>
                                )}

                                {/* AI Feedback Section */}
                                <div className="space-y-3">
                                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-[18px]">fact_check</span>
                                        Phân tích đánh giá AI
                                    </h3>
                                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100/50">
                                        <p className="text-[14px] text-slate-600 leading-relaxed italic whitespace-pre-wrap">
                                            "{selectedCandidate.ai_feedback || 'Chưa có nhận xét chi tiết từ hệ thống AI.'}"
                                        </p>
                                    </div>
                                </div>

                                {/* Resume Link */}
                                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-slate-400">description</span>
                                        <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]">
                                            {selectedCandidate.cv_file_name}
                                        </span>
                                    </div>
                                    <a 
                                        href={selectedCandidate.cv_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-bold hover:bg-primary transition-all shadow-lg active:scale-95"
                                    >
                                        Mở hồ sơ (CV)
                                        <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                                    </a>
                                </div>
                            </div>
                            
                            {/* Modal Footer (Action buttons) */}
                            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 font-bold">
                                <span className="text-[11px] uppercase tracking-widest text-slate-400 mr-2">Cập nhật nhanh:</span>
                                <button 
                                    onClick={() => handleUpdateStatus(selectedCandidate.id, 'reviewed')}
                                    disabled={updatingId === selectedCandidate.id}
                                    className={`px-4 py-2 rounded-xl text-[12px] border transition-all ${selectedCandidate.status === 'reviewed' ? 'bg-primary border-primary text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-primary/50'}`}
                                >
                                    Đã xem xét
                                </button>
                                <button 
                                    onClick={() => handleUpdateStatus(selectedCandidate.id, 'accepted')}
                                    disabled={updatingId === selectedCandidate.id}
                                    className={`px-4 py-2 rounded-xl text-[12px] border transition-all ${selectedCandidate.status === 'accepted' ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-500/50'}`}
                                >
                                    Chấp nhận
                                </button>
                                <button 
                                    onClick={() => handleUpdateStatus(selectedCandidate.id, 'rejected')}
                                    disabled={updatingId === selectedCandidate.id}
                                    className={`px-4 py-2 rounded-xl text-[12px] border transition-all ${selectedCandidate.status === 'rejected' ? 'bg-rose-600 border-rose-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-rose-500/50'}`}
                                >
                                    Từ chối
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecruiterJobCandidates;
