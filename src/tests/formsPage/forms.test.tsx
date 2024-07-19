import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import AppointmentForm from '../../pages/formsPage';
import { customRender } from '../../utils/customRender';
import { fillAndSubmitForm } from '../../utils/testUtils';
import { createAppointment } from '../../services/api';

jest.mock('../../services/api');
const mockedCreateAppointment = createAppointment as jest.Mock;

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

  it('should submit appointment form successfully', async () => {
    customRender(<AppointmentForm />);

    const inputName = screen.getByLabelText('Nome:');
    const inputBirthDate = screen.getByLabelText('Data de Nascimento:');
    const inputAppointmentDay = screen.getByLabelText('Data e Hora do Agendamento:');
    const submitButton = screen.getByRole('button', { name: /Agendar/i });

    fillAndSubmitForm(inputName, inputBirthDate, inputAppointmentDay, submitButton);

    const messageSuccess = await screen.findByText(/Agendamento Criado com Sucesso/i);
    expect(messageSuccess).toBeInTheDocument();
  });

  it('should handle submission error', async () => {
    mockedCreateAppointment.mockRejectedValueOnce({
      response: { data: { error: 'Erro ao criar o agendamento' } }
    });

    customRender(<AppointmentForm />);

    const inputName = screen.getByLabelText('Nome:');
    const inputBirthDate = screen.getByLabelText('Data de Nascimento:');
    const inputAppointmentDay = screen.getByLabelText('Data e Hora do Agendamento:');
    const submitButton = screen.getByRole('button', { name: /Agendar/i });
    fillAndSubmitForm(inputName, inputBirthDate, inputAppointmentDay, submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Erro ao criar o agendamento');
    });
  });
});