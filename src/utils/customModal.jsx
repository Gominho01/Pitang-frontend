import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';

const CustomModal = ({ isOpen, onClose, title, body, error }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {error ? (
            <>
              <p>{error}</p>
              <p>Tente novamente mais tarde.</p>
            </>
          ) : (
            <>{body}</>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;