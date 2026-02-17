import api from './index';

export const pinsApi = {
  getAll: (userId?: string) => {
    if (userId) {
      return api.get(`/pins/public/${encodeURIComponent(userId)}`);
    }
    return api.get('/pins');
  },
  create: (data: any) => api.post('/pins', data),
  update: (id: number | string, data: any) => api.patch(`/pins/${id}`, data),
  delete: (id: number | string) => api.delete(`/pins/${id}`),
};