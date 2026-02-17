import api from './index';

export const categoriesApi = {
  getAll: () => api.get('/categories'),
  create: (data:any) => api.post('/categories', data),
  update: (id:any, data:any) => api.patch(`/categories/${id}`, data),
  delete: (id:any) => api.delete(`/categories/${id}`),
};