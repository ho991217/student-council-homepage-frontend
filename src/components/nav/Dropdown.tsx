import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NavigationProps } from './NavItems';

const Ul = styled.ul`
  position: absolute;
  top: 80px;
  width: 150px;
  background-color: ${(props) => props.theme.colors.primary};
  z-index: 15;
`;

const Li = styled.li`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
  :hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

const SubMenuLink = styled(Link)`
  color: ${(props) => props.theme.colors.white};
  font-weight: 600;
  font-size: 1.125rem;
  display: flex; 
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Svg = styled.svg`
  position: relative;
  top: -12px;
  fill: ${(props) => props.theme.colors.primary};
`;

function Dropdown({ path }: { path: NavigationProps[] }): JSX.Element {
  return (
    <Ul>
      <Svg
        width="44"
        height="12"
        viewBox="0 0 44 12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M22 0L43.6506 11.25H0.349365L22 0Z" />
      </Svg>

      {path.map((item) => (
        <Li key={item.id}>
          <SubMenuLink to="/">{item.title}</SubMenuLink>
        </Li>
      ))}
    </Ul>
  );
}

export default Dropdown;
