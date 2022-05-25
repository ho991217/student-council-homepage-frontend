import styled from 'styled-components';
import { SlideProps } from './CarouselProps';

const Wrapper = styled.div<SlideProps>`
  width: 100%;
  height: 100%;
  display: flex;
  background-image: ${(props) => `url(${props.url})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  transform: ${(props) =>
    `translateX(${(props.index - (props.cur % props.size)) * 100}%)`};
  transition: transform 0.25s ease-in-out;
`;

function Slide({ url, index, cur, size }: SlideProps): JSX.Element {
  return <Wrapper url={url} index={index} cur={cur} size={size} />;
}

export default Slide;
