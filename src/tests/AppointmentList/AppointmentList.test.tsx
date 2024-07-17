import { fetchAppointments } from '../../services/api';
import React from 'react';
import { screen, waitFor, act, fireEvent } from '@testing-library/react';
import AppointmentsList from '../../pages/AppointmentListPage';
import { customRender } from '../../utils/customRender';
import { mockAppointments } from '../../utils/testUtils';

jest.mock('../services/api');

describe('AppointmentsList', () => {
  beforeEach(() => {
    (fetchAppointments as jest.Mock).mockResolvedValue(mockAppointments);
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
      expect(screen.getByText('11:00')).toBeInTheDocument();
      expect(screen.getByText('Nome: Lucas Gominho')).toBeInTheDocument();
      expect(screen.getByText('12:00')).toBeInTheDocument();
      expect(screen.getByText('Nome: Maria Silva')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Consulta realizada com sucesso.')).toBeInTheDocument();
    });
    const dateElements = screen.getAllByText('08/07/2024');
    expect(dateElements.length).toBeGreaterThan(0);
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

  it('should edit and save appointment conclusion', async () => {
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

  it('should filter appointments by date', async () => {
    await act(async () => {
      customRender(<AppointmentsList />);
    });

    const dateDropdown = screen.getByRole('combobox');
    await act(async () => {
      fireEvent.change(dateDropdown, { target: { value: '08/07/2024' } });
    });

    await waitFor(() => {
      expect(screen.getByText('11:00')).toBeInTheDocument();
      expect(screen.getByText('Nome: Lucas Gominho')).toBeInTheDocument();
      expect(screen.queryByText('12:00')).not.toBeInTheDocument();
      expect(screen.queryByText('Nome: Maria Silva')).not.toBeInTheDocument(); 
      expect(screen.queryByText('Consulta realizada com sucesso.')).not.toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(dateDropdown, { target: { value: '09/07/2024' } });
    });

    await waitFor(() => {
      expect(screen.queryByText('11:00')).not.toBeInTheDocument();
      expect(screen.queryByText('Nome: Lucas Gominho')).not.toBeInTheDocument();
      expect(screen.getByText('12:00')).toBeInTheDocument();
      expect(screen.getByText('Nome: Maria Silva')).toBeInTheDocument(); 
      expect(screen.queryByDisplayValue('Consulta realizada com sucesso.')).toBeInTheDocument();
    });

  });
});
