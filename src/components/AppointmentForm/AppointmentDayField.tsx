import React from 'react';
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AppointmentDayFieldProps } from '../../interfaces/Forms.interfaces';

const AppointmentDayField: React.FC<AppointmentDayFieldProps> = ({ setValue, watch, errors }) => {
  const watchAppointmentDay = watch('appointmentDay');

  const removeMilliseconds = (date: Date): Date => {
    date.setMilliseconds(0);
    return date;
  };

  return (
    <FormControl>
      <FormLabel htmlFor="appointmentDay" color="teal.700">Data e Hora do Agendamento:</FormLabel>
      <DatePicker
        id="appointmentDay"
        selected={watchAppointmentDay || null}
        onChange={(date) => {
          if (date) {
            setValue('appointmentDay', removeMilliseconds(date));
          }
        }}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={60}
        timeCaption="Hora"
        dateFormat="dd/MM/yyyy HH:mm"
        minDate={new Date()}
        minTime={new Date(new Date().setHours(11, 0, 0, 0))}
        maxTime={new Date(new Date().setHours(20, 0))}
        customInput={<Input borderColor="teal.400" focusBorderColor="teal.600" />}
      />
      {errors.appointmentDay && <Text data-testid="appointmentDay-error" color="red.500" mt={1}>{errors.appointmentDay.message}</Text>}
    </FormControl>
  );
};

export default AppointmentDayField;
