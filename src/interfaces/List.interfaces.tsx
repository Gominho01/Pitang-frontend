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

export interface AppointmentItemProps {
  appointment: Appointment;
  handleCompletionToggle: (id: number, completed: boolean, conclusion: string) => void;
}

export interface AppointmentGroupProps {
  day: string;
  appointments: { [time: string]: Appointment[] };
  handleCompletionToggle: (id: number, completed: boolean, conclusion: string) => void;
}