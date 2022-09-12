import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CopyrightTerm from 'components/global/CopyrightTerm';
import { PropagateLoader } from 'react-spinners';
import styled from 'styled-components';
import Modal from 'components/sign-up/Modal';
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

const CloseButton = styled.input.attrs({ type: 'button' })`
  all: unset;
  padding: 15px 30px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 9999px;
  margin-top: 1rem;
`;

function StudentIdValidation(): JSX.Element {
  const [studentNum, setStudentNum] = useState('');
  const [emailState, setEmailState] = useState({
    sent: false,
    success: false,
    errMsg: '',
  });
  const navigate = useNavigate();

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
    try {
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
    } catch (error) {
      const e = error as any;
      if (e.response.data.message === '이미 존재하는 회원입니다.') {
        setEmailState((prev) => ({ ...prev, errMsg: e.response.data.message }));
      }
    }
  };

  return (
    <>
      {emailState.sent && (
        <Modal>
          {/* eslint-disable-next-line no-nested-ternary */}
          {emailState.errMsg.length <= 0 ? (
            emailState.success ? (
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
            )
          ) : (
            <div>이미 존재하는 회원입니다.</div>
          )}
          <CloseButton
            type="button"
            value="닫기"
            onClick={() => navigate(-1)}
          />
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
