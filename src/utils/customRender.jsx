import { render } from '@testing-library/react';
import { ModalProvider } from '../context/modalContext';

export const customRender = (ui) => render(ui, { wrapper: ModalProvider });

export * from '@testing-library/react';