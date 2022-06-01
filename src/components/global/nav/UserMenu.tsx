import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  place-items: center;

  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};
  ${({ theme }) => theme.fonts.smallSubTitle}
  width: 100%;
  height: 40px;
  user-select: none;
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

function UserMenu(): JSX.Element {
  return (
    <Container>
      <InnerContainer>
        <Links>
          <a href="https://www.dankook.ac.kr/web/kor">단국대학교</a>
          <a href="https://portal.dankook.ac.kr/web/portal">Portal</a>
        </Links>

        {/* TODO: 로그인 페이지 만들어지면 경로 수정 */}
        <LoginLink to="/">로그인</LoginLink>
      </InnerContainer>
    </Container>
  );
}

export default UserMenu;
