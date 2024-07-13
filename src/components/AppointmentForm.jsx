import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useDisclosure } from '@chakra-ui/react';
import CustomModal from '../utils/customModal';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  birthDate: z.date(),
  appointmentDay: z.date(),
});

const AppointmentForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(schema),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState(null);

  const watchBirthDate = watch('birthDate');
  const watchappointmentDay = watch('appointmentDay');

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3000/api/appointments', data);
      onOpen(); 
      setError(null); 
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'Erro ao criar o agendamento');
      } else {
        setError('Ocorreu um erro, tente novamente mais tarde');
      }
      console.error('Error creating appointment', error);
      onOpen();
    }
  };

  return (
    <div>
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
            selected={watchappointmentDay || null}
            onChange={(date) => setValue('appointmentDay', date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            timeCaption="Hora"
            dateFormat="dd/MM/yyyy HH:mm"
            minDate={new Date()}
            minTime={new Date(new Date().setHours(11, 0, 0, 0))}
            maxTime={new Date(new Date().setHours(20, 0))}
          />
          {errors.appointmentDay && <p>{errors.appointmentDay.message}</p>}
        </div>
        <button type="submit">Agendar</button>
      </form>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={error ? 'Erro ao Criar Agendamento' : 'Agendamento Criado com Sucesso'}
        body={error ? null : 'Agendamento criado com sucesso!'}
        error={error}
      />
    </div>
  );
};

export default AppointmentForm;