import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NavItems } from './NavItems';

const Container = styled.div<{ opened: boolean }>`
  position: absolute;
  z-index: 100;
  /* background-color: ${({ theme }) => theme.colors.white}; */
  height: 100vh;
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
`;

const UserSection = styled.section`
  width: 100%;
  height: 80px;
  display: flex;
  padding-right: 30px;
  align-items: center;
  justify-content: flex-end;
`;

const NavSection = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const NavBlock = styled.li`
  width: 100%;
  border: 1px solid black;
`;

const PathTitle = styled.div`
  height: 100px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

function MobileMenu(): JSX.Element {
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <>
      <Container opened={opened}>
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
      <MenuContainer opened={opened}>
        <UserSection>로그인</UserSection>
        <NavSection>
          {NavItems.map((item) => (
            <NavBlock key={item.id}>
              {item.subPath ? (
                <div>
                  <PathTitle>expand</PathTitle>
                </div>
              ) : (
                <PathTitle>{item.path}</PathTitle>
              )}
            </NavBlock>
          ))}
        </NavSection>
      </MenuContainer>
    </>
  );
}

export default MobileMenu;
