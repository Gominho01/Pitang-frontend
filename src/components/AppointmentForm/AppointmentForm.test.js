import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import AppointmentForm from './AppointmentForm';
import axios from 'axios';
import { customRender } from '../../utils/customRender';

jest.mock('axios');

describe('<AppointmentForm/>', () => {
  it('should render correctly and show title', async () => {
    customRender(<AppointmentForm />);
    expect(screen.getByRole('heading', { name: /Agendamento/i })).toBeInTheDocument();
  });

  it('should handle forms error', async () => {
    customRender(<AppointmentForm />);

    const submitButton = screen.getByRole('button', { name: /Agendar/i });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByTestId('name-error')).toHaveTextContent('Nome é obrigatório');
      expect(screen.getByTestId('birthDate-error')).toHaveTextContent('Required');
      expect(screen.getByTestId('appointmentDay-error')).toHaveTextContent('Required');
    });
  });

  it('should submit appointment form successfully and display modal', async () => {
    customRender(<AppointmentForm />);

    const inputName = screen.getByLabelText('Nome:');
    const inputBirthDate = screen.getByLabelText('Data de Nascimento:');
    const inputAppointmentDay = screen.getByLabelText('Data e Hora do Agendamento:');
    const submitButton = screen.getByRole('button', { name: /Agendar/i });

    fireEvent.change(inputName, { target: { value: 'Leandro Junior' } });
    fireEvent.change(inputBirthDate, { target: { value: '2000-01-01' } });
    fireEvent.change(inputAppointmentDay, { target: { value: '2025-07-10T10:00:00.000Z' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(inputName.value).toBe('');
      expect(inputBirthDate.value).toBe('');
      expect(inputAppointmentDay.value).toBe('');
    });
  });
});