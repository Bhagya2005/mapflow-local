import api from './index';

export const feedbackApi = {
  getAll: () => api.get('/feedback'),
  create: (data: any) => api.post('/feedback', data),
};

