import React from 'react';
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AppointmentDayFieldProps } from '../../interfaces/Forms.interfaces';
import { removeMilliseconds } from '../../utils/appointmentsUtils';
import dayjs from 'dayjs';
import { useModal } from '../../hooks/useModal';

const AppointmentDayField: React.FC<AppointmentDayFieldProps> = ({ setValue, watch, errors }) => {
  const watchAppointmentDay = watch('appointmentDay');
  const { openModal } = useModal();

  const isDisabledTime = (time: Date) => {
    const currentHour = dayjs().hour();
    const selectedHour = dayjs(time).hour();
    const currentMinute = dayjs().minute();
    const selectedMinute = dayjs(time).minute();

    if (dayjs().isSame(watchAppointmentDay, 'day') && selectedHour === currentHour && selectedMinute <= currentMinute) {
      return false;
    }

    return selectedHour < 9 || selectedHour > 20 || (dayjs().isSame(watchAppointmentDay, 'day') && selectedHour < currentHour);
  };

  const filterTime = (time: Date) => {
    return !isDisabledTime(time);
  };

  const handleChange = (date: Date | null) => {
    if (date) {
      const selectedDate = dayjs(date);
      const currentDateTime = dayjs();

      if (selectedDate.hour() < 9 || selectedDate.hour() > 20 ){
        openModal('Horário inválido', '#FC100D');
        return;
      }
      if (
        dayjs().isSame(selectedDate, 'day') &&
        selectedDate.hour() < currentDateTime.hour()
      ) {
        const nextValidDate = (currentDateTime.hour() > 20 ? currentDateTime.add(1, 'day').hour(9).minute(0) : currentDateTime.hour(20).minute(0).second(0)).toDate();
        setValue('appointmentDay', removeMilliseconds(nextValidDate));
        if (selectedDate.hour() !== 9) {
          openModal('Esse horário não está disponível', '#FC100D');
        }
        date = nextValidDate
      }
      setValue('appointmentDay', removeMilliseconds(date));
    }
  };

  return (
    <FormControl>
      <FormLabel htmlFor="appointmentDay" color="teal.700">Data e Hora do Agendamento:</FormLabel>
      <DatePicker
        id="appointmentDay"
        selected={watchAppointmentDay || null}
        onChange={handleChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={60}
        timeCaption="Hora"
        dateFormat="dd/MM/yyyy HH:mm"
        minDate={new Date()}
        minTime={new Date(new Date().setHours(9, 0, 0, 0))}
        maxTime={new Date(new Date().setHours(20, 0))}
        filterTime={filterTime}
        customInput={<Input borderColor="teal.400" focusBorderColor="teal.600" />}
      />
      {errors.appointmentDay && <Text data-testid="appointmentDay-error" color="red.500" mt={1}>{errors.appointmentDay.message}</Text>}
    </FormControl>
  );
};

export default AppointmentDayField;