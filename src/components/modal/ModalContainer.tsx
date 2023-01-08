import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

let modalRoot = document.querySelector('#modal-root') as HTMLElement;

type ModalProps = {
  children: ReactNode;
};

function ModalContainer({ children }: ModalProps) {
  if (!modalRoot) modalRoot = document.createElement('div');
  modalRoot.id = 'modal-root';

  return createPortal(children, modalRoot);
}

export default ModalContainer;
