import InputStudentInfos from 'pages/sign-up/components/InputStudentInfos';
import StudentIdValidation from 'pages/sign-up/components/StudentIdValidation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Agreements from './components/Agreements';
import Header from './components/Header';
import Success from './components/Succes';

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
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);
  const [info, setInfo] = useState<Info>({
    signupToken: '',
    student: {
      major: '',
      studentId: '',
      studentName: '',
    },
  });

  const components = [
    <StudentIdValidation key="0" setInfo={setInfo} />,
    <InputStudentInfos key="1" info={info} />,
    <Agreements key="2" />,
    <Success key="3" />,
  ];

  useEffect(() => {
    if (info.signupToken.length > 0) {
      setStage(1);
    } else {
      setStage(0);
    }
  }, [info]);

  return (
    <Container>
      <Header stage={stage} />
      {components[stage]}
    </Container>
  );
}

export default SignUp;
