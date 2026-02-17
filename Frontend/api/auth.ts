import api from './index';

export const authApi = {
  register: (data:any) => api.post('/auth/register', data),
  login: (credentials:any) => api.post('/auth/login', credentials),
  forgotPassword: (email:any) => api.post('/auth/forgot-password', { email }),
  verifyOtp: (email:any, otp:any) => api.post('/auth/verify-otp', { email, otp }),
  resetPassword: (data:any) => api.post('/auth/reset-password', data),
};