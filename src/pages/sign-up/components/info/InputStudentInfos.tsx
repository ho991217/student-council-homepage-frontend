import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { majorList } from 'data/Major';
import {
  Header,
  HeaderPoint,
  InputContainer,
  Wrapper,
} from 'pages/sign-up/components/SignUpComponents';

import CopyrightTerm from 'components/CopyrightTerm';
import CheckPasswordSecurity from '../../functions/CheckPasswordSecurity';
import { RemoveHyphen } from '../../functions/RemoveHyphen';
import { validateSMSCode } from '../../functions/ValidateSMSCode';
import { Info } from '../../SignUp';
import { StudentInfoAtom } from '../verification/StudentInfoAtom';

const Container = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;
`;

const Form = styled.form``;

const Seg = styled.p`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  width: 540px;
  height: 60px;
  margin-bottom: 10px;
  border-radius: 2px;
  padding: 1.2rem;
  background-color: ${({ theme }) => theme.colors.gray040};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

const Label = styled.label`
  color: #b3b3b3;
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const TelContainer = styled.div`
  width: 540px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

const TelButton = styled.button<{ valid: boolean }>`
  all: unset;
  width: 150px;
  height: 60px;
  margin-bottom: 10px;
  background-color: ${({ theme, valid }) =>
    valid ? theme.colors.primary : theme.colors.gray200};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 2px;
  cursor: pointer;
  margin-left: 12px;
  text-align: center;
`;

const SubmitButton = styled(Input)<{ valid: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, valid }) =>
    valid ? theme.colors.primary : theme.colors.gray200};
  color: ${({ theme }) => theme.colors.white};
`;

function InputStudentInfos() {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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
  return (
    <Container>
      <Form>
        <Seg>
          <Label htmlFor="studentId">아이디</Label>
          <Input
            type="text"
            id="studentId"
            value={`${info.student.studentId}@dankook.ac.kr`}
            readOnly
          />
        </Seg>
        <Seg>
          <Label htmlFor="studentName">이름</Label>
          <Input
            type="text"
            id="studentName"
            value={info.student.studentName}
            readOnly
          />
        </Seg>
        <Seg>
          <Label htmlFor="passwordInput">비밀번호</Label>
          <Input
            type="password"
            id="passwordInput"
            placeholder="비밀번호 입력"
          />
          <Input
            type="password"
            id="passwordInput"
            placeholder="비밀번호 다시 입력"
          />
        </Seg>
        <Seg>
          <Label htmlFor="major">전공</Label>
          <Input type="text" id="major" value={info.student.major} readOnly />
        </Seg>
        <Seg>
          <Label htmlFor="tel">휴대폰 번호</Label>
          <TelContainer>
            <Input
              type="tel"
              id="tel"
              placeholder="-는 제외하고 입력하세요."
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
            id="validation-code"
            placeholder="인증번호 6자리를 입력하세요."
          />
        </Seg>
      </Form>
      <SubmitButton type="submit" value="다음" valid={isAllValid} />
    </Container>
  );
}

export default InputStudentInfos;
