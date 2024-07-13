import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, VStack, Text, Checkbox } from '@chakra-ui/react';

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

  const handleCompletionToggle = async (id, completed) => {
    try {
      await axios.patch(`http://localhost:3000/api/appointments/${id}`, { completed });
      setAppointments(prevAppointments =>
        prevAppointments.map(app =>
          app.id === id ? { ...app, completed } : app
        )
      );
    } catch (error) {
      console.error('Error updating appointment status', error);
    }
  };

  const sortedAppointments = appointments.sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));

  const groupAppointmentsByDateTime = () => {
    const groupedAppointments = {};

    sortedAppointments.forEach((appointment) => {
      const date = new Date(appointment.appointmentDate);
      const day = date.toDateString(); 
      const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (!groupedAppointments[day]) {
        groupedAppointments[day] = {};
      }

      if (!groupedAppointments[day][time]) {
        groupedAppointments[day][time] = [];
      }

      groupedAppointments[day][time].push(appointment);
    });

    return groupedAppointments;
  };

  const groupedAppointments = groupAppointmentsByDateTime();

  return (
    <Box maxW="720px" mx="auto" mt={40} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={8}>Lista de Agendamentos</Heading>
      {Object.keys(groupedAppointments).length === 0 ? (
        <Text>Nenhum agendamento encontrado.</Text>
      ) : (
        Object.keys(groupedAppointments).map((day) => (
          <Box key={day} mb={4}>
            <Heading size="md">{day}</Heading>
            <VStack spacing={4} align="stretch">
              {Object.keys(groupedAppointments[day]).map((time) => (
                <Box key={time} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
                  <Heading size="sm">{time}</Heading>
                  {groupedAppointments[day][time].map((appointment) => (
                    <Box key={appointment.id} mt={2}>
                      <Text fontWeight="bold">Nome: {appointment.name}</Text>
                      <Text>Data de Nascimento: {new Date(appointment.birthDate).toLocaleDateString()}</Text>
                      <Checkbox 
                        isChecked={appointment.completed} 
                        onChange={() => handleCompletionToggle(appointment.id, !appointment.completed, appointment.conclusion)}
                      >
                        {appointment.completed ? 'Realizado' : 'Não realizado'}
                      </Checkbox>
                    </Box>
                  ))}
                </Box>
              ))}
            </VStack>
          </Box>
        ))
      )}
    </Box>
  );
};

export default AppointmentsPage;