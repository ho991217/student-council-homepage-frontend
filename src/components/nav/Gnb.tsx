import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from 'static/images/logos/logo-transparent.png';
import { NavItems } from './NavItems';
import Dropdown from './Dropdown';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 80px;
  font-style: normal;
  font-weight: 700;
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: white;
`;
const LogoLink = styled(Link)`
  margin-left: 12.5%;
`;

const Img = styled.img``;

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 45vw;
  margin-right: 13%;
`;

const Li = styled.li`
  width: 9.375rem;
  text-align: center;
  position: relative;
  a {
    color: ${(props) => props.theme.colors.gray900};
    font-size: 1.125rem;
  }
`;

// FIXME: hover 시에 dropdown 되면 좋을 것 같습니다.
// TODO: sticky로 동작하게 만들어주시면 좋겠습니다.
function Gnb() {
  const [infoOpen, setInfoOpen] = useState(false);
  return (
    <Nav>
      <LogoLink to="/">
        <Img src={Logo} alt="dankook logo" width={200} height={40} />
      </LogoLink>

      <Ul>
        {NavItems.map((item) => (
          <Li key={item.id} onMouseOver={() => console.log('z')}>
            <Link to={item.path}>{item.title}</Link>
            {item.subPath && <Dropdown path={item.subPath} />}
          </Li>
        ))}
      </Ul>
    </Nav>
  );
}

export default Gnb;
