import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { ThemeProvider, css } from 'styled-components'
import { theme } from 'styles/Theme'
import { NavItems } from './NavItems'
import Dropdown from './Dropdown';


const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 80px;
  font-family: 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  overflow: hidden;
`
const LogoLink = styled(Link)`
  margin-left: 12.5%;
`

const Img = styled.img`
  cursor: pointer;  
`

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 45vw;
  margin-right: 13%;
  ${(props) => (props.dropDown && css`
    display: 'none';
  `)}
`

const Li = styled.li`
  width: 9.375rem;
  text-align: center;

  a { 
    text-decoration: none;
    color: ${props => props.theme.colors.gray900};
    font-size: 1.125rem;
    line-height: 1.22;
  }
`

function Gnb() {
  const [dropDown, setDropDown] = useState(false);

  const closeMenuHandler = () => setDropDown(false);

  const dropDownHandler = () => {
    setDropDown(dropDown => !dropDown)
  }

  return (
    <ThemeProvider theme={theme}>
      <Nav>
        <LogoLink to='/' onClick={closeMenuHandler}>
          <Img
            src="https://portal.dankook.ac.kr/portal-theme/images/custom/common/h1_logo.png" 
            alt="dankook logo"
            width="186.67px" 
            height="39.51px"
          />
        </LogoLink>

        <Ul dropDown={dropDown}>
          <Li>
            <Link
              to='/' 
              onClick={dropDownHandler}
            >
              총학생회
            </Link>
            {dropDown && <Dropdown />}
          </Li>
          {NavItems.map((item) => {
            return (
              <Li key={item.id}>
                <Link 
                  to={item.path}
                  onClick={closeMenuHandler}
                >
                  {item.title}
                </Link>
              </Li>
            )
          })}
        </Ul>
      </Nav>
    </ThemeProvider>
  )
}

export default Gnb