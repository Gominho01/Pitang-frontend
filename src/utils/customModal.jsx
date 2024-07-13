import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import { useModal } from '../context/modalContext';

const CustomModal = () => {
  const { isOpen, title, body, closeModal } = useModal();

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {body}
        </ModalBody>
        <Button mt={4} onClick={closeModal}>
          Fechar
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;