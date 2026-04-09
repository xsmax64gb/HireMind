import apiClient from './apiClient';

const jobService = {
  createJob: async (jobData) => {
    return await apiClient.post('/jobs', jobData);
  },
  
  getAllJobs: async (params) => {
    return await apiClient.get('/jobs', { params });
  },

  getRecruiterJobs: async () => {
    return await apiClient.get('/jobs/recruiter/my-jobs');
  },

  getRecruiterDashboard: async () => {
    return await apiClient.get('/jobs/recruiter/dashboard');
  },

  getJobById: async (id) => {
    return await apiClient.get(`/jobs/${id}`);
  },

  updateJob: async (id, jobData) => {
    return await apiClient.put(`/jobs/${id}`, jobData);
  },

  deleteJob: async (id) => {
    return await apiClient.delete(`/jobs/${id}`);
  },

  generateInterviewQuestions: async (id, skills = []) => {
    return await apiClient.post(`/jobs/${id}/generate-questions`, { skills });
  },

  getInterviewQuestions: async (id) => {
    return await apiClient.get(`/jobs/${id}/interview-questions`);
  },

  saveInterviewQuestions: async (id, questions) => {
    return await apiClient.post(`/jobs/${id}/interview-questions/save`, { questions });
  },

  deleteInterviewQuestion: async (questionId) => {
    return await apiClient.delete(`/jobs/interview-questions/${questionId}`);
  },

  deleteAllInterviewQuestions: async (jobId) => {
    return await apiClient.delete(`/jobs/${jobId}/interview-questions`);
  },
  
  getJobCandidates: async (jobId) => {
    return await apiClient.get(`/jobs/${jobId}/candidates`);
  },

  updateApplicationStatus: async (jobId, applicationId, status) => {
    return await apiClient.put(`/jobs/${jobId}/applications/${applicationId}/status`, { status });
  }
};

export default jobService;
