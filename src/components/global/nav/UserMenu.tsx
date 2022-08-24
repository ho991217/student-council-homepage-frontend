import { LoginStateAtom } from 'atoms/LoginState';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useLogOut } from 'hooks/UseLogout';

const Container = styled.div`
  display: grid;
  place-items: center;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};
  width: 100%;
  height: 40px;
  user-select: none;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  a {
    color: ${(props) => props.theme.colors.white};
    margin: 0px 20px;
  }
`;

const InnerContainer = styled.div`
  max-width: 1440px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginLink = styled(Link)`
  margin: 0px 20px;
`;

const LogOut = styled.div`
  margin: 0px 20px;
  cursor: pointer;
`;

function UserMenu(): JSX.Element {
  const { logOut } = useLogOut();
  const location = useLocation();
  const [{ isLoggedIn }, setLoginState] = useRecoilState(LoginStateAtom);

  const handleLogout = () => {
    logOut();
    setLoginState({
      isLoggedIn: false,
      admin: false,
    });
  };

  return (
    <Container>
      <InnerContainer>
        <Links>
          <a href="https://www.dankook.ac.kr/web/kor">단국대학교</a>
          <a href="https://portal.dankook.ac.kr/web/portal">Portal</a>
        </Links>

        {isLoggedIn ? (
          <LogOut onClick={handleLogout}>로그아웃</LogOut>
        ) : (
          location.pathname !== '/login' && (
            <LoginLink to="/login">로그인</LoginLink>
          )
        )}
      </InnerContainer>
    </Container>
  );
}

export default UserMenu;
