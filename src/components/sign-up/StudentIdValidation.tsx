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

const GmailInformation = styled.div`
  display: flex;
  width: 540px;
  margin-bottom: 10px;
  padding: 0 10px;
  justify-content: space-between;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    font-size: ${({ theme }) => theme.fonts.size.xs};
    margin-bottom: 5px;
  }
  div {
    display: inline-block;
    color: ${({ theme }) => theme.colors.gray400};
    :last-child {
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray400};
    }
  }
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

function StudentIdValidation({ type }: { type: string }): JSX.Element {
  const [studentNum, setStudentNum] = useState('');
  const [emailState, setEmailState] = useState({
    sent: false,
    success: false,
    errMsg: '',
  });
  const [url, setUrl] = useState<string>(
    type === '회원가입' ? '/api/email' : '/api/email/password',
  );
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
        url: `${url}`,
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
      console.log(error);
      const e = error as any;
      if (
        e.response.data.message === '이미 존재하는 회원입니다.' ||
        e.response.data.message === '회원가입을 진행해주세요'
      ) {
        setEmailState((prev) => ({ ...prev, errMsg: e.response.data.message }));
      }
    }
  };

  return (
    <>
      {emailState.sent && (
        <Modal>
          {/* eslint-disable-next-line no-nested-ternary */}
          {emailState.errMsg.length < 1 ? (
            emailState.success ? (
              <>
                <Text>학교 계정 이메일 스펨메일함을 확인하세요!</Text>
                <LinktoGmail href="https://mail.google.com/mail/u/1/?ogbl#spam">
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
            <>
              <div>{emailState.errMsg}</div>
              <CloseButton
                type="button"
                value="닫기"
                onClick={() => navigate(-1)}
              />
            </>
          )}
        </Modal>
      )}
      <Wrapper>
        <Header>
          단국대학교 총학생회 <HeaderPoint>{type}</HeaderPoint>
        </Header>
        <InnerContainerByStudentNum>
          {type === '회원가입' && (
            <GmailInformation>
              <div>단국대학교 Gmail 계정을 통해 회원가입을 진행합니다.</div>
              <div>
                <a
                  target="_blank "
                  href="https://sites.google.com/dankook.ac.kr/help"
                >
                  Gmail 사용 안내
                </a>
              </div>
            </GmailInformation>
          )}
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
          {type === '비밀번호 찾기' && (
            <span>비밀번호를 찾고자 하는 학번(ID)을 입력해 주세요.</span>
          )}
        </InnerContainerByStudentNum>
        <CopyrightTerm />
      </Wrapper>
    </>
  );
}

export default StudentIdValidation;
