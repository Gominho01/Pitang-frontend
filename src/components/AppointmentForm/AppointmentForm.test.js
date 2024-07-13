import React from 'react';
import {screen} from '@testing-library/react';
import AppointmentForm from './AppointmentForm';
import axios from 'axios';
import { customRender } from '../../utils/customRender';

jest.mock('axios');

describe('<AppointmentForm/>', () => {
  it('should render correctly and show title', async () => {
    customRender(<AppointmentForm />);
    expect(screen.getByRole('heading', { name: /Agendamento/i })).toBeInTheDocument();
  });
});