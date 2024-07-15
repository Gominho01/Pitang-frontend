import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, VStack, Text, Checkbox, Input, Button } from '@chakra-ui/react';
import {Appointment, GroupedAppointments} from '../../interfaces/Appointment.interfaces'

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [editedConclusions, setEditedConclusions] = useState<{ [key: number]: boolean }>({});

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
      setEditedConclusions(prev => ({ ...prev, [id]: false }));
    } catch (error) {
      console.error('Error updating appointment status', error);
    }
  };

  const handleConclusionChange = (id: number, newConclusion: string) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(app =>
        app.id === id ? { ...app, conclusion: newConclusion } : app
      )
    );
    setEditedConclusions(prev => ({ ...prev, [id]: true }));
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
          <Box key={day} mb={4}>
            <Heading size="md" textAlign="center" fontSize="2xl">{day}</Heading>
            <VStack spacing={5} align="stretch">
              {Object.keys(groupedAppointments[day]).map((time) => (
                <Box borderColor="teal.400" key={time} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
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
                      {appointment.completed && (
                        <Box mt={2}>
                          <Text>Conclusão:</Text>
                          <Input
                            id="conclusao"
                            aria-label="Conclusão"
                            value={appointment.conclusion || ''}
                            onChange={(e) => handleConclusionChange(appointment.id, e.target.value)}
                          />
                          {editedConclusions[appointment.id] && (
                            <Button
                              onClick={() => handleCompletionToggle(appointment.id, appointment.completed, appointment.conclusion)}
                              mt={2}
                            >
                              Salvar
                            </Button>
                          )}
                        </Box>
                      )}
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
