import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormData } from '../interfaces/Forms.interfaces';
import { schema } from '../schemas/Appointment.schema';

export const useFormHooks = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return { register, handleSubmit, errors, setValue, watch, reset };
};
