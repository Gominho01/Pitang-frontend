import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SubmitButton from '../../components/AppointmentForm/SubmitButton';

it('should render SubmitButton and clicks', () => {
  const handleSubmit = jest.fn();
  
  render(<form onSubmit={handleSubmit}><SubmitButton /></form>);
  
  const button = screen.getByRole('button', { name: /agendar/i });
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(handleSubmit).toHaveBeenCalled();
});
