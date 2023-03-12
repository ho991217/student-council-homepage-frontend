import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import styled from 'styled-components';
import { StudentInfoAtom } from '../verification/StudentInfoAtom';

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

const TelButton = styled.button<{ valid: boolean }>`
  all: unset;
  width: 150px;
  height: 60px;
  background-color: ${({ theme, valid }) =>
    valid ? theme.colors.primary : theme.colors.gray200};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 2px;
  cursor: pointer;
  margin-left: 0.8rem;
  text-align: center;
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
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nickname, setNickname] = useState('');
  const [isAllValid, setIsAllValid] = useState(false);
  const [info, setInfo] = useRecoilState(StudentInfoAtom);

  const onTelNnumberAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await axios({
      method: 'POST',
      url: `/user/sms/${info.signupToken}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        phoneNumber,
      },
    });
    if (res) {
      console.log(res);
    } else {
      alert('인증번호 전송에 실패했습니다.');
    }
  };

  const onInvalid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };

  useEffect(() => {
    if (info.signupToken.length === 0) {
      alert('학생 인증을 먼저 해주세요.');
      window.location.href = '/sign-up/verification';
    }
  }, []);

  useEffect(() => {
    if (
      password.length > 0 &&
      passwordCheck.length > 0 &&
      phoneNumber.length === 11 &&
      nickname.length > 0
    ) {
      setIsAllValid(true);
    } else {
      setIsAllValid(false);
    }
  }, [password, passwordCheck, phoneNumber, nickname]);

  return (
    <Container>
      <Form onInvalid={onInvalid} onSubmit={onSubmit}>
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
            <Input
              type="text"
              name="name"
              value={info.student.studentName}
              readOnly
            />
          </Label>
        </Seg>
        <Seg>
          <Label>
            닉네임
            <Input
              type="text"
              placeholder="닉네임을 입력하세요."
              name="nickname"
              value={nickname}
              onChange={({ currentTarget }) => setNickname(currentTarget.value)}
              pattern="^[a-zA-Z가-힣\d_]{3,16}$"
            />
          </Label>
        </Seg>
        <Seg>
          <Label>
            비밀번호
            <Input
              type="password"
              name="password"
              placeholder="비밀번호 입력"
              onChange={({ currentTarget }) => {
                setPassword(currentTarget.value);
              }}
              value={password}
            />
            <Input
              type="password"
              name="passwordCheck"
              placeholder="비밀번호 다시 입력"
              onChange={({ currentTarget }) => {
                setPasswordCheck(currentTarget.value);
              }}
              value={passwordCheck}
            />
          </Label>
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
                name="phoneNumber"
                onChange={(e) => setPhoneNumber(e.currentTarget.value)}
              />
              <TelButton
                valid={phoneNumber.length === 11}
                onClick={onTelNnumberAuth}
              >
                인증요청
              </TelButton>
            </TelContainer>
            <Input
              type="text"
              name="authNumber"
              placeholder="인증번호 6자리를 입력하세요."
              pattern="[0-9]+"
            />
          </Label>
        </Seg>
        <SubmitButton type="submit" value="다음" disabled={!isAllValid} />
      </Form>
    </Container>
  );
}

export default InputStudentInfos;
