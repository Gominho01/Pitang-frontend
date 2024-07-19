import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppointmentDayField from '../../components/AppointmentForm/AppointmentDayField';
import { useForm } from 'react-hook-form';
import { FormData } from '../../interfaces/Forms.interfaces';
import { customRender } from '../../utils/customRender';

const Wrapper = () => {
  const { setValue, watch, formState: { errors } } = useForm<FormData>();
  return <AppointmentDayField setValue={setValue} watch={watch} errors={errors} />;
};

it('should render AppointmentDayField and changes date', () => {
  customRender(<Wrapper />);
  
  const datePicker = screen.getByLabelText('Data e Hora do Agendamento:') as HTMLInputElement; 
  expect(datePicker).toBeInTheDocument();

  fireEvent.change(datePicker, { target: { value: '2023-08-19T12:00' } });
  expect(datePicker.value).toBe('2023-08-19T12:00');
});
