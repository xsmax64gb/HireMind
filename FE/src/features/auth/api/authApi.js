import apiClient from '@/services/apiClient';

export const loginApi = async (credentials) => {
  // Thay thế endpoint này bằng endpoint thực tế của backend
  return apiClient.post('/auth/login', credentials);
};

export const registerApi = async (data) => {
  return apiClient.post('/auth/register', data);
};
