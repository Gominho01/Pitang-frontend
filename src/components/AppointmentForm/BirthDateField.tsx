import React from 'react';
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BirthDateFieldProps } from '../../interfaces/Forms.interfaces';
import { removeMilliseconds } from '../../utils/appointmentsUtils';

const BirthDateField: React.FC<BirthDateFieldProps> = ({ setValue, watch, errors }) => {
  const watchBirthDate = watch('birthDate');

  return (
    <FormControl>
      <FormLabel htmlFor="birthDate" color="teal.700">Data de Nascimento:</FormLabel>
      <DatePicker
        id="birthDate"
        selected={watchBirthDate || null}
        onChange={(date) => {
          if (date) {
            setValue('birthDate', removeMilliseconds(date));
          }
        }}
        dateFormat="dd/MM/yyyy"
        maxDate={new Date()}
        customInput={<Input borderColor="teal.400" focusBorderColor="teal.600" />}
      />
      {errors.birthDate && <Text data-testid="birthDate-error" color="red.500" mt={1}>{errors.birthDate.message}</Text>}
    </FormControl>
  );
};

export default BirthDateField;
