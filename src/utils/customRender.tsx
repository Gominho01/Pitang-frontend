import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ModalProvider } from '../context/modalContext';
import { AllTheProvidersProps } from '../interfaces/utils.interface'

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ children }) => {
  return (
    <ChakraProvider>
      <ModalProvider>
        {children}
      </ModalProvider>
    </ChakraProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender };