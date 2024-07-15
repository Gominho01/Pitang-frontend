import { Appointment } from '../interfaces/List.interfaces';

export const getAllDatesWithAppointments = (appointments: Appointment[]): string[] => {
  const datesSet = new Set<string>();
  appointments.forEach(appointment => {
    const appointmentDate = new Date(appointment.appointmentDate);
    if (isValidDate(appointmentDate)) {
      datesSet.add(appointmentDate.toLocaleDateString());
    }
  });
  return Array.from(datesSet);
};

const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};
