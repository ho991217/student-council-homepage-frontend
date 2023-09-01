import { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ type: MessageProps['type'], margin: MessageProps['margin'] }>`
  color: ${({ type }) => (type === 'error' ? '#ff6565' : '#4a4a4a')};
  width: 100%;
  margin-top: ${({ margin }) => margin ? "1rem" : "-1.2rem" };
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
  type: 'error' | 'notice';
  message: ReactNode;
  open: boolean;
  margin?: boolean;
}

Message.defaultProps = {
  margin: true
}

function Message({ type, message, open, margin }: MessageProps) {
  return open ? (
    <Container type={type} margin={margin}>
      <ExpIcon>!</ExpIcon>
      {message}
    </Container>
  ) : null;
}

export default Message;
