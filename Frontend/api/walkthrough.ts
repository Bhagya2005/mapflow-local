import api from './index';

export const walkthroughApi = {
  getAll: () => api.get('/walkthrough'),
  create: (data: any) => api.post('/walkthrough', data),
  delete: (id: string | number) => api.delete(`/walkthrough/${id}`),
};