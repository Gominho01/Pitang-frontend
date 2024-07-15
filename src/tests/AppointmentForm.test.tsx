import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import AppointmentForm from '../pages/AppointmentFormPage';
import api from '../services/api';
import { customRender } from '../utils/customRender';

jest.mock('../services/api');
const mockedApi = api as jest.Mocked<typeof api>;

export const fillAndSubmitForm = (inputName: HTMLElement, inputBirthDate: HTMLElement, inputAppointmentDate: HTMLElement, submitButton: HTMLElement) => {
  fireEvent.change(inputName, { target: { value: 'Leandro Junior' } });
  fireEvent.change(inputBirthDate, { target: { value: '2000-02-02' } });
  fireEvent.change(inputAppointmentDate, { target: { value: '2025-07-10T16:00:00.000Z' } });
  fireEvent.click(submitButton);
};

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

  it('should fail to submit appointment', async () => {
    mockedApi.post.mockRejectedValue(new Error('Erro ao Criar Agendamento'));
    customRender(<AppointmentForm />);

    const inputName = screen.getByLabelText('Nome:');
    const inputBirthDate = screen.getByLabelText('Data de Nascimento:');
    const inputAppointmentDate = screen.getByLabelText('Data e Hora do Agendamento:');
    const submitButton = screen.getByRole('button', { name: /Agendar/i });

    fillAndSubmitForm(inputName, inputBirthDate, inputAppointmentDate, submitButton);
    fillAndSubmitForm(inputName, inputBirthDate, inputAppointmentDate, submitButton);
    fillAndSubmitForm(inputName, inputBirthDate, inputAppointmentDate, submitButton);

    const messageError = await screen.findByText(/Erro ao Criar Agendamento/i);
    expect(messageError).toBeInTheDocument();
  });
});
