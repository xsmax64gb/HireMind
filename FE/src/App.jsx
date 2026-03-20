import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/user/Login';
import RegisterPage from '@/pages/user/Register';
import ForgotPasswordPage from '@/pages/user/ForgotPassword';
import HomePage from '@/pages/user/Home';
import JobsPage from '@/pages/user/Jobs';
import JobDetail from '@/pages/user/JobDetail';
import MockInterview from '@/pages/user/MockInterview';
import ProfilePage from '@/pages/user/Profile';
import ProfileCV from '@/pages/user/ProfileCV';
import ProfileApplications from '@/pages/user/ProfileApplications';
import RecruiterPostJob from '@/pages/recruiter/RecruiterPostJob';
import RecruiterJobs from '@/pages/recruiter/RecruiterJobs';
import RecruiterJobCandidates from '@/pages/recruiter/RecruiterJobCandidates';
import RecruiterInterviews from '@/pages/recruiter/RecruiterInterviews';
import RecruiterDashboard from '@/pages/recruiter/RecruiterDashboard';
import RecruiterProfile from '@/pages/recruiter/RecruiterProfile';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminCandidates from '@/pages/admin/AdminCandidates';
import AdminRecruiters from '@/pages/admin/AdminRecruiters';
import AdminJobs from '@/pages/admin/AdminJobs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/interview/:id" element={<MockInterview />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/cv" element={<ProfileCV />} />
        <Route path="/profile/applications" element={<ProfileApplications />} />
        <Route path="/recruiter/jobs" element={<RecruiterJobs />} />
        <Route path="/recruiter/jobs/:id/candidates" element={<RecruiterJobCandidates />} />
        <Route path="/recruiter/post-job" element={<RecruiterPostJob />} />
        <Route path="/recruiter/interviews" element={<RecruiterInterviews />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/profile" element={<RecruiterProfile />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/candidates" element={<AdminCandidates />} />
        <Route path="/admin/recruiters" element={<AdminRecruiters />} />
        <Route path="/admin/jobs" element={<AdminJobs />} />
        <Route path="*" element={<div className="p-8">404 - Không tìm thấy trang</div>} />
      </Routes>
    </Router>
  );
}

export default App;
