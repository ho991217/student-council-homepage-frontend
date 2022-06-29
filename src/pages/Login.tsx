import GlobalBanner from 'components/global/banner/GlobalBanner';
import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 500px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 40px;
`;

const Header = styled.div`
  margin: 40px 0 15px 0;
  max-width: 1400px;
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
`;

const HeaderPoint = styled.div`
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const InnerContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  height: 270px;
  background-color: ${({ theme }) => theme.colors.gray040};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginForm = styled.form`
  display: flex;
`;

const InputContainers = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const IdContainer = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2.5px;
  position: relative;
`;

const IdLabel = styled.span`
  width: 60px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const IdInput = styled.input.attrs({
  type: 'text',
  required: true,
  minLength: 8,
  maxLength: 8,
})`
  all: unset;
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
  width: 300px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  transition: width 0.2s ease-in-out;
`;

const IdMessage = styled.div<{ isValid: boolean }>`
  position: absolute;
  pointer-events: none;
  right: ${({ isValid }) => (isValid ? '120px' : '200px')};
  top: ${({ isValid }) => (isValid ? '13px' : '-25px')};
  font-size: ${({ isValid, theme }) =>
    isValid ? theme.fonts.size.base : theme.fonts.size.sm};
  font-weight: ${({ isValid, theme }) =>
    isValid ? theme.fonts.weight.regular : theme.fonts.weight.bold};
  color: ${({ isValid, theme }) =>
    isValid ? theme.colors.gray900 : theme.colors.red};
  transition: right 0.2s ease-in-out, top 0.2s ease-in-out,
    color 0.2s ease-in-out;
`;

const PasswordContainer = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2.5px;
`;

const PasswordLabel = styled.span`
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const PasswordInput = styled.input.attrs({
  type: 'password',
  required: true,
})`
  all: unset;
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
  width: 300px;
  margin: 10px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
`;

const LoginButton = styled.input.attrs({ type: 'submit' })`
  all: unset;
  width: 90px;
  height: 90px;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
  font-size: ${({ theme }) => theme.fonts.size.xs};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};

  span:first-child {
    margin-bottom: 5px;
    color: ${({ theme }) => theme.colors.gray400};
  }
  span:last-child {
    color: ${({ theme }) => theme.colors.gray200};
  }
`;

function Login(): JSX.Element {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [idMessage, setIdMessage] = useState<string>('');
  const [isValidId, setIsValidId] = useState<boolean>(false);

  const validateDankookEmail = (email: string) => {
    const regex = /^[0-9]{8}$/;
    return regex.test(email);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = e.currentTarget.value;
    if (validateDankookEmail(currentInput)) {
      setIsValidId(true);
      setIdMessage('@dankook.ac.kr');
    } else {
      setIsValidId(false);
      setIdMessage('학번을 입력해주세요.');
    }

    setId(currentInput);
  };

  return (
    <>
      <GlobalBanner title="로그인" detail="로그인 화면입니다." />
      <Wrapper>
        <Header>
          단국대학생 <HeaderPoint>로그인</HeaderPoint>
        </Header>
        <InnerContainer>
          <LoginForm onSubmit={handleLogin}>
            <InputContainers>
              <IdContainer>
                <IdLabel>아이디</IdLabel>
                <IdInput
                  placeholder="학번을 입력해주세요"
                  value={id}
                  onChange={handleIdChange}
                />
                <IdMessage isValid={isValidId}>{idMessage}</IdMessage>
              </IdContainer>
              <PasswordContainer>
                <PasswordLabel>비밀번호</PasswordLabel>
                <PasswordInput
                  placeholder="비밀번호를 입력해주세요."
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </PasswordContainer>
            </InputContainers>
            <LoginButton value="로그인" />
          </LoginForm>
        </InnerContainer>
        <Detail>
          <span>
            경기도 용인시 수지구 죽전동 1491 단국대학교 혜당관 406호 총학생회실
          </span>
          <span>COPYRIGHT(C)2022 DANKOOK UNIVERSITY ALL RIGHTS RESERVERD</span>
        </Detail>
      </Wrapper>
    </>
  );
}

export default Login;
