import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getUser, removeToken, removeUser } from '@/utils/authUtils';
import jobService from '@/services/jobService';
import RecruiterSidebar from '@/components/common/RecruiterSidebar';
import RecruiterHeader from '@/components/common/RecruiterHeader';

const RecruiterEditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getUser();
  
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    employment_type: 'fulltime',
    experience_level: 'junior',
    salary_min: '',
    salary_max: '',
    currency: 'VNĐ',
    description: '',
    requirements: '',
    benefits: '',
    quantity: 1,
    deadline: '',
    status: 'open',
    skills: []
  });

  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const data = await jobService.getJobById(id);
        // Format deadline for date input (YYYY-MM-DD)
        const formattedDeadline = data.deadline ? new Date(data.deadline).toISOString().split('T')[0] : '';
        
        setFormData({
          title: data.title || '',
          location: data.location || '',
          employment_type: data.employment_type || 'fulltime',
          experience_level: data.experience_level || 'junior',
          salary_min: data.salary_min || '',
          salary_max: data.salary_max || '',
          currency: data.currency || 'VNĐ',
          description: data.description || '',
          requirements: data.requirements || '',
          benefits: data.benefits || '',
          quantity: data.quantity || 1,
          deadline: formattedDeadline,
          status: data.status || 'open',
          skills: data.skills || []
        });
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Không thể tải thông tin công việc.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetail();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(skillInput.trim())) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, skillInput.trim()]
        }));
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const dataToSubmit = { 
        ...formData, 
        salary_min: formData.salary_min ? parseInt(formData.salary_min) : null,
        salary_max: formData.salary_max ? parseInt(formData.salary_max) : null,
        quantity: parseInt(formData.quantity)
      };

      await jobService.updateJob(id, dataToSubmit);
      alert('Cập nhật tin tuyển dụng thành công!');
      navigate(`/recruiter/jobs/${id}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 text-slate-900 h-screen flex font-display antialiased overflow-hidden">
      
      <RecruiterSidebar activeTab="jobs" user={user} />

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <RecruiterHeader user={user} />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto w-full">
          <form className="max-w-[1400px] mx-auto w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 w-full">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-900">Chỉnh sửa tin tuyển dụng</h1>
                <p className="text-slate-500 text-[15px]">Cập nhật các thông tin để thu hút ứng viên tốt hơn.</p>
              </div>
              <div className="flex gap-3 shrink-0 mt-4 sm:mt-0">
                <button 
                  type="button"
                  onClick={() => navigate(`/recruiter/jobs/${id}`)}
                  className="px-5 py-2.5 text-sm font-bold border border-slate-200 bg-white hover:bg-slate-50 rounded-xl transition-colors text-slate-700 shadow-sm">
                  Hủy bỏ
                </button>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 text-sm font-bold bg-primary text-white hover:opacity-90 rounded-xl transition-colors shadow-lg shadow-primary/20 disabled:opacity-50">
                  {submitting ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
              <div className="p-8 md:p-10 space-y-12">
                
                {/* 1. Basic */}
                <section>
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-8">
                    <div className="bg-slate-100 p-2 rounded-xl text-slate-600">
                      <span className="material-symbols-outlined text-[20px] block">article</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Thông tin cơ bản</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2.5 md:col-span-2">
                       <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Tiêu đề công việc <span className="text-rose-500">*</span></label>
                      <input 
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-[15px] shadow-sm font-medium" placeholder="VD: Senior Frontend Developer" type="text" 
                      />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Địa điểm <span className="text-rose-500">*</span></label>
                      <input 
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-[15px] shadow-sm font-medium" placeholder="VD: Quận 1, TP. Hồ Chí Minh" type="text" 
                      />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Loại hình làm việc</label>
                      <select 
                        name="employment_type"
                        value={formData.employment_type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] shadow-sm text-slate-800 bg-white font-medium">
                        <option value="fulltime">Toàn thời gian</option>
                        <option value="parttime">Bán thời gian</option>
                        <option value="intern">Thực tập</option>
                        <option value="freelance">Freelance</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2.5 md:col-span-2">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Cấp bậc kinh nghiệm</label>
                      <select 
                        name="experience_level"
                        value={formData.experience_level}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] shadow-sm text-slate-800 bg-white font-medium">
                        <option value="fresher">Intern / Fresher</option>
                        <option value="junior">Junior</option>
                        <option value="mid">Middle</option>
                        <option value="senior">Senior</option>
                        <option value="manager">Manager</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* 2. Salary */}
                <section>
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-8">
                    <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl border border-emerald-100">
                      <span className="material-symbols-outlined text-[20px] block">payments</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Mức lương</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Tối thiểu</label>
                      <input 
                        name="salary_min"
                        value={formData.salary_min}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-[15px] shadow-sm font-bold text-slate-800" placeholder="0" type="number" 
                      />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Tối đa</label>
                      <input 
                        name="salary_max"
                        value={formData.salary_max}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-[15px] shadow-sm font-bold text-slate-800" placeholder="Thỏa thuận" type="number" 
                      />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Đơn vị tiền tệ</label>
                      <select 
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] shadow-sm text-slate-800 bg-white font-bold">
                        <option value="VNĐ">VNĐ</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* 3. Content */}
                <section>
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-8">
                    <div className="bg-sky-50 text-sky-600 p-2 rounded-xl border border-sky-100">
                      <span className="material-symbols-outlined text-[20px] block">edit_document</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Nội dung chi tiết</h3>
                  </div>
                  <div className="space-y-8">
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Mô tả công việc <span className="text-rose-500">*</span></label>
                      <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] leading-relaxed font-medium" placeholder="Mô tả các nhiệm vụ hàng ngày..." rows="4"></textarea>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Yêu cầu công việc</label>
                      <textarea 
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] leading-relaxed font-medium" placeholder="Các kỹ năng và kinh nghiệm cần thiết..." rows="4"></textarea>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Quyền lợi & Phúc lợi</label>
                      <textarea 
                        name="benefits"
                        value={formData.benefits}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] leading-relaxed font-medium" placeholder="Chế độ bảo hiểm, thưởng, nghỉ phép..." rows="4"></textarea>
                    </div>
                  </div>
                </section>

                {/* 4. Skills */}
                <section>
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-8">
                    <div className="bg-fuchsia-50 text-fuchsia-600 p-2 rounded-xl border border-fuchsia-100">
                      <span className="material-symbols-outlined text-[20px] block">psychology</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Kỹ năng yêu cầu</h3>
                  </div>
                  <div className="space-y-5">
                    <div className="flex flex-wrap gap-2.5">
                      {formData.skills.map((skill, index) => (
                        <span key={index} className="flex items-center gap-1 bg-slate-50 border border-slate-200 pl-3 pr-1.5 py-1.5 rounded-lg text-[13px] font-bold text-slate-700 shadow-sm cursor-default">
                          {skill} <span onClick={() => removeSkill(skill)} className="material-symbols-outlined text-[16px] cursor-pointer hover:text-rose-500 hover:bg-rose-50 rounded transition-colors ml-1 p-0.5">close</span>
                        </span>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">search</span>
                      <input 
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleAddSkill}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-[15px] font-medium shadow-sm" placeholder="Tìm kiếm và thêm kỹ năng..." type="text" 
                      />
                    </div>
                  </div>
                </section>

                {/* 5. Khác */}
                <section>
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-8">
                    <div className="bg-amber-50 text-amber-600 p-2 rounded-xl border border-amber-100">
                      <span className="material-symbols-outlined text-[20px] block">schedule</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Thông tin khác</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Số lượng cần tuyển</label>
                      <input 
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-[15px] font-medium shadow-sm" placeholder="1" type="number" 
                      />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Hạn chót nộp hồ sơ</label>
                      <input 
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-slate-600 text-[15px] font-bold shadow-sm" type="date" 
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-end pb-12 border-t border-slate-200 pt-8">
              <button 
                type="button"
                onClick={() => navigate(`/recruiter/jobs/${id}`)}
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold border border-slate-200 bg-white hover:bg-slate-50 rounded-xl transition-colors shadow-sm text-slate-700">
                Hủy bỏ
              </button>
              <button 
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-10 py-3.5 text-sm font-bold bg-primary text-white hover:opacity-90 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50">
                <span className="material-symbols-outlined text-[20px]">{submitting ? 'sync' : 'save'}</span>
                {submitting ? 'Đang lưu...' : 'Lưu tất cả thay đổi'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default RecruiterEditJob;
