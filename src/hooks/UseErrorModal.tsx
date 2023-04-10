import Modal from 'components/modal/Modal';
import { useState } from 'react';

interface useErrorModalProps {
  renderModal: () => JSX.Element | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setErrorTitle: React.Dispatch<React.SetStateAction<string>>;
  open: () => void;
  close: () => void;
}

/**
 * custom hook
 * @returns {object} renderModal: 모달을 렌더링하는 함수
 * @returns {object} setErrorMessage: 에러 메시지를 설정하는 함수
 * @returns {object} setErrorTitle: 에러 타이틀을 설정하는 함수
 * @returns {object} open: 모달을 열어주는 함수
 * @returns {object} close: 모달을 닫아주는 함수
 */
export const useErrorModal = (): useErrorModalProps => {
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
