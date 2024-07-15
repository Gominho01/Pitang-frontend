export interface Appointment {
  id: number;
  name: string;
  birthDate: string;
  appointmentDate: string;
  completed: boolean;
  conclusion: string;
}
  
export interface GroupedAppointments {
  [key: string]: {
    [key: string]: Appointment[];
  };
}
  