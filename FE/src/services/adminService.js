import apiClient from './apiClient';

const adminService = {
  // Candidate Management
  getCandidates: (params) => apiClient.get('/admin/candidates', { params }),
  getCandidateDetail: (id) => apiClient.get(`/admin/candidates/${id}`),
  updateCandidateStatus: (id, status) => apiClient.put(`/admin/candidates/${id}/status`, { status }),
  deleteCandidate: (id) => apiClient.delete(`/admin/candidates/${id}`),

  // Recruiter Management
  getRecruiters: (params) => apiClient.get('/admin/recruiters', { params }),
  getRecruiterDetail: (id) => apiClient.get(`/admin/recruiters/${id}`),
  updateRecruiterStatus: (id, status) => apiClient.put(`/admin/recruiters/${id}/status`, { status }),
  deleteRecruiter: (id) => apiClient.delete(`/admin/recruiters/${id}`),
};

export default adminService;
