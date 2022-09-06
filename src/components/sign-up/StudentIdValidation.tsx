import React, { useState } from 'react';
import axios from 'axios';
import CopyrightTerm from 'components/global/CopyrightTerm';
import { PropagateLoader } from 'react-spinners';
import styled from 'styled-components';
import Modal from 'components/global/Modal';
import {
  Header,
  HeaderPoint,
  InnerContainerByStudentNum,
  InputContainer,
  VerifyStduentButton,
  Wrapper,
} from './SignUpComponents';

const StudentNumInput = styled.input`
  all: unset;
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
  width: 540px;
  padding: 0 10px;
`;

const Text = styled.span`
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-bottom: 20px;
`;

const LinktoGmail = styled.a`
  all: unset;
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

function StudentIdValidation(): JSX.Element {
  const [studentNum, setStudentNum] = useState('');
  const [emailState, setEmailState] = useState({
    sent: false,
    success: false,
    errMsg: '',
  });

  const validateStudentNum = (studentNum: string) => {
    const regex = /[0-9]/;
    return regex.test(studentNum);
  };

  const onStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validateStudentNum(e.currentTarget.value)) {
      setStudentNum(e.currentTarget.value);
    } else if (e.currentTarget.value === '') {
      setStudentNum('');
    }
  };

  const sendVerificationEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailState((prev) => ({
      ...prev,
      sent: true,
    }));

    const { data } = await axios({
      method: 'post',
      url: '/api/email',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ classId: studentNum }),
    });

    setEmailState((prev) => ({
      ...prev,

      success: data.successful,
    }));
  };

  return (
    <>
      {emailState.sent && (
        <Modal>
          {emailState.success ? (
            <>
              <Text>학교 계정 이메일을 확인하세요!</Text>
              <LinktoGmail href="https://mail.google.com/mail">
                G-MAIL 바로가기
              </LinktoGmail>
            </>
          ) : (
            <>
              <Text>이메일 보내는 중...</Text>
              <PropagateLoader
                style={{ transform: 'translateX(-5px)' }}
                color="#9753DC"
              />
            </>
          )}
        </Modal>
      )}
      <Wrapper>
        <Header>
          단국대학교 총학생회 <HeaderPoint>회원가입</HeaderPoint>
        </Header>
        <InnerContainerByStudentNum>
          <InputContainer onSubmit={sendVerificationEmail}>
            <StudentNumInput
              required
              type="text"
              placeholder="학번(ID) 입력"
              maxLength={8}
              minLength={8}
              onChange={onStudentIdChange}
              value={studentNum}
            />
            <VerifyStduentButton type="submit" value="인증" />
          </InputContainer>
        </InnerContainerByStudentNum>
        <CopyrightTerm />
      </Wrapper>
    </>
  );
}

export default StudentIdValidation;
