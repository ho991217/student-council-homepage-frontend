import styled from 'styled-components';
import ToggleAutoIcon from './ToggleAutoIcon';

// 인터페이스 import
import { ToggleAutoSlideProps } from './CarouselProps';

const ToggleAutoSlide = styled.div`
  all: unset;
  line-height: 0;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 20px;
  cursor: pointer;
  svg {
    position: absolute;
    bottom: -2px;
  }
`;

function AutoSlide({
  onClick,
  autoInterval,
}: ToggleAutoSlideProps): JSX.Element {
  return (
    <ToggleAutoSlide onClick={onClick}>
      <ToggleAutoIcon auto={autoInterval > 0} />
    </ToggleAutoSlide>
  );
}

export default AutoSlide;
