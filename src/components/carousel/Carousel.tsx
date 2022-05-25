// 훅스, 라이브러리 import
import axios from 'axios';
import { useInterval } from 'hooks/UseInterval';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// static 이미지 import
import DefaultImg from '../../static/images/carousel/carousel-default.png';

// 인터페이스 import
import { ImageProps } from './CarouselProps';

// 컴포넌트 import
import AutoSlide from './AutoSlide';
import Chevron from './Chevron';
import DotNav from './DotNav';
import Slide from './Slide';

// 스타일드 컴포넌트
const Wrapper = styled.div<{ theme: string }>`
  width: 100%;
  height: 530px;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-image: url(${DefaultImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
`;

const ControlsWrapper = styled.div`
  max-width: 1440px; // 안쪽 경계 1440px로 지정
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`;

const DotNavContainer = styled.div`
  height: 100%;
  padding-bottom: 40px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

// 메인 컴포넌트
function Carousel(): JSX.Element {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoInterval, setAutoInterval] = useState(5000);

  // 이미지를 불러오는 함수, 백엔드 통신시에 변경해야 할 부분
  const getImages = async () => {
    axios.get('https://picsum.photos/1920/530').then((res) => {
      setImages((prev) => [
        ...prev,
        {
          url: res.request.responseURL,
          id: res.headers['picsum-id'],
          title: '제목',
          alt: 'picsum image',
        },
      ]);
    });
  };

  // 캐러셀 조작 함수
  const prevSlide = () => {
    if (currentSlide <= 0) {
      setCurrentSlide(images.length - 1);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide + 1 >= images.length) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const toggleAutoSlide = () => {
    if (autoInterval > 0) {
      setAutoInterval(0);
    } else {
      setAutoInterval(5000);
    }
  };

  // 컴포넌트가 처음 렌더링 될 때
  useEffect(() => {
    // 스토리지 서버에서 캐러셀 이미지 받아올 것
    getImages();
    getImages();
    getImages();
  }, []);

  // 5초 마다 자동으로 슬라이드 넘김
  useInterval(nextSlide, images.length > 0 ? autoInterval : 0);

  return (
    <Wrapper>
      {images.length > 0 && (
        <>
          <ControlsWrapper>
            <Chevron onClick={prevSlide} direction="left" />
            <DotNavContainer>
              <AutoSlide
                onClick={toggleAutoSlide}
                autoInterval={autoInterval}
              />
              {images.map((img: ImageProps, index: number) => (
                <DotNav
                  onClick={() => setCurrentSlide(index)}
                  key={img.id}
                  active={index === currentSlide}
                />
              ))}
            </DotNavContainer>
            <Chevron onClick={nextSlide} direction="right" />
          </ControlsWrapper>
          {images.map((obj: ImageProps, index: number) => (
            <Slide
              key={obj.id}
              url={obj.url}
              index={index}
              cur={currentSlide}
              size={images.length}
              alt={obj.alt}
            />
          ))}
        </>
      )}
    </Wrapper>
  );
}

export default Carousel;
