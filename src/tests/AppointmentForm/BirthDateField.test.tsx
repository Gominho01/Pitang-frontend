import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BirthDateField from '../../components/AppointmentForm/BirthDateField';
import { useForm } from 'react-hook-form';
import { FormData } from '../../interfaces/Forms.interfaces';

const Wrapper = () => {
  const { setValue, watch, formState: { errors } } = useForm<FormData>();
  return <BirthDateField setValue={setValue} watch={watch} errors={errors} />;
};

test('renders BirthDateField and changes date', async () => {
  render(<Wrapper />);
  
  const datePicker = screen.getByLabelText('Data de Nascimento:') as HTMLInputElement;
  expect(datePicker).toBeInTheDocument();

  fireEvent.change(datePicker, { target: { value: '1990/01/01' } });

  await waitFor(() => {
    expect(datePicker.value).toBe('01/01/1990');
  });

  fireEvent.change(datePicker, { target: { value: '2003/04/27' } });

  await waitFor(() => {
    expect(datePicker.value).toBe('27/04/2003');
  });
});
