import React from 'react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CustomButtonProps } from '../interfaces/utils.interfaces'

const CustomButton: React.FC<CustomButtonProps> = ({ to, children }) => {
  return (
    <Button as={Link} to={to} backgroundColor="green.400" color="white" 
    _hover={{ backgroundColor: 'green.300' }} 
    borderRadius="20px">
      {children}
    </Button>
  );
};

export default CustomButton;