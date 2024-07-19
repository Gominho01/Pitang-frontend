import React, { useState } from 'react';
import { VStack, Box, Heading } from '@chakra-ui/react';
import { useModal } from '../hooks/useModal';
import { useFormHooks } from '../hooks/useForms';
import NameField from '../components/AppointmentForm/NameField';
import BirthDateField from '../components/AppointmentForm/BirthDateField';
import AppointmentDayField from '../components/AppointmentForm/AppointmentDayField';
import SubmitButton from '../components/AppointmentForm/SubmitButton';
import { FormData } from '../interfaces/Forms.interfaces';
import { createAppointment } from '../services/api';

const AppointmentFormPage: React.FC = () => {
  const { register, handleSubmit, errors, setValue, watch, reset } = useFormHooks();
  const { openModal } = useModal();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      await createAppointment(data);
      openModal('Agendamento Criado com Sucesso', '#4BB543');
      setError(null);
      reset();
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao criar o agendamento';
      setError(errorMessage);
      openModal(errorMessage, '#FC100D');
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
      {error && <div data-testid="error-message">{error}</div>}
    </Box>
  );
};

export default AppointmentFormPage;
