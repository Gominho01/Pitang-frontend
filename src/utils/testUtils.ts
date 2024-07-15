import { fireEvent } from '@testing-library/react';

export const mockAppointments = [
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
    appointmentDate: '2024-07-09T15:00:00.000Z',
    completed: true,
    conclusion: 'Consulta realizada com sucesso.',
  },
  ];

export const fillAndSubmitForm = (inputName: HTMLElement, inputBirthDate: HTMLElement, inputAppointmentDate: HTMLElement, submitButton: HTMLElement) => {
  fireEvent.change(inputName, { target: { value: 'Leandro Junior' } });
  fireEvent.change(inputBirthDate, { target: { value: '2000-02-02' } });
  fireEvent.change(inputAppointmentDate, { target: { value: '2025-07-10T16:00:00.000Z' } });
  fireEvent.click(submitButton);
};
  