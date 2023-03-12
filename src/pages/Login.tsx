import { LoginStateAtom } from 'atoms/LoginState';
import axios from 'axios';
import GlobalBanner from 'components/banner/GlobalBanner';
import CopyrightTerm from 'components/CopyrightTerm';
import Modal from 'components/modal/Modal';
import { Desktop } from 'hooks/MediaQueries';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 500px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 2rem;
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
  ${({ theme }) => theme.media.mobile} {
    height: 200px;
  }
  background-color: ${({ theme }) => theme.colors.gray040};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginForm = styled.form`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
  }
`;

const InputContainers = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  ${({ theme }) => theme.media.mobile} {
    margin-bottom: 15px;
  }
  ${({ theme }) => theme.media.tablet} {
    margin-right: 5px;
  }
  ${({ theme }) => theme.media.desktop} {
    margin-right: 15px;
  }
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
  margin-right: 10px;
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
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
`;

const LoginButton = styled.input.attrs({ type: 'submit' })`
  all: unset;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    height: 80px;
  }
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

const ExtrasContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 350px;
  ${({ theme }) => theme.media.mobile} {
    width: 320px;
  }
  padding: 0 35px 0 0;
  margin-top: 15px;
`;

const Extras = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignUpButton = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.size.sm};
`;

const Vseparator = styled.div`
  width: 1px;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin: 0 10px;
`;

const FindPasswordButton = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.size.sm};
`;

const SaveId = styled.div<{ saveId: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme, saveId }) =>
    saveId ? theme.fonts.weight.medium : theme.fonts.weight.regular};
  color: ${({ theme, saveId }) =>
    saveId ? theme.colors.primary : theme.colors.gray400};
  transition: color 0.2s ease-in-out;
`;

const SaveIdToggleContainer = styled.div<{ saveId: boolean }>`
  width: 30px;
  height: 18px;
  margin-right: 5px;
  border-radius: 20px;
  background-color: ${({ theme, saveId }) =>
    saveId ? theme.colors.primary : theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  position: relative;
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  :active {
    div {
      transform: scale(0.9);
      box-shadow: 0 0 1px 1.5px rgba(0, 0, 0, 0.1) inset;
    }
  }
`;

const SaveIdToggle = styled.div<{ saveId: boolean }>`
  position: absolute;
  top: 1px;
  left: ${({ saveId }) => (saveId ? '13px' : '1px')};
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${({ theme, saveId }) =>
    saveId ? theme.colors.gray040 : theme.colors.primary};
  transition: background-color 0.2s ease-in-out, left 0.2s ease-in-out; ;
`;

interface LoginErrorProps {
  response: {
    data: {
      code: string;
      message: [string];
      status: string;
      timestamp: string;
      trackingId: string;
    };
  };
}

function Login(): JSX.Element {
  const [id, setId] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [idMessage, setIdMessage] = useState<string>('');
  const [isValidId, setIsValidId] = useState<boolean>(false);
  const [saveId, setSaveId] = useState<boolean>(false);
  const [, setLoginState] = useRecoilState(LoginStateAtom);
  const [, setCookie] = useCookies(['X-AUTH-TOKEN', 'isAdmin']);
  const navigate = useNavigate();
  const [loginErrorState, setLoginErrorState] = useState({
    error: false,
    message: '',
  });

  const validateDankookEmail = (email: string) => {
    const regex = /^[0-9]{8}$/;
    return regex.test(email);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = JSON.stringify({ studentId: id, password });

    const config = {
      method: 'post',
      url: '/user/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    axios(config)
      .then((response) => {
        const { accessToken, admin } = response.data.data;
        setCookie('X-AUTH-TOKEN', accessToken);
        setCookie('isAdmin', admin);
        setLoginState({
          isLoggedIn: true,
          admin,
        });
        navigate('/');
      })
      .catch(({ response: { data } }: LoginErrorProps) => {
        const message = data.message[0];

        setLoginErrorState({
          error: true,
          message,
        });
        setIsOpen(true);
      });
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

  useEffect(() => {
    const localSaveId = localStorage.getItem('saveId');
    if (localSaveId) {
      setId(JSON.parse(localSaveId));
      setSaveId(true);
    } else {
      setSaveId(false);
    }
  }, []);

  useEffect(() => {
    if (saveId && validateDankookEmail(id)) {
      localStorage.setItem('saveId', JSON.stringify(id));
    } else {
      localStorage.removeItem('saveId');
    }
  }, [saveId]);

  return (
    <>
      <GlobalBanner title="로그인" detail="로그인 화면입니다." />
      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          title="로그인 실패!"
          contents={loginErrorState.message}
          accept={
            loginErrorState.message === '없는 회원입니다.' ? '회원가입' : ''
          }
          onAccept={() => {
            navigate('/sign-up/agreements');
          }}
        />
      )}
      <Wrapper>
        <Header>
          단국대학생 <HeaderPoint>로그인</HeaderPoint>
        </Header>
        <InnerContainer>
          <LoginForm onSubmit={handleLogin}>
            <InputContainers>
              <IdContainer>
                <Desktop>
                  <IdLabel>아이디</IdLabel>
                </Desktop>
                <IdInput
                  placeholder="학번을 입력해주세요"
                  value={id}
                  onChange={handleIdChange}
                />
                <IdMessage isValid={isValidId}>{idMessage}</IdMessage>
              </IdContainer>
              <PasswordContainer>
                <Desktop>
                  <PasswordLabel>비밀번호</PasswordLabel>
                </Desktop>
                <PasswordInput
                  placeholder="비밀번호를 입력해주세요."
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </PasswordContainer>
            </InputContainers>
            <LoginButton value="로그인" />
          </LoginForm>
          <ExtrasContainer>
            <SaveId saveId={saveId}>
              <SaveIdToggleContainer
                saveId={saveId}
                onClick={() => setSaveId((prev) => !prev)}
              >
                <SaveIdToggle saveId={saveId} />
              </SaveIdToggleContainer>
              아이디 저장
            </SaveId>
            <Extras>
              <SignUpButton to="/sign-up/agreements">회원가입</SignUpButton>
              <Vseparator />
              <FindPasswordButton to="/password">
                비밀번호 찾기
              </FindPasswordButton>
            </Extras>
          </ExtrasContainer>
        </InnerContainer>
        <CopyrightTerm />
      </Wrapper>
    </>
  );
}

export default Login;
