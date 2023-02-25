import React from 'react';
import { IoIosCloseCircle, IoMdCloseCircleOutline } from 'react-icons/io';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  z-index: 30;
  top: -15px;
  left: 20px;
  cursor: pointer;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
`;

interface Props {
  close: () => void;
}
function CloseIcon({ close }: Props) {
  return (
    <Container onClick={close}>
      <IoIosCloseCircle size={40} color="#ffffff" />
    </Container>
  );
}

export default CloseIcon;
