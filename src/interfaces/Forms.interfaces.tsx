import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

export interface FormData {
  name: string;
  birthDate: Date;
  appointmentDay: Date;
}

export interface NameFieldProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export interface BirthDateFieldProps {
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
  errors: FieldErrors<FormData>;
}

export interface AppointmentDayFieldProps {
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
  errors: FieldErrors<FormData>;
}
