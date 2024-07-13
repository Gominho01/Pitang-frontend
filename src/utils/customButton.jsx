import React from 'react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CustomButton = ({ to, children }) => (
  <Button 
    as={Link} 
    to={to} 
    backgroundColor="green.400" 
    color="white" 
    _hover={{ backgroundColor: 'green.300' }} 
    borderRadius="20px"
  >
    {children}
  </Button>
);

export default CustomButton;