import styled from 'styled-components';

// 인터페이스 import
import { DotNavProps } from './CarouselProps';

const Dot = styled.div<{ active: boolean }>`
  width: ${(props) => (props.active ? '30px' : '7.5px')};
  height: 7.5px;
  border-radius: ${(props) => (props.active ? '5px' : '9999px')};
  background-color: ${(props) =>
    props.active ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.66)'};
  margin: 0 5px;
  transition: all 0.25s ease-in-out;
  cursor: ${(props) => (props.active ? 'default' : 'pointer')};
  z-index: 1;
`;

function DotNav({ active, onClick }: DotNavProps): JSX.Element {
  return <Dot active={active} onClick={onClick} />;
}

export default DotNav;
