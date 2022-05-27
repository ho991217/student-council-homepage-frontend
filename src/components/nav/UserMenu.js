import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colors.white};
  font-size: 0.8125rem;
  font-family: 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  line-height: 0.8125;
  background-color: ${(props) => props.theme.colors.primary};
  width: 100vw;
  height: 40px;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.white};
    font-size: 0.8125rem;
    line-height: 0.8125;
  }
`;
const PortalLink = styled.div`
  width: 9.125rem;
  display: flex;
  justify-content: space-between;
  margin-left: 12.4%;
`;

const LoginLink = styled(Link)`
  text-align: right;
  margin-right: 12.4%;
`;

function UserMenu() {
  return (
    <Container>
      <PortalLink>
        <span>단국대학교</span>
        <a href="https://portal.dankook.ac.kr/web/portal">Portal</a>
      </PortalLink>

      {/* TODO: 로그인 페이지 만들어지면 경로 수정 */}
      <LoginLink to="/">로그인</LoginLink>
    </Container>
  );
}

export default UserMenu;
