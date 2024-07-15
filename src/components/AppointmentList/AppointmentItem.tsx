import React, { useState } from 'react';
import { Box, Text, Checkbox, Input, Button } from '@chakra-ui/react';
import { AppointmentItemProps } from '../../interfaces/List.interfaces';
import axios from 'axios';

const AppointmentItem: React.FC<AppointmentItemProps> = ({ appointment, handleCompletionToggle }) => {
  const [editedConclusion, setEditedConclusion] = useState<string>(appointment.conclusion || '');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSave = async () => {
    await handleCompletionToggle(appointment.id, appointment.completed, editedConclusion);
    setIsEditing(false);
  };

  return (
    <Box mt={2}>
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
            value={isEditing ? editedConclusion : appointment.conclusion || ''}
            onChange={(e) => setEditedConclusion(e.target.value)}
            onFocus={() => setIsEditing(true)}
          />
          {isEditing && (
            <Button onClick={handleSave} mt={2}>
              Salvar
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AppointmentItem;
