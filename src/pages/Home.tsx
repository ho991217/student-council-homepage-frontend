import axios from 'axios';
import Carousel from 'components/home/carousel/Carousel';
import { ImageProps } from 'components/home/carousel/CarouselProps';
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
  // TODO: 이미지를 불러오는 함수, 백엔드 통신시에 변경해야 할 부분
  // 권장 해상도: 1920x530 (1440x530 영역 밖으로는 넘어가지 않는 것 권장)

  useEffect(() => {
    axios
      .get('/api/main')
      .then(function (response) {
        const result = response.data.data;
        setImages(result.carousels);
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      });
  }, []);

  // const getImages = async () => {
  //   axios.get('https://picsum.photos/1920/530').then((res) => {
  //     setImages((prev) => [
  //       ...prev,
  //       {
  //         url: res.request.responseURL,
  //         id: res.headers['picsum-id'],
  //         title: '제목',
  //         alt: 'picsum image',
  //       },
  //     ]);
  //   });
  // };

  return (
    <Wrapper>
      <Carousel images={images} />
      <Tiles />
    </Wrapper>
  );
}

export default Home;
