import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default api;

export const updateAppointment = async (id: number, completed: boolean, conclusion: string) => {
  try {
    await api.patch(`/appointments/${id}`, { completed, conclusion });
  } catch (error) {
    console.error('Error updating appointment status', error);
    throw error;
  }
};