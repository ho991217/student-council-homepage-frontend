import axios from 'axios';
import Carousel from 'components/home/carousel/Carousel';
import { ImageProps } from 'components/home/carousel/CarouselProps';
import { getCarouselImages } from 'components/home/carousel/getCarouselImages';
import Tiles from 'components/home/tiles/Tiles';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

function Home() {
  const [images, setImages] = useState<ImageProps[]>([]);
  // 권장 해상도: 1920x530 (1440x530 영역 밖으로는 넘어가지 않는 것 권장)

  useEffect(() => {
    getCarouselImages().then(({ data }) => setImages(data));
  }, []);

  return (
    <Wrapper>
      <Carousel images={images} />
      <Tiles />
    </Wrapper>
  );
}

export default Home;
