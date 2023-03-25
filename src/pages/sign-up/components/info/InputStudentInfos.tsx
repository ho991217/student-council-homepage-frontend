import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { StudentInfoAtom } from '../verification/StudentInfoAtom';
import Message from '../Message';

const Container = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;
`;

const Form = styled.form``;

const Seg = styled.section`
  margin-bottom: 30px;
`;

const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  width: 540px;
  height: 60px;
  margin: 5px 0;
  border-radius: 2px;
  padding: 1.2rem;
  background-color: ${({ theme }) => theme.colors.gray040};
  color: ${({ theme }) => theme.colors.gray800};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

const Label = styled.label`
  color: #b3b3b3;
  font-size: 1.2rem;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const TelContainer = styled.div`
  width: 540px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
`;

const TelButton = styled.button`
  all: unset;
  width: 150px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 2px;
  cursor: pointer;
  margin-left: 0.8rem;
  text-align: center;
  :disabled {
    background-color: ${({ theme }) => theme.colors.gray200};
  }
`;

const SubmitButton = styled(Input)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  :disabled {
    background-color: ${({ theme }) => theme.colors.gray200};
  }
`;

function InputStudentInfos() {
  const [password, setPassword] = useState({
    content: '',
    msg: '',
    valid: false,
  });
  const [passwordCheck, setPasswordCheck] = useState({
    content: '',
    msg: '',
    valid: false,
  });
  const [phoneNumber, setPhoneNumber] = useState({
    content: '',
    msg: '',
    success: false,
    sent: false,
  });
  const [authNumber, setAuthNumber] = useState({
    content: '',
    msg: '',
    valid: false,
  });
  const [nickname, setNickname] = useState({
    content: '',
    msg: '',
    valid: false,
  });
  const [isAllValid, setIsAllValid] = useState(false);
  const [info] = useRecoilState(StudentInfoAtom);
  const navigate = useNavigate();

  const onTelNumberAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios({
        method: 'POST',
        url: `/user/sms/${info.signupToken}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          phoneNumber: phoneNumber.content,
        },
      });

      setPhoneNumber({
        msg: '인증번호가 전송되었습니다.',
        sent: true,
        success: true,
        content: phoneNumber.content,
      });
    } catch (error) {
      setPhoneNumber({
        msg: '인증번호 전송에 실패했습니다.',
        sent: false,
        success: false,
        content: phoneNumber.content,
      });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios({
        method: 'POST',
        url: `/user/${info.signupToken}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          nickname: nickname.content,
          password: password.content,
        },
      });
      navigate('/sign-up/success');
    } catch (error) {
      // 모달 추가
      alert(error);
    }
  };

  useEffect(() => {
    if (info.signupToken.length === 0) {
      alert('학생 인증을 먼저 해주세요.');
      window.location.href = '/sign-up/verification';
    }
  }, []);

  // 전체 유효성
  useEffect(() => {
    if (
      password.valid &&
      passwordCheck.valid &&
      authNumber.valid &&
      nickname.valid
    ) {
      setIsAllValid(true);
    } else {
      setIsAllValid(false);
    }
  }, [password, passwordCheck, authNumber, nickname]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (password.content.length < 8) {
      setPassword((prev) => ({
        content: prev.content,
        msg: '비밀번호는 8자 이상이어야 합니다.',
        valid: false,
      }));
    } else if (password.content.length > 20) {
      setPassword((prev) => ({
        content: prev.content,
        msg: '비밀번호는 20자 이하여야 합니다.',
        valid: false,
      }));
    } else {
      setPassword((prev) => ({
        content: prev.content,
        msg: '',
        valid: true,
      }));
    }
  }, [password.content]);

  // 두 비밀번호가 같은 지 검사
  useEffect(() => {
    if (password.content === passwordCheck.content) {
      setPasswordCheck((prev) => ({
        content: prev.content,
        msg: '',
        valid: true,
      }));
    } else {
      setPasswordCheck((prev) => ({
        content: prev.content,
        msg: '비밀번호가 일치하지 않습니다.',
        valid: false,
      }));
    }
  }, [password.content, passwordCheck.content]);

  // 닉네임 유효성 검사
  useEffect(() => {
    const regex = /^[a-zA-Z가-힣\d_]{3,16}$/;

    if (nickname.content.length < 3) {
      setNickname((prev) => ({
        content: prev.content,
        msg: '닉네임은 3자 이상이어야 합니다.',
        valid: false,
      }));
    } else if (nickname.content.length > 16) {
      setNickname((prev) => ({
        content: prev.content,
        msg: '닉네임은 16자 이하여야 합니다.',
        valid: false,
      }));
    } else if (!regex.test(nickname.content)) {
      setNickname((prev) => ({
        content: prev.content,
        msg: '닉네임은 한글, 영문, 숫자, _만 사용할 수 있습니다.',
        valid: false,
      }));
    } else {
      setNickname((prev) => ({
        content: prev.content,
        msg: '',
        valid: true,
      }));
    }
  }, [nickname.content]);

  const verifyAuthCode = async () => {
    try {
      await axios({
        method: 'POST',
        url: `/user/sms/verify/${info.signupToken}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          code: authNumber.content,
        },
      });

      setAuthNumber((prev) => ({
        content: prev.content,
        msg: '',
        valid: true,
      }));
    } catch (error) {
      setAuthNumber((prev) => ({
        content: prev.content,
        msg: '인증번호가 일치하지 않습니다.',
        valid: false,
      }));
    }
  };

  // 인증번호 유효성 검사
  useEffect(() => {
    if (authNumber.content.length === 6) {
      verifyAuthCode();
      setAuthNumber((prev) => ({
        content: prev.content,
        msg: '',
        valid: true,
      }));
    } else if (phoneNumber.sent && authNumber.content.length !== 6) {
      setAuthNumber((prev) => ({
        content: prev.content,
        msg: '인증번호는 6자리입니다.',
        valid: false,
      }));
    }
  }, [authNumber.content]);

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Seg>
          <Label>
            아이디
            <Input
              type="text"
              value={`${info.student.studentId}@dankook.ac.kr`}
              readOnly
            />
          </Label>
        </Seg>
        <Seg>
          <Label>
            이름
            <Input type="text" value={info.student.studentName} readOnly />
          </Label>
        </Seg>
        <Seg>
          <Label>
            닉네임
            <Input
              type="text"
              placeholder="닉네임을 입력하세요."
              value={nickname.content}
              onChange={({ currentTarget }) =>
                setNickname((prev) => ({
                  content: currentTarget.value,
                  msg: prev.msg,
                  valid: prev.valid,
                }))
              }
              pattern="^[a-zA-Z가-힣\d_]{3,16}$"
            />
          </Label>
          <Message
            type="error"
            message={nickname.msg}
            open={!nickname.valid && !!nickname.msg}
          />
        </Seg>
        <Seg>
          <Label>
            비밀번호
            <Input
              type="password"
              placeholder="비밀번호 입력"
              onChange={({ currentTarget }) => {
                setPassword((prev) => ({
                  content: currentTarget.value,
                  msg: prev.msg,
                  valid: prev.valid,
                }));
              }}
              value={password.content}
            />
            <Input
              type="password"
              placeholder="비밀번호 다시 입력"
              onChange={({ currentTarget }) => {
                setPasswordCheck((prev) => ({
                  valid: prev.valid,
                  msg: prev.msg,
                  content: currentTarget.value,
                }));
              }}
              value={passwordCheck.content}
            />
          </Label>
          <Message
            type="error"
            message={password.msg}
            open={!password.valid && !!password.msg}
          />
          <Message
            type="error"
            message={passwordCheck.msg}
            open={!passwordCheck.valid && !!passwordCheck.msg}
          />
          <Message
            type="notice"
            message="비밀번호는 영문, 숫자, 특수문자를 각각 하나씩 포함하는 8자 이상의 조합으로 이루어져야 합니다."
            open
          />
        </Seg>
        <Seg>
          <Label>
            전공
            <Input type="text" value={info.student.major} readOnly />
          </Label>
        </Seg>
        <Seg>
          <Label>
            휴대폰 번호
            <TelContainer>
              <Input
                type="tel"
                placeholder="-는 제외하고 입력하세요."
                onChange={({ currentTarget }) =>
                  setPhoneNumber((prev) => ({
                    content: currentTarget.value,
                    sent: prev.sent,
                    success: prev.success,
                    msg: prev.msg,
                  }))
                }
              />
              <TelButton
                disabled={phoneNumber.content.length !== 11}
                onClick={onTelNumberAuth}
              >
                인증요청
              </TelButton>
            </TelContainer>
            <Input
              type="text"
              placeholder="인증번호 6자리를 입력하세요."
              pattern="[0-9]{6}$"
              onChange={({ currentTarget }) =>
                setAuthNumber((prev) => ({
                  content: currentTarget.value,
                  msg: prev.msg,
                  valid: prev.valid,
                }))
              }
              value={authNumber.content}
            />
          </Label>
          <Message
            type="error"
            message={authNumber.msg}
            open={!authNumber.valid && !!authNumber.msg}
          />
          <Message
            type="notice"
            message={phoneNumber.msg}
            open={phoneNumber.sent}
          />
          <Message
            type="error"
            message={phoneNumber.msg}
            open={phoneNumber.sent && !phoneNumber.success}
          />
        </Seg>
        <SubmitButton type="submit" value="다음" disabled={!isAllValid} />
      </Form>
    </Container>
  );
}

export default InputStudentInfos;
