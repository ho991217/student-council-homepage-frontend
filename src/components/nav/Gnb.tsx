import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from './Logo';
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
`;

const MenuLink = styled(Link)`
  color: ${(props) => props.theme.colors.gray900};
  font-weight: 600;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

function Gnb(): JSX.Element {
  const [open, setOpen] = useState<boolean[]>([false, false, false, false]);
  return (
    <>
      <UserMenu />
      <Nav>
        <InnerNav>
          <Logo />
          <Ul>
            {NavItems.map((item) => (
              <Li
                key={item.id}
                onMouseOver={() => {
                  setOpen(() => {
                    const newOpen = [...open];
                    newOpen[Number(item.id)] = true;
                    return newOpen;
                  });
                }}
                onMouseLeave={() => {
                  setOpen(() => {
                    const newOpen = [...open];
                    newOpen[Number(item.id)] = false;
                    return newOpen;
                  });
                }}
              >
                <MenuLink to={item.path}>{item.title}</MenuLink>
                {item.subPath && open[Number(item.id)] && (
                  <Dropdown path={item.subPath} />
                )}
              </Li>
            ))}
          </Ul>
        </InnerNav>
      </Nav>
    </>
  );
}

export default Gnb;
