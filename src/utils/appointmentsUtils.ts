import { Appointment, GroupedAppointments } from '../interfaces/list.interface';

export const getAllDatesWithAppointments = (appointments: Appointment[]): string[] => {
  const datesSet = new Set<string>();
  appointments.forEach(appointment => {
    const appointmentDate = new Date(appointment.appointmentDate);
    if (isValidDate(appointmentDate)) {
      datesSet.add(appointmentDate.toLocaleDateString());
    }
  });

  const sortedDates = Array.from(datesSet).sort((a, b) => {
    const dateA = new Date(a.split('/').reverse().join('-'));
    const dateB = new Date(b.split('/').reverse().join('-')); 
    return dateA.getTime() - dateB.getTime();
  });

  return sortedDates;
};

export const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

export const groupedAppointmentsByDateTime = (appointments: Appointment[], selectedDate: string | null): GroupedAppointments => {
  const groupedAppointments: GroupedAppointments = {};

  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(a.appointmentDate);
    const dateB = new Date(b.appointmentDate);
    return dateA.getTime() - dateB.getTime();
  });

  sortedAppointments.forEach((appointment) => {
    const appointmentDate = new Date(appointment.appointmentDate);
    if (!isValidDate(appointmentDate)) {
      console.warn(`Invalid date found: ${appointment.appointmentDate}`);
      return;
    }

    const day = appointmentDate.toLocaleDateString();
    const time = appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (selectedDate && day !== selectedDate) {
      return;
    }

    if (!groupedAppointments[day]) {
      groupedAppointments[day] = {};
    }

    if (!groupedAppointments[day][time]) {
      groupedAppointments[day][time] = [];
    }

    groupedAppointments[day][time].push(appointment);
  });

  return groupedAppointments;
};

export const removeMilliseconds = (date: Date): Date => {
  date.setMilliseconds(0);
  return date;
};