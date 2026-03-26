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

  getJobById: async (id) => {
    return await apiClient.get(`/jobs/${id}`);
  },

  updateJob: async (id, jobData) => {
    return await apiClient.put(`/jobs/${id}`, jobData);
  },

  deleteJob: async (id) => {
    return await apiClient.delete(`/jobs/${id}`);
  }
};

export default jobService;
