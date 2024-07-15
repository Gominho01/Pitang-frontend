import React, { createContext, useContext, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from '@chakra-ui/react';
import { ModalContextProps, ModalProviderProps } from '../interfaces/Modal.interfaces';

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [color, setColor] = useState('#fff');

  const openModal = (content: string, color = '#fff') => {
    setModalContent(content);
    setColor(color);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalContent('');
    setColor('#fff');
    setShowModal(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, modalContent, color, openModal, closeModal }}>
      {children}
      <Modal isOpen={showModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent backgroundColor={color}>
          <ModalHeader>{modalContent}</ModalHeader>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </ModalContext.Provider>
  );
};