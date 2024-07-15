// src/pages/AppointmentsPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Appointment, GroupedAppointments } from '../interfaces/List.interfaces';
import AppointmentGroup from '../components/AppointmentList/AppointmentGroup';

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

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

  const handleCompletionToggle = async (id: number, completed: boolean, conclusion: string) => {
    try {
      await axios.patch(`http://localhost:3000/api/appointments/${id}`, { completed, conclusion });
      setAppointments(prevAppointments =>
        prevAppointments.map(app =>
          app.id === id ? { ...app, completed, conclusion } : app
        )
      );
    } catch (error) {
      console.error('Error updating appointment status', error);
    }
  };

  const sortedAppointments = appointments.sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());

  const groupAppointmentsByDateTime = (): GroupedAppointments => {
    const groupedAppointments: GroupedAppointments = {};

    sortedAppointments.forEach((appointment) => {
      const date = new Date(appointment.appointmentDate);
      const day = date.toLocaleDateString();
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
    <Box maxW="600px" mx="auto" mt={20} p={8} borderWidth={1} borderRadius="md" boxShadow="md" bg="gray.50" color="teal.600" borderColor="teal.400">
      <Heading mb={6} textAlign="center" fontSize="2xl">Lista de Agendamentos</Heading>
      {Object.keys(groupedAppointments).length === 0 ? (
        <Text>Nenhum agendamento encontrado.</Text>
      ) : (
        Object.keys(groupedAppointments).map((day) => (
          <AppointmentGroup
            key={day}
            day={day}
            appointments={groupedAppointments[day]}
            handleCompletionToggle={handleCompletionToggle}
          />
        ))
      )}
    </Box>
  );
};

export default AppointmentsPage;
