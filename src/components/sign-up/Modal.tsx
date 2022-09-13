import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  children: React.ReactNode;
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
`;

const Block = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.gray020};
  width: 750px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.1);
`;

function Modal({ children }: ModalProps) {
  return (
    <Container>
      <Block>{children}</Block>
    </Container>
  );
}

export default Modal;
