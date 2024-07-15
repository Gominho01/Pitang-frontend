import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VStack, Box, Heading, Text } from '@chakra-ui/react';
import { useModal } from '../context/modalContext';
import { schema } from '../schemas/Appointment.schema';
import NameField from '../components/AppointmentForm/NameField';
import BirthDateField from '../components/AppointmentForm/BirthDateField';
import AppointmentDayField from '../components/AppointmentForm/AppointmentDayField';
import SubmitButton from '../components/AppointmentForm/SubmitButton';
import api from '../services/api';

export type FormData = {
  name: string;
  birthDate: Date;
  appointmentDay: Date;
};

const AppointmentFormPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { openModal } = useModal();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await api.post('/appointments', data);
      openModal('Agendamento Criado com Sucesso', '#4BB543');
      setError(null);
      reset();
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao criar o agendamento';
      setError(errorMessage);
      openModal('Erro ao Criar Agendamento', '#FC100D');
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={20} p={8} borderWidth={1} borderRadius="md" boxShadow="md" bg="gray.50">
      <Heading mb={6} textAlign="center" fontSize="2xl" color="teal.600">Agendamento de Vacina</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={5} align="stretch">
          <NameField register={register} errors={errors} />
          <BirthDateField setValue={setValue} watch={watch} errors={errors} />
          <AppointmentDayField setValue={setValue} watch={watch} errors={errors} />
          <SubmitButton />
        </VStack>
      </form>
    </Box>
  );
};

export default AppointmentFormPage;
