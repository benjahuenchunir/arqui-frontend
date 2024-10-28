import React from 'react';
import { useModal } from './ModalContext.tsx';
import './Modal.scss';

const Modal: React.FC = () => {
  const { modalVisible, modalMessage, modalType, hideModal } = useModal();

  if (!modalVisible) return null;

  return (
    <div className={`modal ${modalType}`}>
      <div className="modal-content">
        <span className="close" onClick={hideModal}>&times;</span>
        <p>{modalMessage}</p>
      </div>
    </div>
  );
};

export default Modal;