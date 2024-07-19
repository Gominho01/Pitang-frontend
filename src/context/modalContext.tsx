import React, { createContext, useState, ReactNode } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from '@chakra-ui/react';
import { ModalContextProps } from '../interfaces/modal.interface';

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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