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

export const fetchAppointments = async () => {
  try {
    const response = await api.get('/appointments');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments', error);
    throw error;
  }
};