import { useContext } from 'react';
import { ModalContext } from '../context/modalContext';
import { ModalContextProps } from '../interfaces/modal.interface';

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
