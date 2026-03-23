import apiClient from '../../../services/apiClient';

export const userApi = {
  getProfile: () => {
    return apiClient.get('/users/profile');
  },
  
  updateProfile: (data) => {
    return apiClient.put('/users/profile', data);
  },

  changePassword: (data) => {
    return apiClient.put('/users/change-password', data);
  }
};
