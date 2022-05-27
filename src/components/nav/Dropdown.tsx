import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NavigationProps } from './NavItems';

const Ul = styled.ul`
  position: absolute;
  width: 150px;
  background-color: ${(props) => props.theme.colors.primary};
  z-index: 15;
  animation: popOpen 0.5s ease-out forwards;
  @keyframes popOpen {
    0% {
      opacity: 0;
      top: 0;
    }
    100% {
      opacity: 1;
      top: 3.02rem;
    }
  }
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
