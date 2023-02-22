import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NavItems } from './NavItems';

const Nav = styled.ul<{margin?: string}>`
  width: 180px;
  font-size: 18px;
  margin: ${props => props.margin};
`;
const Hr = styled.hr`
  color: ${(props) => props.theme.colors.primary};
  border: 3px solid ${(props) => props.theme.colors.primary};
  margin: 0 0 5px 0;
`;
const NavItem = styled.li<{ isLocated: boolean }>`
  background-color: ${(props) => props.isLocated && '#1D64AA'};
  color: ${(props) =>
    props.isLocated ? props.theme.colors.white : props.theme.colors.gray600};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray600};
  text-align: center;
  line-height: 50px;
  height: 50px;
  font-weight: bold;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
`;
const MenuInfo = [
  { title: '인사말', path: '/greeting', id: 0 },
  { title: '조직도', path: '/organization', id: 0 },
  { title: '오시는길', path: '/location', id: 0 },
  { title: '총학소식', path: '/council-news', id: 1 },
  { title: '공약', path: '/pledge', id: 1 },
  { title: '청원게시판', path: '/board-petition/boards', id: 2 },
  { title: '문의 및 건의사항', path: '/board-suggestion/boards', id: 2 },
  { title: 'Q&A', path: '/qna', id: 3 },
  { title: 'My voice', path: '/my-voice', id: 3 },
];

interface ISideNav {
    margin?: string;
}

SideNav.defaultProps = {
    margin: '40px 0 0 0'
}

function SideNav({ margin } : ISideNav): JSX.Element {
  const location = useLocation();
  const menuIndex = MenuInfo.findIndex(
    (menu) => menu.path === location.pathname,
  );
  const menuList = MenuInfo.filter(
    (menu) => menu.id === MenuInfo[menuIndex].id,
  );
  return (
    <Nav margin={margin}>
      <Hr />
      {menuList.map((item) => (
        <Link key={item.path} to={item.path}>
            <NavItem isLocated={item.path === location.pathname}>
            {item.title}
            </NavItem>
        </Link>
      ))}
    </Nav>
  );
}

export default SideNav;
