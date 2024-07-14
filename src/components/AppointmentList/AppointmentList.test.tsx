import React from 'react';
import { screen, waitFor, act, fireEvent } from '@testing-library/react';
import axios from 'axios';
import AppointmentsList from './AppointmentList';
import { customRender } from '../../utils/customRender';

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
    (axios.get as jest.Mock).mockResolvedValue({ data: mockAppointments });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render appointments correctly', async () => {
    await act(async () => {
      customRender(<AppointmentsList />);
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

  it('should toggle appointment status', async () => {
    await act(async () => {
      customRender(<AppointmentsList />);
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

  it('should edit and saves appointment conclusion', async () => {
    await act(async () => {
      customRender(<AppointmentsList />);
    });

    const conclusionInput = await screen.findByRole('textbox', { name: /conclusão/i });
    await act(async () => {
      fireEvent.change(conclusionInput, { target: { value: 'Consulta concluída com sucesso' } });
    });

    const saveButton = screen.getByText('Salvar');
    await act(async () => {
      fireEvent.click(saveButton);
    });

    expect(screen.getByDisplayValue('Consulta concluída com sucesso')).toBeInTheDocument();
  });
})