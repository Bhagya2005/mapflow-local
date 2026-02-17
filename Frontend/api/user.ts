import api from './index';

export const userApi = {
  getAll: () => api.get('/users'),
  delete: (id: string | number) => api.delete(`/users/${id}`),
};