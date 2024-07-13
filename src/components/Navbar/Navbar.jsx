import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Flex, HStack, Heading} from '@chakra-ui/react';
import CustomButton from '../../utils/customButton';

const Navbar = () => {
  const location = useLocation();
  const listPage = location.pathname === '/list';

  return (
    <Box
      bgColor={"teal"}
      bgSize="cover"
      bgPosition="center"
      px={4}
    >
      <Flex h={28} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Heading size="md" color="white">Vaccine Scheduler</Heading>
        </HStack>
        <HStack as="nav" spacing={4}>
          {listPage ? (
            <CustomButton to="/">Novo Agendamento</CustomButton>
          ) : (
            <CustomButton to="/list">Ver Agendamentos</CustomButton>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;