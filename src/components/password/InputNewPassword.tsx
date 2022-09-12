import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import {
  Header,
  HeaderPoint,
  InputContainer,
  Wrapper,
} from 'components/sign-up/SignUpComponents';

import CopyrightTerm from 'components/global/CopyrightTerm';
import CheckPasswordSecurity from 'components/sign-up/CheckPasswordSecurity';

const InnerContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  /* height: 620px; */
  ${({ theme }) => theme.media.mobile} {
    height: 350px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 5px;
    span {
      font-size: ${({ theme }) => theme.fonts.size.sm};
    }
  }
  background-color: ${({ theme }) => theme.colors.gray040};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;

  span {
    margin-bottom: 15px;
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

const PasswordInput = styled.input.attrs({
  type: 'password',
  required: true,
})`
  all: unset;
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
  width: 640px;
  padding: 0 10px;
`;

const SignUpButton = styled.button<{ active: boolean }>`
  all: unset;
  width: 450px;
  height: 50px;
  margin: 20px 0;
  background-color: ${({ active }) =>
    active
      ? ({ theme }) => theme.colors.secondary
      : ({ theme }) => theme.colors.gray300};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  ${({ theme }) => theme.media.mobile} {
    width: 70%;
    margin: 5px 0;
  }
`;

const PasswordSecurityLevel = styled.div<{ level: number }>`
  width: 500px;
  height: 20px;
  margin-bottom: 15px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};
  display: grid;
  overflow: hidden;
  ${({ theme }) => theme.media.mobile} {
    width: 70%;
    height: 40px;
    margin-top: 20px;
  }
`;

const SecurityBlock = styled.div<{ level: number }>`
  background-color: ${({ level }) => {
    if (level < 2) return 'red';
    if (level < 4) return 'orange';
    return 'green';
  }};
  width: ${({ level }) => {
    switch (level) {
      case 0:
        return '0%';
      case 1:
        return '20%';
      case 2:
        return '40%';
      case 3:
        return '60%';
      case 4:
        return '80%';
      case 5:
        return '100%';
      default:
        return '0%';
    }
  }};
  border-left: 0.3px solid white;
  transition: all 0.2s ease-in-out;
`;

const Message = styled.span`
  color: ${({ theme }) => theme.colors.red};
`;

function InputNewPassword({
  studentId,
  token,
}: {
  studentId: string | null;
  token: string;
}): JSX.Element {
  const [password, setPassword] = useState<string>('');
  const [passwordState, setPasswordState] = useState({
    securityLevel: 0,
    checkPassword: '',
    errMsg: '',
    verified: false,
  });
  const navigate = useNavigate();

  const handlePasswordChange = ({ currentTarget }: any) => {
    const password = currentTarget.value;
    setPassword(password);

    const securityLevel = CheckPasswordSecurity(password);
    passwordMsg(securityLevel);
    setPasswordState((prev) => ({
      ...prev,
      securityLevel,
    }));
  };

  /** 최종 회원가입을 처리하는 함수 */
  const handleSignUp = async () => {
    const data = JSON.stringify({
      userId: studentId,
      newPW: password,
    });
    console.log(data);
    try {
      const res = await axios({
        method: 'patch',
        url: '/api/users/password',
        headers: {
          'Content-Type': 'application/json',
          'EMAIL-VALIDATION-TOKEN': token,
        },
        data,
      });
      console.log(res.data);
      if (res.data.successful) {
        navigate('/password/success');
      } else {
        alert('something`s not right!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  /** 비밀번호 확인하는 함수 */
  const handleCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setPasswordState((prev) => ({ ...prev, checkPassword: value }));

    if (value === password && CheckPasswordSecurity(value) > 0) {
      setPasswordState((prev) => ({ ...prev, verified: true }));
    }
  };

  /** 비밀번호 메시지를 설정 해 주는 함수 */
  const passwordMsg = (level: number) => {
    let errMsg = '';
    switch (level) {
      case 0:
        errMsg = '사용할 수 없는 비밀번호입니다.';
        break;
      case 1:
        errMsg = '아주 약한 비밀번호입니다.';
        break;
      case 2:
        errMsg = '약한 비밀번호입니다.';
        break;
      case 3:
        errMsg = '적절한 비밀번호입니다.';
        break;
      case 4:
        errMsg = '강력한 비밀번호입니다.';
        break;
      case 5:
        errMsg = '아주 강력한 비밀번호입니다.';
        break;
      default:
        errMsg = '';
        break;
    }
    setPasswordState((prev) => ({ ...prev, errMsg }));
  };

  /** 가입이 가능한 지 확인하는 함수 */
  const isRegisterable = (): boolean => {
    return passwordState.verified;
  };

  return (
    <Wrapper>
      <Header>
        단국대학교 총학생회 <HeaderPoint>비밀번호 변경</HeaderPoint>
      </Header>
      <InnerContainer>
        <InputContainer>
          <PasswordInput
            placeholder="새로운 비밀번호 입력"
            value={password}
            onChange={handlePasswordChange}
          />
        </InputContainer>
        {passwordState.checkPassword !== password && password && (
          <>
            <Message>{passwordState.errMsg}</Message>
            <PasswordSecurityLevel level={passwordState.securityLevel}>
              <SecurityBlock level={passwordState.securityLevel} />
            </PasswordSecurityLevel>
          </>
        )}

        <InputContainer>
          <PasswordInput
            placeholder="새로운 비밀번호 확인"
            value={passwordState.checkPassword}
            onChange={handleCheckPassword}
          />
        </InputContainer>
        {passwordState.checkPassword !== '' &&
          (passwordState.checkPassword === password ? (
            <Message>비밀번호가 일치합니다.</Message>
          ) : (
            <Message>비밀번호가 일치하지 않습니다.</Message>
          ))}
        <SignUpButton
          active={isRegisterable()}
          disabled={!isRegisterable()}
          onClick={handleSignUp}
        >
          변경하기
        </SignUpButton>
      </InnerContainer>
      <CopyrightTerm />
    </Wrapper>
  );
}

export default InputNewPassword;
