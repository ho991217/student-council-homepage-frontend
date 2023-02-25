// 훅스, 라이브러리 import
import { useInterval } from 'hooks/UseInterval';
import { useState } from 'react';
import styled from 'styled-components';

// 인터페이스 import
import { ImageProps } from './CarouselProps';

// 컴포넌트 import
import AutoSlide from './AutoSlide';
import Chevron from './Chevron';
import DotNav from './DotNav';
import Slide from './Slide';

// 스타일드 컴포넌트
const Wrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.media.desktop} {
    height: 28.125vw;
  }
  ${({ theme }) => theme.media.tablet} {
    height: 300px;
  }
  ${({ theme }) => theme.media.mobile} {
    height: 200px;
  }
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden; ;
`;

const ControlsWrapper = styled.div`
  max-width: 1440px; // 안쪽 경계 1440px로 지정
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DotNavContainer = styled.div`
  height: 100%;
  padding-bottom: 40px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

// 메인 컴포넌트
function Carousel({ images }: { images: Array<ImageProps> }): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [autoInterval, setAutoInterval] = useState<number>(5000);

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

  // 5초 마다 자동으로 슬라이드 넘김
  useInterval(nextSlide, images.length > 0 ? autoInterval : 0);

  return (
    <Wrapper>
      {images.length > 0 && (
        <>
          {images.map((obj: ImageProps, index: number) => (
            <Slide
              key={obj.id}
              url={obj.url}
              index={index}
              cur={currentSlide}
              size={images.length}
              alt={obj.alt}
              redirectUrl={obj.redirectUrl}
            />
          ))}
          {images.length > 1 && (
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
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Carousel;
