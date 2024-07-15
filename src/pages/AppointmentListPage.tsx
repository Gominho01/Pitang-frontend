import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Select } from '@chakra-ui/react';
import { Appointment, GroupedAppointments } from '../interfaces/List.interfaces';
import AppointmentGroup from '../components/AppointmentList/AppointmentGroup';
import api from '../services/api';
import { getAllDatesWithAppointments } from '../utils/appointmentsUtils';

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value || null);
  };

  const handleCompletionToggle = async (id: number, completed: boolean, conclusion: string) => {
    try {
      await api.patch(`/appointments/${id}`, { completed, conclusion });
      setAppointments(prevAppointments =>
        prevAppointments.map(app =>
          app.id === id ? { ...app, completed, conclusion } : app
        )
      );
    } catch (error) {
      console.error('Error updating appointment status', error);
    }
  };

  const isValidDate = (date: Date): boolean => {
    return date instanceof Date && !isNaN(date.getTime());
  };

  const groupedAppointmentsByDateTime = (): GroupedAppointments => {
    const groupedAppointments: GroupedAppointments = {};

    const sortedAppointments = [...appointments].sort((a, b) => {
      const dateA = new Date(a.appointmentDate);
      const dateB = new Date(b.appointmentDate);
      return dateA.getTime() - dateB.getTime();
    });

    sortedAppointments.forEach((appointment) => {
      const appointmentDate = new Date(appointment.appointmentDate);
      if (!isValidDate(appointmentDate)) {
        console.warn(`Invalid date found: ${appointment.appointmentDate}`);
        return;
      }

      const day = appointmentDate.toLocaleDateString();
      const time = appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (selectedDate && day !== selectedDate) {
        return;
      }

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

  const groupedAppointments = groupedAppointmentsByDateTime();
  const allDatesWithAppointments = getAllDatesWithAppointments(appointments);

  return (
    <Box maxW="600px" mx="auto" mt={20} p={8} borderWidth={1} borderRadius="md" boxShadow="md" bg="gray.50" color="teal.600" borderColor="teal.400">
      <Heading mb={6} textAlign="center" fontSize="2xl">Lista de Agendamentos</Heading>
      <Box mb={4} textAlign="center">
        <Text>Filtrar por Data:</Text>
        <Select value={selectedDate || ''} onChange={handleDateChange} placeholder="Selecione uma data">
          {allDatesWithAppointments.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </Select>
      </Box>
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
