import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NavItems } from './NavItems';

const Nav = styled.ul<{ margin?: string }>`
  width: 180px;
  font-size: 18px;
  margin: ${(props) => props.margin};
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
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
  { title: '인사말', category: '/greeting', path: '/greeting', id: 0 },
  { title: '공약', category: '/pledge', path: '/pledge', id: 0 },
  { title: '조직도', category: '/organization', path: '/organization', id: 0 },
  { title: '오시는길', category: '/location', path: '/location', id: 0 },
  {
    title: '총학소식',
    category: '/council-news',
    path: '/council-news',
    id: 1,
  },
  { title: '회칙', category: '/rules', path: '/rules', id: 1 },
  { title: '회의록', category: '/conference', path: '/conference', id: 2 },
  {
    title: '청원게시판',
    category: '/board-petition',
    path: '/board-petition/boards',
    id: 3,
  },
  {
    title: '자유게시판',
    category: '/board-suggestion',
    path: '/board-suggestion/boards',
    id: 3,
  },
  { 
    title: 'Q&A', 
    category: '/voc/qna', 
    path: '/voc/qna/boards',
    id: 4 
  },
  {
    title: 'My voice',
    category: '/voc/my-voice',
    path: '/voc/my-voice/boards',
    id: 4,
  },
];

interface ISideNav {
  margin?: string;
}

SideNav.defaultProps = {
  margin: '40px 0 0 0',
};

function SideNav({ margin }: ISideNav) {
  const location = useLocation();
  const menuIndex = MenuInfo.findIndex((menu) => {
    return location.pathname.indexOf(menu.category) === 0;
  });
  const menuList = MenuInfo.filter(
    (menu) => menu.id === MenuInfo[menuIndex].id,
  );

  return (
    <Nav margin={margin}>
      <Hr />
      {menuList.map((item) => (
        <Link key={item.path} to={item.path}>
          <NavItem isLocated={location.pathname.indexOf(item.category) === 0}>
            {item.title}
          </NavItem>
        </Link>
      ))}
    </Nav>
  );
}

export default SideNav;
