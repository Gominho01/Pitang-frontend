import React, { ReactNode } from 'react';

export interface ModalProviderProps {
	children: ReactNode;
}

  
export interface ModalContextProps {
	showModal: boolean;
	modalContent: string | null;
	color: string;
	openModal: (content: string, color?: string) => void;
	closeModal: () => void;
}
  