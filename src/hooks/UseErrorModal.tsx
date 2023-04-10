import Modal from 'components/modal/Modal';
import { useState } from 'react';

export const useErrorModal = () => {
  const [opened, setOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState('오류가 발생했습니다.');
  const [errorTitle, setErrorTitle] = useState('오류 발생!');

  const renderModal = () =>
    opened ? (
      <Modal
        onClose={() => {
          setOpened(false);
        }}
        title={errorTitle}
        contents={errorMessage}
      />
    ) : null;

  const open = () => {
    setOpened(true);
  };

  const close = () => {
    setOpened(false);
  };

  return { renderModal, setErrorMessage, setErrorTitle, open, close };
};
