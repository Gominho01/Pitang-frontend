import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useDisclosure } from '@chakra-ui/react';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  birthDate: z.date(),
  appointmentDate: z.date(),
});

const AppointmentForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(schema),
  });
  const { onOpen } = useDisclosure();

  const watchBirthDate = watch('birthDate');
  const watchAppointmentDate = watch('appointmentDate');

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3000/api/appointments', data);
      onOpen();
    } catch (error) {
      console.error('Error creating appointment', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nome:</label>
        <input {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Data de Nascimento:</label>
        <DatePicker
          selected={watchBirthDate || null}
          onChange={(date) => setValue('birthDate', date)}
          dateFormat="dd/MM/yyyy"
        />
        {errors.birthDate && <p>{errors.birthDate.message}</p>}
      </div>
      <div>
        <label>Data e Hora do Agendamento:</label>
        <DatePicker
          selected={watchAppointmentDate || null}
          onChange={(date) => setValue('appointmentDate', date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={60}
          timeCaption="Hora"
          dateFormat="dd/MM/yyyy HH:mm"
          minDate={new Date()}
          minTime={new Date(new Date().setHours(11, 0, 0, 0))}
          maxTime={new Date(new Date().setHours(20, 0))}
        />
        {errors.appointmentDate && <p>{errors.appointmentDate.message}</p>}
      </div>
      <button type="submit">Agendar</button>
    </form>
  );
};

export default AppointmentForm;