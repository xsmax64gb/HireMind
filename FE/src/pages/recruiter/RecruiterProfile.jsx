import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '@/features/user/api/userApi';
import { removeToken, removeUser, getUser } from '@/utils/authUtils';
import RecruiterSidebar from '@/components/common/RecruiterSidebar';
import RecruiterHeader from '@/components/common/RecruiterHeader';

const RecruiterProfile = () => {
  const navigate = useNavigate();
  const currentUser = getUser();
  
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    position: '',
    company_name: '',
    company_website: '',
    company_size: '',
    company_address: '',
    company_description: '',
    company_logo_url: ''
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(true);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userApi.getProfile();
        setProfile({
          name: data.name || '',
          email: data.email || '',
          position: data.position || '',
          company_name: data.company_name || '',
          company_website: data.company_website || '',
          company_size: data.company_size || '1-50',
          company_address: data.company_address || '',
          company_description: data.company_description || '',
          company_logo_url: data.company_logo_url || ''
        });
      } catch (error) {
        showToast('Không thể tải thông tin hồ sơ', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const showToast = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setUpdatingProfile(true);
      await userApi.updateProfile(profile);
      showToast('Cập nhật thông tin công ty thành công', 'success');
      
      // Update local storage if name changed
      const updatedUser = { ...currentUser, name: profile.name };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      showToast(error.response?.data?.message || 'Lỗi khi cập nhật thông tin', 'error');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return showToast('Mật khẩu xác nhận không khớp', 'error');
    }
    try {
      setUpdatingPassword(true);
      await userApi.changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      showToast('Đổi mật khẩu thành công', 'success');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      showToast(error.response?.data?.message || 'Lỗi khi đổi mật khẩu', 'error');
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold animate-pulse">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-slate-50 text-slate-900 h-screen flex font-display antialiased overflow-hidden">
      
      <RecruiterSidebar activeTab="profile" user={currentUser} />

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <RecruiterHeader user={currentUser} />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto w-full">
          <div className="max-w-[1400px] mx-auto w-full">
            
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-900">Hồ sơ Công ty</h1>
              <p className="text-slate-500 text-[15px]">Quản lý thông tin doanh nghiệp và tài khoản nhà tuyển dụng của bạn.</p>
            </div>

            <div className="flex flex-col gap-8">
              
              {/* Toast Notification */}
              {message.text && (
                <div className={`fixed bottom-8 right-8 z-[100] min-w-[320px] p-5 rounded-2xl font-bold text-[15px] border shadow-2xl flex items-center gap-3 animate-bounce ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-emerald-500/20' : 'bg-rose-50 text-rose-800 border-rose-300 shadow-rose-500/20'}`}>
                  <span className="material-symbols-outlined text-[24px]">
                    {message.type === 'success' ? 'check_circle' : 'error'}
                  </span>
                  {message.text}
                </div>
              )}

              {/* Company Information Form */}
              <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transform transition-all hover:shadow-md">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <span className="material-symbols-outlined text-[20px] block">domain</span>
                  </div>
                  <h2 className="text-[16px] font-bold text-slate-900">Thông tin Doanh nghiệp</h2>
                </div>
                
                <form onSubmit={handleUpdateProfile} className="p-8 flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-slate-700">Tên công ty</label>
                      <input 
                        className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" 
                        type="text" 
                        name="company_name"
                        value={profile.company_name}
                        onChange={handleProfileChange}
                        placeholder="Nhập tên công ty" 
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-slate-700">Họ tên người liên hệ (HR)</label>
                      <input 
                        className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" 
                        type="text" 
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        placeholder="Nhập họ tên bạn" 
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-slate-700">Chức vụ</label>
                      <input 
                        className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" 
                        type="text" 
                        name="position"
                        value={profile.position}
                        onChange={handleProfileChange}
                        placeholder="VD: HR Manager" 
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-slate-700">Website (URL)</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">language</span>
                        <input 
                           className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" 
                           type="url" 
                           name="company_website"
                           value={profile.company_website}
                           onChange={handleProfileChange}
                           placeholder="https://example.com" 
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-slate-700">Quy mô công ty</label>
                      <select 
                        name="company_size"
                        value={profile.company_size}
                        onChange={handleProfileChange}
                        className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-medium text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      >
                        <option value="1-50">1 - 50 nhân viên</option>
                        <option value="51-200">51 - 200 nhân viên</option>
                        <option value="201-500">201 - 500 nhân viên</option>
                        <option value="500+">Trên 500 nhân viên</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-slate-700">Vị trí trụ sở chính</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">location_on</span>
                        <input 
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" 
                          type="text" 
                          name="company_address"
                          value={profile.company_address}
                          onChange={handleProfileChange}
                          placeholder="Thành phố, Tỉnh" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-slate-700">Mô tả ngắn gọn về công ty</label>
                    <textarea 
                      name="company_description"
                      value={profile.company_description}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 h-28 resize-none bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" 
                      placeholder="Viết vài dòng giới thiệu về lĩnh vực hoạt động của công ty bạn..."
                    ></textarea>
                  </div>

                  <div className="flex justify-end mt-2">
                    <button 
                       type="submit"
                       disabled={updatingProfile}
                       className="px-6 py-2.5 bg-slate-900 text-white text-[13px] font-bold rounded-xl hover:bg-primary transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {updatingProfile ? 'Đang lưu...' : 'Lưu thông tin công ty'}
                    </button>
                  </div>
                </form>
              </section>

              {/* Security & Password Section */}
              <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transform transition-all hover:shadow-md">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <span className="material-symbols-outlined text-[20px] block">lock</span>
                  </div>
                  <h2 className="text-[16px] font-bold text-slate-900">Tính năng Bảo mật</h2>
                </div>
                
                <form onSubmit={handleUpdatePassword} className="p-8 flex flex-col gap-6">
                  <p className="text-[14px] text-slate-500 mb-2">Đảm bảo tài khoản tuyển dụng của bạn có một mật khẩu mạnh và an toàn.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2 md:col-span-2 max-w-md">
                      <label className="text-[13px] font-bold text-slate-700">Mật khẩu hiện tại</label>
                      <input 
                        className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" 
                        type="password" 
                        name="currentPassword"
                        value={passwords.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="••••••••" 
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-slate-700">Mật khẩu mới</label>
                      <input 
                        className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" 
                        type="password" 
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Tạo mật khẩu mới" 
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-slate-700">Xác nhận mật khẩu mới</label>
                      <input 
                        className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" 
                        type="password" 
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Nhập lại mật khẩu mới" 
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button 
                       type="submit"
                       disabled={updatingPassword}
                       className="px-6 py-2.5 bg-slate-900 text-white text-[13px] font-bold rounded-xl hover:bg-primary transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {updatingPassword ? 'Đang đổi...' : 'Đổi mật khẩu'}
                    </button>
                  </div>
                </form>
              </section>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterProfile;
