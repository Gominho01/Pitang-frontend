import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NameField from '../../components/AppointmentForm/NameField';
import { useForm } from 'react-hook-form';
import { FormData } from '../../interfaces/Forms.interfaces';

const Wrapper = () => {
  const { register, formState: { errors } } = useForm<FormData>();
  return <NameField register={register} errors={errors} />;
};

it('should render NameField and changes input', () => {
  render(<Wrapper />);
  
  const nameInput = screen.getByLabelText('Nome:') as HTMLInputElement;
  expect(nameInput).toBeInTheDocument();

  fireEvent.change(nameInput, { target: { value: 'Lucas Gominho' } });
  expect(nameInput.value).toBe('Lucas Gominho');
});
