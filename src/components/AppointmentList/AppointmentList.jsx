import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, VStack, Text } from '@chakra-ui/react';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/appointments');
        setAppointments(response.data); 
      } catch (error) {
        console.error('Error fetching appointments', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <Box maxW="720px" mx="auto" mt={40} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={8}>Lista de Agendamentos</Heading>
      <VStack spacing={4} align="stretch">
        {appointments.length === 0 ? (
          <Text>Nenhum agendamento encontrado.</Text>
        ) : (
          appointments.map((appointment, index) => (
            <Box key={index} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
              <Text fontWeight="bold">Nome: {appointment.name}</Text>
              <Text>Data de Nascimento: {new Date(appointment.birthDate).toLocaleDateString()}</Text>
              <Text>Data e Hora do Agendamento: {new Date(appointment.appointmentDate).toLocaleString()}</Text>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default AppointmentsPage;