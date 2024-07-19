import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default api;

export const updateAppointment = async (id: number, completed: boolean, conclusion: string) => {
  return api.patch(`/appointments/${id}`, { completed, conclusion });
};

export const fetchAppointments = async () => {
  const response = await api.get('/appointments');
  return response.data;
};

export const createAppointment = async (data: any) => {
  return api.post('/appointments', data);
};