import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

function SignUp() {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
}

export default SignUp;
