import axios from 'axios';
import Carousel from 'components/home/carousel/Carousel';
import { getCarouselImages } from 'components/home/carousel/getCarouselImages';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

const CarouselContaier = styled.div`
  display: flex;
  width: 100%;
  height: 500px;
  align-items: center;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
`;

const PicContainer = styled.div`
  height: 100%;
  border: 0.5px solid ${({ theme }) => theme.colors.gray200};
  margin: 5px 10px;
`;

const CarouselImg = styled.img`
  height: 100%;
`;

function Admin(): JSX.Element {
  const [currentImage, setCurrentImage] = useState<FormData>();
  const [carouselImages, setCarouselImages] = useState([]);
  const [cookies] = useCookies(['X-AUTH-TOKEN']);

  /** 파일이 변경되었을 때 호출되는 함수 */
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      const formData = new FormData();
      formData.append('imageFile', uploadFile);
      setCurrentImage(formData);
    }
  };

  /** 이미지를 formData 에 담아서 서버로  전송하는 함수 */
  const handleAddImage = () => {
    axios({
      url: '/api/carousel',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
      },
      data: currentImage,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getCarouselImages().then((res) => setCarouselImages(res.data));
  }, []);
  return (
    <Container>
      <Carousel images={carouselImages} />
      {/* <CarouselContaier>
        {carouselImages.map(({ id, url }) => (
          <PicContainer key={id}>
            <CarouselImg src={url} alt="이미지" />
          </PicContainer>
        ))}
      </CarouselContaier> */}
      <input type="file" accept="image/*" onChange={onChangeImage} />
      <input type="button" value="이미지 등록" onClick={handleAddImage} />
    </Container>
  );
}

export default Admin;
