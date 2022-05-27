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

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

function Dropdown({ path }: { path: NavigationProps[] }): JSX.Element {
  return (
    <Ul>
      {path.map((item) => (
        <Li key={item.id}>
          <Link to="/">{item.title}</Link>
        </Li>
      ))}
    </Ul>
  );
}

export default Dropdown;
