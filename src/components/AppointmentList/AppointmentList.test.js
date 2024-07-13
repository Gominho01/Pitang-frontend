import React from 'react';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import axios from 'axios';
import AppointmentsList from './AppointmentList';
import { ChakraProvider } from '@chakra-ui/react';

jest.mock('axios');

const mockAppointments = [
  {
    id: '1',
    name: 'Lucas Gominho',
    birthDate: '2003-04-27T03:00:00.000Z',
    appointmentDate: '2024-07-08T14:00:00.000Z',
    completed: false,
    conclusion: '',
  },
  {
    id: '2',
    name: 'Maria Silva',
    birthDate: '1990-01-01T03:00:00.000Z',
    appointmentDate: '2024-07-08T15:00:00.000Z',
    completed: true,
    conclusion: 'Consulta realizada com sucesso.',
  },
];

describe('AppointmentsList', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockAppointments });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render appointments correctly', async () => {
    await act(async () => {
      render(
        <ChakraProvider>
          <AppointmentsList />
        </ChakraProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Lista de Agendamentos')).toBeInTheDocument();
      expect(screen.getByText('08/07/2024')).toBeInTheDocument();
      expect(screen.getByText('11:00')).toBeInTheDocument();
      expect(screen.getByText('Nome: Lucas Gominho')).toBeInTheDocument();
      expect(screen.getByText('12:00')).toBeInTheDocument();
      expect(screen.getByText('Nome: Maria Silva')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Consulta realizada com sucesso.')).toBeInTheDocument();
    });
  });

  it('toggles appointment status', async () => {
    await act(async () => {
      render(
        <ChakraProvider>
          <AppointmentsList />
        </ChakraProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByLabelText('Não realizado')).toBeInTheDocument();
    });

    const checkbox = screen.getByLabelText('Não realizado');

    await act(async () => {
      fireEvent.click(checkbox);
    });

    await waitFor(() => {
      const updatedCheckboxes = screen.getAllByLabelText('Realizado');
      expect(updatedCheckboxes.length).toBeGreaterThan(0);
      expect(screen.queryByLabelText('Não realizado')).not.toBeInTheDocument();
    });
  });
});