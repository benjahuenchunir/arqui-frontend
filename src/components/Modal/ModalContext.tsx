import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextProps {
  showModal: (message: string, type: 'success' | 'error') => void;
  hideModal: () => void;
  modalVisible: boolean;
  modalMessage: string;
  modalType: 'success' | 'error';
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');

  const showModal = (message: string, type: 'success' | 'error') => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal, modalVisible, modalMessage, modalType }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};