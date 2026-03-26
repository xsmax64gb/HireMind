import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '@/components/common/AdminSidebar';
import adminService from '../../services/adminService';

const AdminCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [sort, setSort] = useState('desc');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Helper to format date without external libraries
  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa cập nhật';
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchCandidates = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminService.getCandidates({
        search,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        sort,
        page,
        limit: 10
      });
      if (response.success) {
        setCandidates(response.data);
        setTotal(response.pagination.total);
        setTotalPages(response.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
      // alert('Không thể tải danh sách ứng viên. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }, [search, startDate, endDate, sort, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
        fetchCandidates();
    }, 500); // Debounce search
    return () => clearTimeout(timer);
  }, [fetchCandidates]);

  const handleStatusChange = async (id, currentStatus) => {
    let newStatus = 'active';
    if (currentStatus === 'active') {
        newStatus = 'inactive';
    } else if (currentStatus === 'inactive') {
        newStatus = 'banned';
    } else {
        newStatus = 'active';
    }

    if (!window.confirm(`Bạn có chắc muốn đổi trạng thái của ứng viên này sang ${newStatus === 'active' ? 'Hoạt động' : newStatus === 'inactive' ? 'Ngừng hoạt động' : 'Khóa'}?`)) return;

    try {
      const response = await adminService.updateCandidateStatus(id, newStatus);
      if (response.success) {
        fetchCandidates();
        // Cập nhật selectedCandidate nếu model đang mở
        if (selectedCandidate?.id === id) {
            setSelectedCandidate({...selectedCandidate, status: newStatus});
        }
      }
    } catch (error) {
      alert(error.message || 'Cập nhật trạng thái thất bại.');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`HÀNH ĐỘNG NÀY KHÔNG THỂ KHÔI PHỤC! Bạn có thực sự muốn xóa tài khoản của ${name}?`)) return;

    try {
      setIsDeleting(true);
      const response = await adminService.deleteCandidate(id);
      if (response.success) {
        fetchCandidates();
        if (selectedCandidate?.id === id) setShowDetailModal(false);
      }
    } catch (error) {
      alert(error.message || 'Xóa tài khoản thất bại.');
    } finally {
      setIsDeleting(false);
    }
  };

  const viewDetail = async (id) => {
    try {
      const response = await adminService.getCandidateDetail(id);
      if (response.success) {
        setSelectedCandidate(response.data);
        setShowDetailModal(true);
      }
    } catch (error) {
      alert('Không thể lấy thông tin chi tiết.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">
            Hoạt động
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
            Ngừng hoạt động
          </span>
        );
      case 'banned':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-100">
            Bị khóa
          </span>
        );
      default:
        return status;
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex font-display antialiased">
      
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-[#fafafa] ml-64 min-w-0 h-screen overflow-y-auto">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center sticky top-0 z-40 shrink-0">
          <h2 className="text-[13px] font-semibold text-slate-500">
            Hệ thống / <span className="text-slate-900 font-bold">Quản lý Ứng viên</span>
          </h2>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full mb-10">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">Quản lý Ứng viên</h1>
              <p className="text-slate-500 text-[14px]">Xem và quản lý thông tin các tài khoản ứng viên trong hệ thống.</p>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-slate-100 flex flex-col xl:flex-row gap-6">
              <div className="relative flex-1 max-w-2xl">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                <input 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] font-medium focus:ring-2 focus:ring-black focus:border-black outline-none transition-all placeholder:text-slate-500 shadow-inner" 
                  placeholder="Tìm kiếm theo tên hoặc email..." 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-4 flex-wrap sm:flex-nowrap items-center">
                <div className="relative group">
                  <button 
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-[13px] font-bold transition-all border shadow-sm ${showFilterDropdown || startDate || endDate || sort !== 'desc' ? 'bg-black text-white border-black' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">filter_list</span>
                    Bộ lọc & Sắp xếp
                    {(startDate || endDate || sort !== 'desc') && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse ml-1"></span>
                    )}
                  </button>

                  {showFilterDropdown && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowFilterDropdown(false)}></div>
                      <div className="absolute right-0 mt-3 w-[300px] bg-white rounded-3xl border border-slate-200 shadow-2xl z-50 p-6 animate-in slide-in-from-top-2 duration-200">
                        <div className="space-y-6">
                          <div>
                            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Sắp xếp theo ngày tham gia</p>
                            <div className="grid grid-cols-2 gap-2">
                              <button 
                                onClick={() => setSort('desc')}
                                className={`px-4 py-2.5 rounded-xl text-[12px] font-bold border transition-all ${sort === 'desc' ? 'bg-black text-white border-black' : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'}`}
                              >
                                Mới nhất
                              </button>
                              <button 
                                onClick={() => setSort('asc')}
                                className={`px-4 py-2.5 rounded-xl text-[12px] font-bold border transition-all ${sort === 'asc' ? 'bg-black text-white border-black' : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'}`}
                              >
                                Lâu nhất
                              </button>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Lọc theo khoảng ngày</p>
                            <div className="space-y-3">
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-extrabold text-slate-400 uppercase tracking-tighter">Từ</span>
                                <input 
                                  type="date" 
                                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-black transition-all"
                                  value={startDate}
                                  onChange={(e) => setStartDate(e.target.value)}
                                />
                              </div>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-extrabold text-slate-400 uppercase tracking-tighter">Đến</span>
                                <input 
                                  type="date" 
                                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-black transition-all"
                                  value={endDate}
                                  onChange={(e) => setEndDate(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-100 flex gap-2">
                            <button 
                                onClick={() => {setStartDate(''); setEndDate(''); setSort('desc'); setShowFilterDropdown(false);}}
                                className="flex-1 py-3 text-[12px] font-bold text-slate-500 hover:text-black transition-colors"
                            >
                                Thiết lập lại
                            </button>
                            <button 
                                onClick={() => setShowFilterDropdown(false)}
                                className="flex-1 py-3 bg-black text-white rounded-xl text-[12px] font-bold hover:bg-zinc-800 transition-all shadow-md shadow-black/10"
                            >
                                Áp dụng
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto min-h-[500px] flex flex-col">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="px-8 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest bg-slate-50/50 w-[30%]">Họ và Tên</th>
                    <th className="px-8 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest bg-slate-50/50 w-[25%]">Email</th>
                    <th className="px-8 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest bg-slate-50/50 w-[15%]">Ngày tham gia</th>
                    <th className="px-8 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest bg-slate-50/50 w-[15%]">Trạng thái</th>
                    <th className="px-8 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest text-right bg-slate-50/50 w-[15%]">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-8 py-32 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="relative">
                            <div className="w-12 h-12 border-4 border-slate-100 rounded-full"></div>
                            <div className="w-12 h-12 border-4 border-t-black border-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                          </div>
                          <p className="text-[14px] font-extrabold text-slate-400">Đang đồng bộ dữ liệu...</p>
                        </div>
                      </td>
                    </tr>
                  ) : candidates.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-8 py-32 text-center">
                         <div className="flex flex-col items-center gap-4">
                          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                             <span className="material-symbols-outlined text-[48px] text-slate-200">sentiment_very_dissatisfied</span>
                          </div>
                          <p className="text-[15px] font-bold text-slate-400 italic">Oops! Không tìm thấy dữ liệu phù hợp.</p>
                          <button onClick={() => {setStartDate(''); setEndDate(''); setSearch('');}} className="text-[13px] font-extrabold text-black underline underline-offset-4 hover:text-slate-600 transition-colors">Thiết lập lại bộ lọc</button>
                        </div>
                      </td>
                    </tr>
                  ) : candidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-5">
                          {candidate.avatar ? (
                             <img src={candidate.avatar} alt={candidate.name} className="w-11 h-11 rounded-2xl border-2 border-white object-cover shadow-sm ring-1 ring-slate-100" />
                          ) : (
                            <div className="w-11 h-11 rounded-2xl bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-[12px] font-bold text-white shadow-sm ring-1 ring-slate-100">
                              {candidate.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                            </div>
                          )}
                          <span className="text-[15px] font-bold text-slate-900 group-hover:text-black transition-colors cursor-pointer decoration-slate-300 hover:underline underline-offset-4" onClick={() => viewDetail(candidate.id)}>
                            {candidate.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-[14px] font-medium text-slate-600 font-mono tracking-tight">{candidate.email}</td>
                      <td className="px-8 py-5 text-[14px] font-bold text-slate-600">
                        {formatDate(candidate.created_at)}
                      </td>
                      <td className="px-8 py-5">
                        {getStatusBadge(candidate.status)}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-end gap-2 opacity-10 sm:opacity-40 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                          <button 
                            className="p-2.5 text-slate-400 hover:text-black hover:bg-white hover:shadow-sm rounded-xl transition-all" 
                            title="Xem chi tiết"
                            onClick={() => viewDetail(candidate.id)}
                          >
                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                          </button>
                          <button 
                            className="p-2.5 text-slate-400 hover:text-black hover:bg-white hover:shadow-sm rounded-xl transition-all" 
                            title="Đổi trạng thái"
                            onClick={() => handleStatusChange(candidate.id, candidate.status)}
                          >
                            <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
                          </button>
                          <button 
                            className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" 
                            title="Xóa tài khoản"
                            onClick={() => handleDelete(candidate.id, candidate.name)}
                          >
                            <span className="material-symbols-outlined text-[20px]">delete_sweep</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-white">
                <span className="text-[13px] text-slate-500 font-medium">Hiển thị <span className="font-bold text-slate-900">{candidates.length}</span> / <span className="font-bold text-slate-900">{total}</span> kết quả</span>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2.5 border border-slate-200 bg-white rounded-xl text-slate-400 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white transition-all shadow-sm" 
                    disabled={page === 1}
                    onClick={() => {setPage(page - 1); window.scrollTo({top: 0, behavior: 'smooth'});}}
                  >
                    <span className="material-symbols-outlined text-[18px]">keyboard_arrow_left</span>
                  </button>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-2xl mx-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <button 
                          key={i+1}
                          className={`w-9 h-9 flex items-center justify-center rounded-xl text-[13px] font-bold transition-all ${page === i + 1 ? 'bg-black text-white shadow-md scale-110' : 'text-slate-500 hover:bg-white hover:text-black hover:shadow-sm'}`}
                          onClick={() => {setPage(i + 1); window.scrollTo({top: 0, behavior: 'smooth'});}}
                        >
                          {i + 1}
                        </button>
                      ))}
                  </div>
                  <button 
                    className="p-2.5 border border-slate-200 bg-white rounded-xl text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white transition-all shadow-sm"
                    disabled={page === totalPages}
                    onClick={() => {setPage(page + 1); window.scrollTo({top: 0, behavior: 'smooth'});}}
                  >
                    <span className="material-symbols-outlined text-[18px]">keyboard_arrow_right</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Statistics section removed */}
        </div>
      </main>

      {/* Candidate Detail Modal */}
      {showDetailModal && selectedCandidate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[8px] animate-in fade-in duration-300" onClick={() => setShowDetailModal(false)}></div>
            <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative z-10 animate-in zoom-in-95 fade-in duration-300 border border-slate-100">
                {/* Modal Header */}
                <div className="p-8 pb-4 flex justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-extrabold text-slate-900">Chi tiết tài khoản</h3>
                        <p className="text-[12px] font-bold text-slate-400 tracking-tight">Mã ID: {selectedCandidate.id}</p>
                    </div>
                    <button onClick={() => setShowDetailModal(false)} className="w-10 h-10 bg-slate-50 hover:bg-slate-900 text-slate-400 hover:text-white rounded-2xl transition-all flex items-center justify-center">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-8 overflow-y-auto max-h-[calc(90vh-160px)] custom-scrollbar">
                    <div className="flex flex-col md:flex-row gap-10 mb-10 items-start">
                        <div className="relative group shrink-0">
                            {selectedCandidate.avatar ? (
                                <img src={selectedCandidate.avatar} alt={selectedCandidate.name} className="w-32 h-32 rounded-[2rem] object-cover border-4 border-white shadow-xl ring-1 ring-slate-100 transition-transform group-hover:scale-105 duration-500" />
                            ) : (
                                <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-tr from-slate-900 to-slate-700 flex items-center justify-center text-4xl font-extrabold text-white border-4 border-white shadow-xl ring-1 ring-slate-100 transition-transform group-hover:scale-105 duration-500">
                                    {selectedCandidate.name[0].toUpperCase()}
                                </div>
                            )}
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-50 animate-bounce">
                                <span className={`w-3 h-3 rounded-full ${selectedCandidate.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                            </div>
                        </div>
                        <div className="flex-1 pt-2 space-y-5">
                            <div>
                                <h4 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">{selectedCandidate.name}</h4>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <span className="material-symbols-outlined text-[16px]">mail</span>
                                    <p className="text-[14px] font-bold font-mono">{selectedCandidate.email}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {getStatusBadge(selectedCandidate.status)}
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-[10px] font-extrabold rounded-xl uppercase tracking-widest shadow-sm">
                                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                                    Candidate
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-symbols-outlined text-slate-400 text-[18px]">call</span>
                                    <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Số điện thoại</p>
                                </div>
                                <p className="text-[15px] font-bold text-slate-800">{selectedCandidate.phone || 'Chưa cập nhật'}</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-symbols-outlined text-slate-400 text-[18px]">person</span>
                                    <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Giới tính</p>
                                </div>
                                <p className="text-[15px] font-bold text-slate-800 uppercase text-[12px]">{selectedCandidate.gender === 'male' ? 'Nam' : selectedCandidate.gender === 'female' ? 'Nữ' : 'Khác'}</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-symbols-outlined text-slate-400 text-[18px]">event</span>
                                    <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Ngày sinh</p>
                                </div>
                                <p className="text-[15px] font-bold text-slate-800">{selectedCandidate.date_of_birth || 'Chưa xác định'}</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-symbols-outlined text-slate-400 text-[18px]">history_edu</span>
                                    <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Kinh nghiệm</p>
                                </div>
                                <p className="text-[15px] font-bold text-slate-800 leading-none">{selectedCandidate.experience_years} năm</p>
                            </div>
                            <div className="col-span-1 md:col-span-2 space-y-2 border-t border-slate-200/50 pt-6">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-symbols-outlined text-slate-400 text-[18px]">location_on</span>
                                    <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Địa chỉ thường trú</p>
                                </div>
                                <p className="text-[14px] font-bold text-slate-700 leading-relaxed italic opacity-80">{selectedCandidate.address || 'Hệ thống chưa ghi nhận địa chỉ cụ thể của ứng viên này.'}</p>
                            </div>
                            <div className="col-span-1 md:col-span-2 space-y-3 pt-4">
                                <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Giới thiệu tổng quát</p>
                                <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm relative">
                                    <span className="material-symbols-outlined absolute -top-3 -left-2 text-[24px] text-slate-200 rotate-12">format_quote</span>
                                    <p className="text-[14px] font-medium text-slate-600 leading-relaxed italic">
                                        {selectedCandidate.bio || 'Ứng viên chưa cập nhật thông tin giới thiệu cá nhân tại HireMind.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-8 pt-2 border-t border-slate-100 flex justify-end gap-3 bg-white">
                    <button 
                        onClick={() => handleStatusChange(selectedCandidate.id, selectedCandidate.status)}
                        className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
                    >
                        Xử lý trạng thái
                    </button>
                    <button 
                        onClick={() => handleDelete(selectedCandidate.id, selectedCandidate.name)}
                        className="group flex items-center gap-2 px-6 py-3 bg-rose-50 text-rose-600 rounded-2xl text-[13px] font-bold hover:bg-rose-600 hover:text-white transition-all shadow-sm disabled:opacity-50"
                        disabled={isDeleting}
                    >
                        <span className="material-symbols-outlined text-[18px] group-hover:animate-pulse">delete_forever</span>
                        {isDeleting ? 'Phá hủy...' : 'Xóa tài khoản'}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminCandidates;
