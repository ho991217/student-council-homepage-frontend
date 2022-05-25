import axios from 'axios';
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
        <Chevron onClick={prevSlide} direction="left" />
        <DotNavContainer>
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
          />
        ))}
    </Wrapper>
  );
}

export default Carousel;
