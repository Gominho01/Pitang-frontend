import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ModalProvider } from '../context/modalContext';

const AllTheProviders = ({ children }) => {
  return (
    <ChakraProvider>
      <ModalProvider>
        {children}
      </ModalProvider>
    </ChakraProvider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender };