import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useDisclosure, Button, FormControl, FormLabel, Input, VStack, Box, Heading, Text } from '@chakra-ui/react';
import { useModal } from '../context/modalContext';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  birthDate: z.date().refine(date => {
    const today = new Date();
    return date <= today;
  }, {
    message: 'A data de nascimento deve ser anterior ou igual à data atual'
  }),
  appointmentDay: z.date(),
});

const AppointmentForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(schema),
  });
  const { openModal } = useModal()
  const [error, setError] = useState(null);

  const watchBirthDate = watch('birthDate');
  const watchappointmentDay = watch('appointmentDay');

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3000/api/appointments', data);
      openModal('Agendamento Criado com Sucesso', '#4BB543');
      setError(null);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Erro ao criar o agendamento';
      setError(errorMessage);
      console.error('Error creating appointment', error);
      openModal('Erro ao Criar Agendamento', '#FC100D');
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={20} p={8} borderWidth={1} borderRadius="md" boxShadow="md" bg="gray.50">
      <Heading mb={6} textAlign="center" fontSize="2xl" color="teal.600">Agendamento de Vacina</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={5} align="stretch">
          <FormControl>
            <FormLabel color="teal.700">Nome:</FormLabel>
            <Input {...register('name')} borderColor="teal.400" focusBorderColor="teal.600" />
            {errors.name && <Text color="red.500" mt={1}>{errors.name.message}</Text>}
          </FormControl>
          <FormControl>
            <FormLabel color="teal.700">Data de Nascimento:</FormLabel>
            <DatePicker
              selected={watchBirthDate || null}
              onChange={(date) => setValue('birthDate', date)}
              dateFormat="dd/MM/yyyy"
              maxDate={new Date()}
              customInput={<Input borderColor="teal.400" focusBorderColor="teal.600" />}
            />
            {errors.birthDate && <Text color="red.500" mt={1}>{errors.birthDate.message}</Text>}
          </FormControl>
          <FormControl>
            <FormLabel color="teal.700">Data e Hora do Agendamento:</FormLabel>
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
              customInput={<Input borderColor="teal.400" focusBorderColor="teal.600" />}
            />
            {errors.appointmentDay && <Text color="red.500" mt={1}>{errors.appointmentDay.message}</Text>}
          </FormControl>
          <Button mt={4} colorScheme="teal" size="lg" type="submit" width="full">
            Agendar
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AppointmentForm;
