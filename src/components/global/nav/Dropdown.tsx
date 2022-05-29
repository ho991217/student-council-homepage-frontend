import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NavigationProps } from './NavigationProps';

const Ul = styled.ul`
  position: absolute;
  top: 80px;
  width: 150px;
  background-color: ${(props) => props.theme.colors.primary};
  z-index: 15;

  :last-child {
    border-radius: 0px 0px 5px 5px;
  }

  -webkit-animation: swing-in-top-fwd 0.5s
    cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  @-webkit-keyframes swing-in-top-fwd {
    0% {
      -webkit-transform: rotateX(-100deg);
      transform: rotateX(-100deg);
      -webkit-transform-origin: top;
      transform-origin: top;
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateX(0deg);
      transform: rotateX(0deg);
      -webkit-transform-origin: top;
      transform-origin: top;
      opacity: 1;
    }
  }
  @keyframes swing-in-top-fwd {
    0% {
      -webkit-transform: rotateX(-100deg);
      transform: rotateX(-100deg);
      -webkit-transform-origin: top;
      transform-origin: top;
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateX(0deg);
      transform: rotateX(0deg);
      -webkit-transform-origin: top;
      transform-origin: top;
      opacity: 1;
    }
  }
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
  font-weight: 500;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  user-select: none;
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
