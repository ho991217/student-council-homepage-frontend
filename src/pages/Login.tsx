import GlobalBanner from 'components/global/banner/GlobalBanner';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 500px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Header = styled.div`
  margin-top: 40px;
  margin-bottom: 15px;
  max-width: 1400px;
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  ${({ theme }) => theme.fonts.smallTitle}
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
`;

const LoginForm = styled.form``;

const IdContainer = styled.div``;

const IdLabel = styled.span``;

const IdInput = styled.input.attrs({ type: 'text' })``;

const PasswordContainer = styled.div``;

const PasswordLabel = styled.span``;

const PasswordInput = styled.input.attrs({ type: 'password' })``;

const Detail = styled.div`
  color: ${({ theme }) => theme.colors.gray300};
  ${({ theme }) => theme.fonts.smallDescription}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
  span:first-child {
    margin-bottom: 5px;
  }
`;

function Login(): JSX.Element {
  return (
    <>
      <GlobalBanner title="로그인" detail="로그인 화면입니다." />
      <Wrapper>
        <Header>
          단국대학생 <HeaderPoint>로그인</HeaderPoint>
        </Header>
        <InnerContainer>
          <LoginForm>
            <IdContainer>
              <IdLabel>아이디</IdLabel>
              <IdInput />
            </IdContainer>
            <PasswordContainer>
              <PasswordLabel>비밀번호</PasswordLabel>
              <PasswordInput />
            </PasswordContainer>
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
