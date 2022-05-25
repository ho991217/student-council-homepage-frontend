import axios from 'axios';
import { useInterval } from 'hooks/UseInterval';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import DefaultImg from '../../static/images/carousel/carousel-default.png';
import { CarouselProps } from './CarouselProps';
import Chevron from './Chevron';
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
  max-width: 1920px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`;

const DotNavContainer = styled.div`
  height: 100%;
  padding-bottom: 50px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const DotNav = styled.div<{ active: boolean }>`
  width: ${(props) => (props.active ? '30px' : '7.5px')};
  height: 7.5px;
  border-radius: ${(props) => (props.active ? '5px' : '50%')};
  background-color: ${(props) =>
    props.active ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.66)'};
  margin: 0 10px;
  transition: all 0.25s ease-in-out;
  cursor: ${(props) => (props.active ? 'default' : 'pointer')};
`;

const ToggleAutoSlide = styled.div`
  all: unset;
  line-height: 0;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 20px;
  :active {
    background-color: rgba(255, 255, 255, 0.85);
  }
  svg {
    position: absolute;
    bottom: -2px;
  }
`;

// 메인 컴포넌트
function Carousel(): JSX.Element {
  const [imgUrls, setImgUrls] = useState<CarouselProps[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoInterval, setAutoInterval] = useState(5000);

  // 이미지를 불러오는 함수, 백엔드 통신시에 변경해야 할 부분
  const getImgUrls = async () => {
    axios.get('https://picsum.photos/1920/530').then((res) => {
      setImgUrls((prev) => [
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
      setCurrentSlide(imgUrls.length - 1);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide + 1 >= imgUrls.length) {
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
    getImgUrls();
    getImgUrls();
    getImgUrls();
  }, []);

  useInterval(nextSlide, autoInterval);

  return (
    <Wrapper>
      <ControlsWrapper>
        <Chevron onClick={prevSlide} direction="left" />
        <DotNavContainer>
          <ToggleAutoSlide onClick={toggleAutoSlide}>
            {autoInterval > 0 ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.70018 11.9268L11.1472 6.47241C11.4848 6.27727 11.4848 5.72334 11.1472 5.52759L1.70018 0.0731795C1.5317 -0.0243938 1.32322 -0.0243938 1.15474 0.0731795C0.985653 0.170753 0.881413 0.350748 0.881413 0.545895L0.881413 11.4547C0.881413 11.6493 0.985652 11.8299 1.15474 11.9268C1.32322 12.0244 1.5317 12.0244 1.70018 11.9268Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                width="12"
                height="12"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    fill="white"
                    d="M224,435.8V76.1c0-6.7-5.4-12.1-12.2-12.1h-71.6c-6.8,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6   C218.6,448,224,442.6,224,435.8z"
                  />
                  <path
                    fill="white"
                    d="M371.8,64h-71.6c-6.7,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6c6.7,0,12.2-5.4,12.2-12.2V76.1   C384,69.4,378.6,64,371.8,64z"
                  />
                </g>
              </svg>
            )}
          </ToggleAutoSlide>
          {imgUrls.map((img, index) => (
            <DotNav
              onClick={() => setCurrentSlide(index)}
              key={img.id}
              active={index === currentSlide}
            />
          ))}
        </DotNavContainer>
        <Chevron onClick={nextSlide} direction="right" />
      </ControlsWrapper>
      {imgUrls.length > 0 &&
        imgUrls.map((obj: CarouselProps, index: number) => (
          <Slide
            key={obj.id}
            url={obj.url}
            index={index}
            cur={currentSlide}
            size={imgUrls.length}
            alt={obj.alt}
          />
        ))}
    </Wrapper>
  );
}

export default Carousel;
