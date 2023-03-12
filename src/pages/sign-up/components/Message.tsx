import { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ type: MessageProps['type'] }>`
  color: ${({ type }) => (type === '에러' ? '#ff6565' : '#4a4a4a')};
  width: 100%;
  margin-top: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 0.9rem;
  line-height: 1.2rem;
`;

const ExpIcon = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: transparent;
  border: 1px solid ${({ color }) => color};
`;

interface MessageProps {
  type: '에러' | '알림';
  message: ReactNode;
  open: boolean;
}

function Message({ type, message, open }: MessageProps) {
  return open ? (
    <Container type={type}>
      <ExpIcon>!</ExpIcon>
      {message}
    </Container>
  ) : null;
}

export default Message;
