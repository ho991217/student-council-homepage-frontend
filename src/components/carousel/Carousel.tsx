import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import DefaultImg from '../../static/images/carousel/carousel-default.png';
import { CarouselProps } from './CarouselProps';
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

const Chevron = styled.div<{ side: string }>`
  height: 100%;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: box-shadow 0.25s ease-in-out;
`;

// 메인 컴포넌트
function Carousel(): JSX.Element {
  const [imgUrls, setImgUrls] = useState<CarouselProps[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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
    if (currentSlide === 0) {
      setCurrentSlide(imgUrls.length - 1);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide + 1 === imgUrls.length) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  // 컴포넌트가 처음 렌더링 될 때
  useEffect(() => {
    // 스토리지 서버에서 캐러셀 이미지 받아올 것
    getImgUrls();
    getImgUrls();
    getImgUrls();
  }, []);

  return (
    <Wrapper>
      <ControlsWrapper>
        <Chevron onClick={prevSlide} side="left">
          <svg
            width="11"
            height="20"
            viewBox="0 0 11 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.26451 19.5375C9.44051 19.7125 9.67051 19.8005 9.90051 19.8005C10.1305 19.8005 10.3625 19.7125 10.5375 19.5365C10.8885 19.1835 10.8875 18.6145 10.5355 18.2635L2.17251 9.9225L10.5375 1.5365C10.8885 1.1835 10.8875 0.614501 10.5355 0.263501C10.1835 -0.0884995 9.61351 -0.0874995 9.26251 0.264501L0.262512 9.2885C0.0945117 9.4585 -0.000488281 9.6875 -0.000488281 9.9255C0.000511719 10.1645 0.0955117 10.3935 0.264512 10.5615L9.26451 19.5375Z"
              fill="white"
            />
          </svg>
        </Chevron>
        <Chevron onClick={nextSlide} side="right">
          <svg
            width="11"
            height="20"
            viewBox="0 0 11 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.262138 19.536C0.438138 19.712 0.669138 19.8 0.900138 19.8C1.12914 19.8 1.36014 19.713 1.53514 19.537L10.5351 10.562C10.7041 10.393 10.7991 10.164 10.8001 9.926C10.8001 9.687 10.7051 9.458 10.5371 9.289L1.53714 0.265002C1.18614 -0.0869979 0.616138 -0.0889979 0.264138 0.263002C-0.0878621 0.614002 -0.0888621 1.184 0.262138 1.536L8.62714 9.923L0.264138 18.263C-0.0878621 18.614 -0.0888621 19.184 0.262138 19.536Z"
              fill="white"
            />
          </svg>
        </Chevron>
      </ControlsWrapper>
      {imgUrls.length > 0 &&
        imgUrls.map((obj: CarouselProps, index: number) => (
          <Slide
            key={obj.id}
            url={obj.url}
            index={index}
            cur={currentSlide}
            size={imgUrls.length}
          />
        ))}
    </Wrapper>
  );
}

export default Carousel;
