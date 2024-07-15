// src/components/AppointmentsPage/AppointmentGroup.tsx
import React from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { AppointmentGroupProps } from '../../interfaces/List.interfaces';
import AppointmentItem from './AppointmentItem';

const AppointmentGroup: React.FC<AppointmentGroupProps> = ({ day, appointments, handleCompletionToggle }) => {
  return (
    <Box mb={4}>
      <Heading size="md" textAlign="center" fontSize="2xl">{day}</Heading>
      <VStack spacing={5} align="stretch">
        {Object.keys(appointments).map((time) => (
          <Box key={time} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
            <Heading size="sm">{time}</Heading>
            {appointments[time].map((appointment) => (
              <AppointmentItem
                key={appointment.id}
                appointment={appointment}
                handleCompletionToggle={handleCompletionToggle}
              />
            ))}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default AppointmentGroup;
