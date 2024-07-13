import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from '@chakra-ui/react';

export const ModalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [color, setColor] = useState('#fff'); 

  const openModal = (content, color = '#fff') => { 
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

export const useModal = () => {
  return useContext(ModalContext);
};