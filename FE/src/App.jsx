import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/user/Login';
import RegisterPage from '@/pages/user/Register';
import ForgotPasswordPage from '@/pages/user/ForgotPassword';
import HomePage from '@/pages/user/Home';
import JobsPage from '@/pages/user/Jobs';
import JobDetail from '@/pages/user/JobDetail';
import MockInterview from '@/pages/user/MockInterview';
import InterviewHistory from '@/pages/user/InterviewHistory';
import ProfilePage from '@/pages/user/Profile';
import ProfileCV from '@/pages/user/ProfileCV';
import ProfileApplications from '@/pages/user/ProfileApplications';
import RecruiterPostJob from '@/pages/recruiter/RecruiterPostJob';
import RecruiterJobs from '@/pages/recruiter/RecruiterJobs';
import RecruiterJobCandidates from '@/pages/recruiter/RecruiterJobCandidates';
import RecruiterInterviews from '@/pages/recruiter/RecruiterInterviews';
import RecruiterDashboard from '@/pages/recruiter/RecruiterDashboard';
import RecruiterProfile from '@/pages/recruiter/RecruiterProfile';
import RecruiterJobDetail from '@/pages/recruiter/RecruiterJobDetail';
import RecruiterEditJob from '@/pages/recruiter/RecruiterEditJob';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminCandidates from '@/pages/admin/AdminCandidates';
import AdminRecruiters from '@/pages/admin/AdminRecruiters';
import AdminJobs from '@/pages/admin/AdminJobs';
import ProtectedRoute from '@/components/common/ProtectedRoute';

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
        <Route path="/interview-history" element={<InterviewHistory />} />
        <Route path="/profile" element={<ProtectedRoute allowedRoles={['candidate', 'admin', 'recruiter']}><ProfilePage /></ProtectedRoute>} />
        <Route path="/profile/cv" element={<ProtectedRoute allowedRoles={['candidate']}><ProfileCV /></ProtectedRoute>} />
        <Route path="/profile/applications" element={<ProtectedRoute allowedRoles={['candidate']}><ProfileApplications /></ProtectedRoute>} />
        <Route path="/recruiter/jobs" element={<ProtectedRoute allowedRoles={['recruiter']}><RecruiterJobs /></ProtectedRoute>} />
        <Route path="/recruiter/jobs/:id" element={<ProtectedRoute allowedRoles={['recruiter']}><RecruiterJobDetail /></ProtectedRoute>} />
        <Route path="/recruiter/jobs/:id/edit" element={<ProtectedRoute allowedRoles={['recruiter']}><RecruiterEditJob /></ProtectedRoute>} />
        <Route path="/recruiter/jobs/:id/candidates" element={<ProtectedRoute allowedRoles={['recruiter']}><RecruiterJobCandidates /></ProtectedRoute>} />
        <Route path="/recruiter/post-job" element={<ProtectedRoute allowedRoles={['recruiter']}><RecruiterPostJob /></ProtectedRoute>} />
        <Route path="/recruiter/interviews" element={<ProtectedRoute allowedRoles={['recruiter']}><RecruiterInterviews /></ProtectedRoute>} />
        <Route path="/recruiter/dashboard" element={<ProtectedRoute allowedRoles={['recruiter']}><RecruiterDashboard /></ProtectedRoute>} />
        <Route path="/recruiter/profile" element={<ProtectedRoute allowedRoles={['recruiter']}><RecruiterProfile /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/candidates" element={<ProtectedRoute allowedRoles={['admin']}><AdminCandidates /></ProtectedRoute>} />
        <Route path="/admin/recruiters" element={<ProtectedRoute allowedRoles={['admin']}><AdminRecruiters /></ProtectedRoute>} />
        <Route path="/admin/jobs" element={<ProtectedRoute allowedRoles={['admin']}><AdminJobs /></ProtectedRoute>} />
        <Route path="*" element={<div className="p-8">404 - Không tìm thấy trang</div>} />
      </Routes>
    </Router>
  );
}

export default App;
