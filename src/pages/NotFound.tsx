import Block from 'components/global/Block';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fonts.size.x8xl};
`;

function NotFound(): JSX.Element {
  return <Block title="Not Found" contents={<Container>404!</Container>} />;
}

export default NotFound;
