import React from 'react';
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { NameFieldProps } from '../../interfaces/forms.interface';

const NameField: React.FC<NameFieldProps> = ({ register, errors }) => (
  <FormControl>
    <FormLabel color="teal.700" htmlFor="name">Nome:</FormLabel>
    <Input id="name" {...register('name')} borderColor="teal.400" focusBorderColor="teal.600" />
    {errors.name && <Text data-testid="name-error" color="red.500" mt={1}>{errors.name.message}</Text>}
  </FormControl>
);

export default NameField;
