import React from 'react';
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AppointmentDayFieldProps } from '../../interfaces/Forms.interfaces';
import { removeMilliseconds } from '../../utils/appointmentsUtils';
import dayjs from 'dayjs';

const AppointmentDayField: React.FC<AppointmentDayFieldProps> = ({ setValue, watch, errors }) => {
  const watchAppointmentDay = watch('appointmentDay');

  const isDisabledTime = (time: Date) => {
    const currentHour = dayjs().hour();
    const selectedHour = dayjs(time).hour();
    const currentMinute = dayjs().minute();
    const selectedMinute = dayjs(time).minute();

    if (dayjs().isSame(watchAppointmentDay, 'day') && selectedHour === currentHour && selectedMinute <= currentMinute) {
      return false;
    }

    return selectedHour < 11 || selectedHour > 20 || (dayjs().isSame(watchAppointmentDay, 'day') && selectedHour < currentHour);
  };

  const filterTime = (time: Date) => {
    return !isDisabledTime(time);
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
        filterTime={filterTime}
        customInput={<Input borderColor="teal.400" focusBorderColor="teal.600" />}
      />
      {errors.appointmentDay && <Text data-testid="appointmentDay-error" color="red.500" mt={1}>{errors.appointmentDay.message}</Text>}
    </FormControl>
  );
};

export default AppointmentDayField;
