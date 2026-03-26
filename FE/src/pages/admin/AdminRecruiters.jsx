import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '@/components/common/AdminSidebar';
import adminService from '../../services/adminService';

const AdminRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sort, setSort] = useState('desc');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa cập nhật';
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchRecruiters = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminService.getRecruiters({
        search,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        sort,
        page,
        limit: 10
      });
      if (response.success) {
        setRecruiters(response.data);
        setTotal(response.pagination.total);
        setTotalPages(response.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching recruiters:', error);
    } finally {
      setLoading(false);
    }
  }, [search, startDate, endDate, sort, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
        fetchRecruiters();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchRecruiters]);

  const handleStatusChange = async (id, currentStatus) => {
    let newStatus = 'active';
    if (currentStatus === 'active') {
        newStatus = 'inactive';
    } else if (currentStatus === 'inactive') {
        newStatus = 'banned';
    } else {
        newStatus = 'active';
    }

    if (!window.confirm(`Bạn có chắc muốn đổi trạng thái của nhà tuyển dụng này sang ${newStatus === 'active' ? 'Hoạt động' : newStatus === 'inactive' ? 'Ngừng hoạt động' : 'Khóa'}?`)) return;

    try {
      const response = await adminService.updateRecruiterStatus(id, newStatus);
      if (response.success) {
        fetchRecruiters();
        if (selectedRecruiter?.id === id) {
            setSelectedRecruiter({...selectedRecruiter, status: newStatus});
        }
      }
    } catch (error) {
      alert(error.message || 'Cập nhật trạng thái thất bại.');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`HÀNH ĐỘNG NÀY KHÔNG THỂ KHÔI PHỤC! Bạn có thực sự muốn xóa tài khoản của nhà tuyển dụng ${name}?`)) return;

    try {
      setIsDeleting(true);
      const response = await adminService.deleteRecruiter(id);
      if (response.success) {
        fetchRecruiters();
        if (selectedRecruiter?.id === id) setShowDetailModal(false);
      }
    } catch (error) {
      alert(error.message || 'Xóa tài khoản thất bại.');
    } finally {
      setIsDeleting(false);
    }
  };

  const viewDetail = async (id) => {
    try {
      const response = await adminService.getRecruiterDetail(id);
      if (response.success) {
        setSelectedRecruiter(response.data);
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
            Hệ thống / <span className="text-slate-900 font-bold">Quản lý Nhà tuyển dụng</span>
          </h2>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full mb-10">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">Quản lý Nhà tuyển dụng</h1>
              <p className="text-slate-500 text-[14px]">Xem và quản lý thông tin các tài khoản nhà tuyển dụng & công ty.</p>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-slate-100 flex flex-col xl:flex-row gap-6">
              <div className="relative flex-1 max-w-2xl">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                <input 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] font-medium focus:ring-2 focus:ring-black focus:border-black outline-none transition-all placeholder:text-slate-500 shadow-inner" 
                  placeholder="Tìm kiếm theo tên, email hoặc công ty..." 
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
                    <th className="px-8 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest bg-slate-50/50 w-[30%]">Họ tên & Công ty</th>
                    <th className="px-8 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest bg-slate-50/50 w-[25%]">Email liên hệ</th>
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
                  ) : recruiters.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-8 py-32 text-center">
                         <div className="flex flex-col items-center gap-4">
                          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                             <span className="material-symbols-outlined text-[48px] text-slate-200">apartment</span>
                          </div>
                          <p className="text-[15px] font-bold text-slate-400 italic">Oops! Không tìm thấy nhà tuyển dụng phù hợp.</p>
                          <button onClick={() => {setStartDate(''); setEndDate(''); setSearch('');}} className="text-[13px] font-extrabold text-black underline underline-offset-4 hover:text-slate-600 transition-colors">Thiết lập lại bộ lọc</button>
                        </div>
                      </td>
                    </tr>
                  ) : recruiters.map((recruiter) => (
                    <tr key={recruiter.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-5">
                          {recruiter.company_logo_url ? (
                             <img src={recruiter.company_logo_url} alt={recruiter.company_name} className="w-11 h-11 rounded-2xl border-2 border-white object-cover shadow-sm ring-1 ring-slate-100" />
                          ) : (
                            <div className="w-11 h-11 rounded-2xl bg-black border-2 border-zinc-800 flex items-center justify-center text-[12px] font-bold text-white shadow-sm ring-1 ring-slate-100">
                              {recruiter.company_name ? recruiter.company_name[0].toUpperCase() : 'C'}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="text-[15px] font-bold text-slate-900 group-hover:text-black transition-colors cursor-pointer hover:underline underline-offset-4" onClick={() => viewDetail(recruiter.id)}>
                              {recruiter.name}
                            </span>
                            <span className="text-[12px] font-semibold text-slate-500">{recruiter.company_name || 'Chưa cập nhật công ty'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-[14px] font-medium text-slate-600 font-mono tracking-tight">{recruiter.email}</td>
                      <td className="px-8 py-5 text-[14px] font-bold text-slate-600">
                        {formatDate(recruiter.created_at)}
                      </td>
                      <td className="px-8 py-5">
                        {getStatusBadge(recruiter.status)}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-end gap-2 opacity-10 sm:opacity-40 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                          <button 
                            className="p-2.5 text-slate-400 hover:text-black hover:bg-white hover:shadow-sm rounded-xl transition-all" 
                            title="Xem chi tiết"
                            onClick={() => viewDetail(recruiter.id)}
                          >
                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                          </button>
                          <button 
                            className="p-2.5 text-slate-400 hover:text-black hover:bg-white hover:shadow-sm rounded-xl transition-all" 
                            title="Đổi trạng thái"
                            onClick={() => handleStatusChange(recruiter.id, recruiter.status)}
                          >
                            <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
                          </button>
                          <button 
                            className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" 
                            title="Xóa tài khoản"
                            onClick={() => handleDelete(recruiter.id, recruiter.name)}
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
                <span className="text-[13px] text-slate-500 font-medium">Hiển thị <span className="font-bold text-slate-900">{recruiters.length}</span> / <span className="font-bold text-slate-900">{total}</span> kết quả</span>
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
        </div>
      </main>

      {/* Recruiter Detail Modal */}
      {showDetailModal && selectedRecruiter && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[8px] animate-in fade-in duration-300" onClick={() => setShowDetailModal(false)}></div>
            <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative z-10 animate-in zoom-in-95 fade-in duration-300 border border-slate-100">
                {/* Modal Header */}
                <div className="p-8 pb-4 flex justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-extrabold text-slate-900">Thông tin Nhà tuyển dụng</h3>
                        <p className="text-[12px] font-bold text-slate-400 tracking-tight">Mã ID: {selectedRecruiter.id}</p>
                    </div>
                    <button onClick={() => setShowDetailModal(false)} className="w-10 h-10 bg-slate-50 hover:bg-slate-900 text-slate-400 hover:text-white rounded-2xl transition-all flex items-center justify-center">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-8 overflow-y-auto max-h-[calc(90vh-160px)] custom-scrollbar">
                    <div className="flex flex-col md:flex-row gap-8 mb-10 items-center md:items-start text-center md:text-left">
                        <div className="relative group shrink-0">
                            {selectedRecruiter.company_logo_url ? (
                                <img src={selectedRecruiter.company_logo_url} alt={selectedRecruiter.company_name} className="w-28 h-28 rounded-[2rem] object-cover border-4 border-white shadow-xl ring-1 ring-slate-100" />
                            ) : (
                                <div className="w-28 h-28 rounded-[2rem] bg-black flex items-center justify-center text-4xl font-extrabold text-white border-4 border-white shadow-xl ring-1 ring-slate-100">
                                    {selectedRecruiter.company_name ? selectedRecruiter.company_name[0] : 'C'}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 space-y-3">
                            <div>
                                <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight">{selectedRecruiter.company_name || 'Tên công ty chưa cập nhật'}</h4>
                                <p className="text-[15px] font-bold text-primary mt-1">{selectedRecruiter.name} — <span className="text-slate-500 font-medium italic">{selectedRecruiter.position || 'Nhân sự'}</span></p>
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
                                {getStatusBadge(selectedRecruiter.status)}
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-extrabold rounded-lg uppercase tracking-widest border border-slate-200">
                                    {selectedRecruiter.company_size || 'Quy mô chưa rõ'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                       <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm transition-colors group-hover:bg-black group-hover:text-white">
                                <span className="material-symbols-outlined text-[20px]">mail</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-1">Email liên hệ</p>
                                <p className="text-[13px] font-bold text-slate-700 truncate max-w-[180px]">{selectedRecruiter.email}</p>
                            </div>
                       </div>
                       <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-center gap-4 text-primary">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <span className="material-symbols-outlined text-[20px]">language</span>
                            </div>
                            <div className="truncate">
                                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-1">Website</p>
                                <a href={selectedRecruiter.company_website} target="_blank" rel="noreferrer" className="text-[13px] font-bold hover:underline truncate block max-w-[180px]">
                                    {selectedRecruiter.company_website || 'Chưa cập nhật'}
                                </a>
                            </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                             <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400 text-[18px]">location_on</span>
                                <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Địa chỉ trụ sở</p>
                            </div>
                            <p className="text-[14px] font-bold text-slate-700 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm leading-relaxed">
                                {selectedRecruiter.company_address || 'Địa chỉ công ty chưa được ghi nhận trên hệ thống.'}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400 text-[18px]">info</span>
                                <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Mô tả doanh nghiệp</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative italic text-slate-600 text-[14px] leading-relaxed">
                                {selectedRecruiter.company_description || 'Doanh nghiệp chưa bổ sung phần giới thiệu chi tiết.'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-8 pt-4 border-t border-slate-100 flex justify-end gap-3 bg-white">
                    <button 
                        onClick={() => handleStatusChange(selectedRecruiter.id, selectedRecruiter.status)}
                        className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
                    >
                        Thay đổi trạng thái tài khoản
                    </button>
                    <button 
                        onClick={() => handleDelete(selectedRecruiter.id, selectedRecruiter.name)}
                        className="flex items-center gap-2 px-6 py-3 bg-rose-50 text-rose-600 rounded-2xl text-[13px] font-bold hover:bg-rose-600 hover:text-white transition-all shadow-sm disabled:opacity-50"
                        disabled={isDeleting}
                    >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                        Xóa tài khoản
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminRecruiters;
