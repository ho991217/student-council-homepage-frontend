import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { NavItems } from './NavItems';
import Dropdown from './Dropdown';

import Logo from '../../static/images/logos/logo-transparent.png';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 80px;
  font-style: normal;
  font-weight: 700;
  overflow: hidden;
`;
const LogoLink = styled(Link)`
  margin-left: 12.5%;
`;

const Img = styled.img``;

const Ul = styled.ul<{ dropDown: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 45vw;
  margin-right: 13%;
  ${(props) =>
    props.dropDown &&
    css`
      display: 'none';
    `}
`;

const Li = styled.li`
  width: 9.375rem;
  text-align: center;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.gray900};
    font-size: 1.125rem;
    line-height: 1.22;
  }
`;

// FIXME: hover 시에 dropdown 되면 좋을 것 같습니다.
// TODO: sticky로 동작하게 만들어주시면 좋겠습니다.
function Gnb() {
  const [dropDown, setDropDown] = useState(false);

  const closeMenuHandler = () => setDropDown(false);

  const dropDownHandler = () => {
    setDropDown((dropDown) => !dropDown);
  };

  return (
    <Nav>
      <LogoLink to="/" onClick={closeMenuHandler}>
        <Img src={Logo} alt="dankook logo" width="200px" height="40px" />
      </LogoLink>

      <Ul dropDown={dropDown}>
        <Li>
          <Link to="/" onClick={dropDownHandler}>
            총학생회
          </Link>
          {dropDown && <Dropdown />}
        </Li>
        {NavItems.map((item) => {
          return (
            <Li key={item.id}>
              <Link to={item.path} onClick={closeMenuHandler}>
                {item.title}
              </Link>
            </Li>
          );
        })}
      </Ul>
    </Nav>
  );
}

export default Gnb;
