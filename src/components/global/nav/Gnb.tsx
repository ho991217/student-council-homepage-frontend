import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Desktop, Mobile, Tablet } from 'hooks/MediaQueries';

import Logo from '../Logo';
import { NavItems } from './NavItems';
import Dropdown from './Dropdown';
import UserMenu from './UserMenu';

const Nav = styled.nav`
  display: grid;
  place-items: center;
  width: 100%;
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: white;
  user-select: none;
`;

const InnerNav = styled.div`
  max-width: 1440px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const Li = styled.li`
  height: 100%;
  width: 150px;
  display: block;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.1s ease-in-out;
  :hover {
    background-color: rgba(0, 0, 0, 0.09);
  }
`;

const MenuLink = styled(Link)`
  color: ${(props) => props.theme.colors.gray900};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Svg = styled.svg`
  margin-right: 2.4rem;
`;

const Line1 = styled.path<{ opened: boolean }>`
  fill: none;
  stroke: black;
  stroke-width: 6;
  transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  stroke-dasharray: ${({ opened }) => (opened ? '90 207' : '60 207')};
  stroke-width: 6;
  stroke-dashoffset: ${({ opened }) => (opened ? -134 : 0)};
`;

const Line2 = styled.path<{ opened: boolean }>`
  fill: none;
  stroke: black;
  stroke-width: 6;
  transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  stroke-dasharray: ${({ opened }) => (opened ? '1 60' : '60 60')};
  stroke-width: 6;
  stroke-dashoffset: ${({ opened }) => (opened ? -30 : 0)};
`;

const Line3 = styled.path<{ opened: boolean }>`
  fill: none;
  stroke: black;
  stroke-width: 6;
  transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  stroke-dasharray: ${({ opened }) => (opened ? '90 207' : '60 207')};
  stroke-width: 6;
  stroke-dashoffset: ${({ opened }) => (opened ? -134 : 0)};
`;

function Gnb(): JSX.Element {
  const [open, setOpen] = useState<boolean[]>(
    Array.from({ length: NavItems.length }, () => false),
  );
  const [mobileMenuOpened, setMobileMenuOpened] = useState<boolean>(false);
  const handleHover = (index: number, state: boolean): void => {
    const newOpen = [...open];
    newOpen[index] = state;
    setOpen(newOpen);
  };

  return (
    <>
      <Desktop>
        <UserMenu />
      </Desktop>
      <Nav>
        <InnerNav>
          <Link to="/">
            <Logo />
          </Link>

          <Desktop>
            <Ul>
              {NavItems.map((item) => (
                <Li
                  key={item.id}
                  onMouseOver={() => handleHover(Number(item.id), true)}
                  onMouseLeave={() => handleHover(Number(item.id), false)}
                >
                  <MenuLink to={item.path === '/' ? '#' : item.path}>
                    {item.title}
                  </MenuLink>
                  {item.subPath && open[Number(item.id)] && (
                    <Dropdown path={item.subPath} />
                  )}
                </Li>
              ))}
            </Ul>
          </Desktop>

          <Tablet>
            {/* <Ul>
              {NavItems.map((item) => (
                <Li
                  key={item.id}
                  onMouseOver={() => handleHover(Number(item.id), true)}
                  onMouseLeave={() => handleHover(Number(item.id), false)}
                >
                  <MenuLink to={item.path}>{item.title}</MenuLink>
                  {item.subPath && open[Number(item.id)] && (
                    <Dropdown path={item.subPath} />
                  )}
                </Li>
              ))}
            </Ul> */}
            <Svg
              onClick={() => setMobileMenuOpened((prev) => !prev)}
              width="36"
              height="36"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Line1
                opened={mobileMenuOpened}
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              />
              <Line2 opened={mobileMenuOpened} d="M 20,50 H 80" />
              <Line3
                opened={mobileMenuOpened}
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              />
            </Svg>
          </Tablet>

          <Mobile>
            <Svg
              onClick={() => setMobileMenuOpened((prev) => !prev)}
              width="36"
              height="36"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Line1
                opened={mobileMenuOpened}
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              />
              <Line2 opened={mobileMenuOpened} d="M 20,50 H 80" />
              <Line3
                opened={mobileMenuOpened}
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              />
            </Svg>
          </Mobile>
        </InnerNav>
      </Nav>
    </>
  );
}

export default Gnb;
