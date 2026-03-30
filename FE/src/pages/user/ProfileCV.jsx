import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, removeToken, removeUser, getToken } from '@/utils/authUtils';
import Navbar from '@/components/layout/Navbar';
import UserSidebar from '@/components/common/UserSidebar';
import apiClient from '@/services/apiClient';

const ProfileCV = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCVs();
  }, []);

  const fetchCVs = async () => {
    try {
      setLoading(true);
      const data = await apiClient.get('/cvs');
      setCvs(data || []);
    } catch (error) {
      console.error('Error fetching CVs:', error);
      alert('Không thể lấy danh sách CV');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
       alert('Chỉ hỗ trợ tệp PDF');
       return;
    }

    if (file.size > 5 * 1024 * 1024) {
       alert('Kích thước tệp tối đa là 5MB');
       return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const data = await apiClient.post('/cvs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Tải lên CV thành công');
      fetchCVs();
    } catch (error) {
      console.error('Error uploading CV:', error);
      alert(error.message || 'Lỗi khi tải lên CV');
    } finally {
      setUploading(false);
      // Reset input value to allow selecting the same file again
      e.target.value = null;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa CV này?')) return;
    try {
      await apiClient.delete(`/cvs/${id}`);
      alert('Xóa CV thành công');
      fetchCVs();
    } catch (error) {
      console.error('Error deleting CV:', error);
      alert('Không thể xóa CV');
    }
  };

  const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      });
  };

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
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Quản lý CV</h1>
              <p className="text-slate-500 text-[15px]">Danh sách các CV bạn đã tải lên hệ thống.</p>
            </div>

            {/* Upload Area */}
            <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center mb-10 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
              <input 
                type="file" 
                accept="application/pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                disabled={uploading}
              />
              <div className="size-16 bg-white rounded-full flex items-center justify-center border border-slate-200 mb-4 group-hover:shadow-md transition-all group-hover:border-primary/30">
                {uploading ? (
                    <div className="size-8 rounded-full border-4 border-slate-200 border-t-primary animate-spin"></div>
                ) : (
                    <span className="material-symbols-outlined text-3xl text-slate-700 group-hover:text-primary transition-colors">upload_file</span>
                )}
              </div>
              <h3 className="text-[15px] font-bold text-slate-900 mb-1">{uploading ? 'Đang tải lên...' : 'Tải lên CV mới'}</h3>
              <p className="text-[13px] text-slate-500">Kéo và thả tệp tại đây hoặc nhấp để chọn tệp (PDF - Tối đa 5MB)</p>
            </div>

            {/* CV List */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 grid grid-cols-12 gap-4">
                <div className="col-span-8 md:col-span-6 text-[13px] font-bold text-slate-600">Tên tệp tin</div>
                <div className="hidden md:block col-span-4 text-[13px] font-bold text-slate-600">Ngày tải lên</div>
                <div className="col-span-4 md:col-span-2 text-[13px] font-bold text-slate-600 text-right">Thao tác</div>
              </div>

              <div className="divide-y divide-slate-100 bg-white">
                {loading ? (
                    <div className="px-6 py-10 text-center text-slate-500 text-sm">Đang tải danh sách CV...</div>
                ) : cvs.length === 0 ? (
                    <div className="px-6 py-10 text-center text-slate-500 text-sm">Chưa có CV nào được tải lên.</div>
                ) : (
                    cvs.map(cv => (
                        <div key={cv.id} className="px-6 py-5 grid grid-cols-12 gap-4 items-center hover:bg-slate-50/50 transition-colors group">
                          <div className="col-span-8 md:col-span-6 flex items-center gap-4">
                            <div className="text-rose-500 flex items-center justify-center bg-rose-50 p-2 rounded-lg">
                              <span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
                            </div>
                            <span 
                              className="text-[14px] font-bold text-slate-800 truncate group-hover:text-primary transition-colors cursor-pointer"
                              onClick={() => window.open(cv.cloudinary_url, '_blank')}
                            >
                              {cv.file_name}
                            </span>
                          </div>
                          <div className="hidden md:block col-span-4 text-[13px] text-slate-500 font-medium">
                              {formatDate(cv.created_at)}
                          </div>
                          <div className="col-span-4 md:col-span-2 flex items-center gap-4 justify-end text-slate-400">
                            <button 
                              className="hover:text-primary transition-colors tooltip" 
                              title="Xem trước"
                              onClick={() => window.open(cv.cloudinary_url, '_blank')}
                            >
                              <span className="material-symbols-outlined text-[20px]">visibility</span>
                            </button>
                            <a 
                              className="hover:text-primary transition-colors tooltip" 
                              title="Tải xuống"
                              href={cv.cloudinary_url.replace('/upload/', '/upload/fl_attachment/')}
                              download
                            >
                              <span className="material-symbols-outlined text-[20px]">download</span>
                            </a>
                            <button 
                                className="hover:text-rose-600 transition-colors tooltip" 
                                title="Xóa"
                                onClick={() => handleDelete(cv.id)}
                            >
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                          </div>
                        </div>
                    ))
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileCV;
