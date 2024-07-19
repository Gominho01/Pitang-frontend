import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { ModalContext } from '../../context/modalContext';
import { customRender } from '../../utils/customRender';
import { ModalContextProps } from '../../interfaces/Modal.interfaces';

const TestComponent = () => {
  const { openModal, closeModal } = React.useContext(ModalContext) as ModalContextProps;
  return (
    <>
      <button onClick={() => openModal && openModal('Test Modal', '#fff')}>Open Modal</button>
      <button onClick={closeModal}>Close Modal</button>
    </>
  );
};

it('should render ModalProvider and opens/closes modal', async () => {
  customRender(<TestComponent />);

  const openButton = screen.getByText('Open Modal');
  fireEvent.click(openButton);

  expect(screen.getByText('Test Modal')).toBeInTheDocument();


  const closeButton = screen.getByText('Close Modal');
  fireEvent.click(closeButton);

  await waitFor(() => {
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });
});
