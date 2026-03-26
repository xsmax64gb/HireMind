import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '@/features/user/api/userApi';
import { removeToken, removeUser, getUser } from '@/utils/authUtils';
import Navbar from '@/components/layout/Navbar';
import UserSidebar from '@/components/common/UserSidebar';

const ProfilePage = () => {
  const navigate = useNavigate();
  const currentUser = getUser();

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    bio: '',
    position: '',
    company_description: '',
    address: '',
    date_of_birth: '',
    gender: ''
  });
  const [loading, setLoading] = useState(true);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await userApi.getProfile();
      setProfile({
        name: data.name || '',
        email: data.email || '',
        role: data.role || '',
        phone: data.phone || '',
        bio: data.bio || data.company_description || '',
        position: data.position || '',
        company_description: data.company_description || '',
        address: data.address || data.company_address || '',
        date_of_birth: data.date_of_birth || '',
        gender: data.gender || ''
      });
    } catch (error) {
      showMessage('error', 'Lỗi khi tải thông tin: ' + (error?.message || 'Lỗi server'));
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
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

      // Update data structure based on role if needed, or backend handles it
      const updateData = {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        bio: profile.bio,
        position: profile.position,
        address: profile.address,
        date_of_birth: profile.date_of_birth,
        gender: profile.gender
      };

      await userApi.updateProfile(updateData);
      showMessage('success', 'Cập nhật thông tin thành công!');
    } catch (error) {
      showMessage('error', 'Cập nhật thất bại: ' + (error?.message || 'Lỗi server'));
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return showMessage('error', 'Mật khẩu xác nhận không khớp!');
    }
    try {
      setUpdatingPassword(true);
      await userApi.changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      showMessage('success', 'Đổi mật khẩu thành công!');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      showMessage('error', 'Đổi mật khẩu thất bại: ' + (error?.message || 'Lỗi server'));
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'candidate': return 'Ứng viên';
      case 'recruiter': return 'Nhà tuyển dụng';
      case 'admin': return 'Quản trị viên';
      default: return 'Người dùng';
    }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Đang tải thông tin...</div>;
  }

  return (
    <div className="bg-slate-50 text-slate-900 h-screen flex flex-col font-display antialiased">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto overflow-hidden bg-white shadow-sm border-x border-slate-200">
        <UserSidebar 
          user={currentUser} 
          handleLogout={handleLogout} 
          profileName={profile.name} 
        />

        {/* Main Content */}
        <main className="flex-1 bg-white p-12 overflow-y-auto w-full">
          <div className="max-w-4xl mx-auto">

            {/* Toast Notification */}
            {message.text && (
              <div className={`fixed bottom-8 right-8 z-[100] min-w-[320px] p-5 rounded-2xl font-bold text-[15px] border shadow-2xl flex items-center gap-3 animate-bounce ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-emerald-500/20' : 'bg-rose-50 text-rose-800 border-rose-300 shadow-rose-500/20'}`}>
                <span className="material-symbols-outlined text-[24px]">
                  {message.type === 'success' ? 'check_circle' : 'error'}
                </span>
                <span className="flex-1">{message.text}</span>
              </div>
            )}

            {/* Thông tin cá nhân */}
            <section className="mb-16">
              <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Thông tin cá nhân</h1>
                <p className="text-slate-500 text-[15px]">Cập nhật thông tin cá nhân và tóm tắt chuyên môn của bạn để thu hút nhà tuyển dụng.</p>
              </div>

              <form onSubmit={handleUpdateProfile} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Họ và tên</label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] font-medium text-slate-800 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Email liên hệ</label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      required
                      disabled
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed outline-none transition-all text-[15px] font-medium shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Vai trò</label>
                    <input
                      type="text"
                      value={getRoleDisplayName(profile.role)}
                      disabled
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed outline-none transition-all text-[15px] font-medium shadow-sm"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Số điện thoại</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] font-medium text-slate-800 shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Địa chỉ</label>
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleProfileChange}
                      placeholder="VD: Quận 1, TP. HCM"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] font-medium text-slate-800 shadow-sm"
                    />
                  </div>
                  {profile.role === 'candidate' && (
                    <div className="space-y-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Giới tính</label>
                      <div className="relative">
                        <select
                          name="gender"
                          value={profile.gender}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] font-medium text-slate-800 shadow-sm appearance-none bg-white"
                        >
                          <option value="">Chọn giới tính</option>
                          <option value="male">Nam</option>
                          <option value="female">Nữ</option>
                          <option value="other">Khác</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                          <span className="material-symbols-outlined text-lg">expand_more</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {profile.role === 'candidate' && (
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Ngày sinh</label>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={profile.date_of_birth}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] font-medium text-slate-800 shadow-sm"
                    />
                  </div>
                )}

                <div className="space-y-2.5">
                  <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Tóm tắt chuyên môn / Giới thiệu</label>
                  <textarea
                    rows={4}
                    name="bio"
                    value={profile.bio}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] font-medium text-slate-800 shadow-sm resize-none leading-relaxed"
                  ></textarea>
                </div>

                <div className="flex justify-end pt-6 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={updatingProfile}
                    className="bg-black text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-opacity text-sm shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {updatingProfile ? 'Đang lưu...' : 'Lưu thay đổi'}
                  </button>
                </div>
              </form>
            </section>

            {/* Đổi mật khẩu */}
            <section className="mb-8">
              <div className="mb-10">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Đổi mật khẩu</h2>
                <p className="text-slate-500 text-[15px]">Đảm bảo tài khoản của bạn đang sử dụng một mật khẩu dài và ngẫu nhiên để giữ an toàn.</p>
              </div>

              <form onSubmit={handleUpdatePassword} className="flex flex-col gap-8">
                <div className="space-y-2.5 max-w-md">
                  <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-lg tracking-widest text-slate-800 shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Mật khẩu mới</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-lg tracking-widest text-slate-800 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Xác nhận mật khẩu mới</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-lg tracking-widest text-slate-800 shadow-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={updatingPassword}
                    className="bg-black text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-opacity text-sm shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {updatingPassword ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
