import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import InputStudentInfos from 'pages/sign-up/components/info/InputStudentInfos';
import { useEffect, useState } from 'react';
import StudentIdValidation from './components/verification/StudentIdValidation';
import Header from './components/Header';
import Success from './components/Succes';
import Agreements from './components/agreements/Agreements';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

export type Info = {
  signupToken: string;
  student: {
    major: string;
    studentId: string;
    studentName: string;
  };
};

function SignUp() {
  const [info, setInfo] = useState<Info>({
    signupToken: '',
    student: {
      major: '',
      studentId: '',
      studentName: '',
    },
  });

  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
}

export default SignUp;
