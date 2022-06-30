import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { lock, unlock, clearBodyLocks } from 'tua-body-scroll-lock';
import styled from 'styled-components';
import { NavItems } from './NavItems';

const Container = styled.div<{ opened: boolean }>`
  position: absolute;
  z-index: 100;
  /* background-color: ${({ theme }) => theme.colors.white}; */

  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  right: ${({ opened }) => (opened ? '220px' : '0px')};
  /* border-bottom-left-radius: 10px; */
  transition: right 0.3s ease-in-out;
`;

const Svg = styled.svg`
  path {
    fill: none;
    stroke: black;
    stroke-width: 6;
    transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const Line1 = styled.path<{ opened: boolean }>`
  stroke-dasharray: ${({ opened }) => (opened ? '90 207' : '60 207')};
  stroke-width: 6;
  stroke-dashoffset: ${({ opened }) => (opened ? -134 : 0)};
`;

const Line2 = styled.path<{ opened: boolean }>`
  stroke-dasharray: ${({ opened }) => (opened ? '1 60' : '60 60')};
  stroke-width: 6;
  stroke-dashoffset: ${({ opened }) => (opened ? -30 : 0)};
`;

const Line3 = styled.path<{ opened: boolean }>`
  stroke-dasharray: ${({ opened }) => (opened ? '90 207' : '60 207')};
  stroke-width: 6;
  stroke-dashoffset: ${({ opened }) => (opened ? -134 : 0)};
`;

const Blur = styled.div`
  z-index: 50;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(1.5px);
  background-color: rgb(0, 0, 0);
  transition: background-color 0.2s ease-in-out;
  animation: opacity 0.3s ease-in-out forwards;
  @keyframes opacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 33%;
    }
  }
`;

const MenuContainer = styled.div<{ opened: boolean }>`
  height: 100vh;
  width: 300px;
  right: ${({ opened }) => (opened ? 0 : '-300px')};
  z-index: 99;
  position: absolute;
  top: 0;
  background-color: ${({ theme }) => theme.colors.white};
  transition: right 0.3s ease-in-out;
  overflow-y: scroll;
`;

const UserSection = styled.section`
  width: 100%;
  height: 80px;
  display: flex;
  padding-right: 30px;
  align-items: center;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.gray700};
`;

const NavSection = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const NavBlock = styled.li`
  width: 100%;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Expandable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PathTitle = styled.div<{ mainPath?: boolean }>`
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, mainPath }) =>
    mainPath ? theme.colors.secondary : theme.colors.primary};
  padding: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Chevron = styled.svg`
  width: 16px;
  fill: ${({ theme }) => theme.colors.white};
`;

const MainPath = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const SubPath = styled.div<{ pathCount: number; opened: boolean }>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  position: relative;
  overflow: hidden;
  height: ${({ opened, pathCount }) => (opened ? 80 * pathCount : 0)}px;
  transition: height 0.2s ease-in-out;
`;

function MobileMenu(): JSX.Element {
  const [opened, setOpened] = useState<boolean>(false);
  const navRef = useRef(null);
  const [subpathOpened, setSubpathOpened] = useState<boolean[]>(
    Array.from({ length: NavItems.length }, () => false),
  );

  // ios 스크롤락에 대한 부분
  useEffect(() => {
    if (navRef.current) {
      if (opened) {
        lock(navRef.current);
      } else {
        unlock(navRef.current);
      }
    }
    return () => {
      clearBodyLocks();
    };
  }, [opened, navRef]);

  return (
    <>
      <Container ref={navRef} opened={opened}>
        <Svg
          onClick={() => setOpened((prev) => !prev)}
          width="36"
          height="36"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Line1
            opened={opened}
            d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
          />
          <Line2 opened={opened} d="M 20,50 H 80" />
          <Line3
            opened={opened}
            d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
          />
        </Svg>
      </Container>
      {opened && <Blur onClick={() => setOpened(false)} />}
      <MenuContainer ref={navRef} opened={opened}>
        <UserSection>
          <Link to="/login">로그인</Link>
        </UserSection>
        <NavSection>
          {NavItems.map((item) => (
            <NavBlock key={item.id}>
              {item.subPath ? (
                <Expandable
                  onClick={() => {
                    const newOpen = [...subpathOpened];
                    newOpen[Number(item.id)] = !newOpen[Number(item.id)];
                    setSubpathOpened(newOpen);
                  }}
                >
                  <MainPath>
                    <PathTitle mainPath>
                      {item.title}
                      <Chevron viewBox="0 0 448 512">
                        <path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z" />
                      </Chevron>
                    </PathTitle>
                  </MainPath>
                  <SubPath
                    opened={subpathOpened[Number(item.id)]}
                    pathCount={item.subPath.length}
                  >
                    {item.subPath.map((sub) => (
                      <NavLink
                        key={sub.id}
                        to={sub.path}
                        onClick={() => setOpened(false)}
                      >
                        <PathTitle>{sub.title}</PathTitle>
                      </NavLink>
                    ))}
                  </SubPath>
                </Expandable>
              ) : (
                <NavLink to={item.path} onClick={() => setOpened(false)}>
                  <PathTitle mainPath>{item.title}</PathTitle>
                </NavLink>
              )}
            </NavBlock>
          ))}
          <div style={{ width: '100%', height: 80 }} />
        </NavSection>
      </MenuContainer>
    </>
  );
}

export default MobileMenu;
