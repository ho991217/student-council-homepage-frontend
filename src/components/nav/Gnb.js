import { Link } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from 'styles/Theme'
import { NavItems } from './NavItems'


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
  return (
    <ThemeProvider theme={theme}>
      <Nav>
        <LogoLink to='/'>
          <Img
            src="https://portal.dankook.ac.kr/portal-theme/images/custom/common/h1_logo.png" 
            alt="dankook logo"
            width="186.67px" 
            height="39.51px"
          />
        </LogoLink>

        <Ul>
          {NavItems.map((item) => {
            return (
              <Li key={item.id}>
                <Link to={item.path}>
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