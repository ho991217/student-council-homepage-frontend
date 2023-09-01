import InputNewPassword from 'pages/password/components/InputNewPassword';
import Header from 'pages/sign-up/components/Header';
import StudentIdValidation from 'pages/sign-up/components/verification/StudentIdValidation';
import { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;


function Password() {
  const [emailVerificationToken, setEmailVerificationToken] = useState<
    string | null
  >(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setEmailVerificationToken(searchParams.get('token'));
  }, []);

  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
}

export default Password;
