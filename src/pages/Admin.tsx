import axios from 'axios';
import { getCarouselImages } from 'components/home/carousel/getCarouselImages';
import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CarouselContaier = styled.div`
  display: flex;
  width: 100%;
  height: 500px;
  align-items: center;
  margin-bottom: 50px;
`;

const PicContainer = styled.div`
  height: 100%;
  border: 0.5px solid ${({ theme }) => theme.colors.gray200};
  margin: 5px 10px;
  position: relative;
`;

const CarouselImg = styled.img`
  height: 100%;
`;

const IdContainer = styled.h1`
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  opacity: 0;
  font-size: ${({ theme }) => theme.fonts.size.xxl};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.red};
  transition: all 0.15s ease-in-out;
  :hover {
    backdrop-filter: blur(3px);
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 1;
    cursor: pointer;
  }
`;

const InputContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.gray040};
  padding: 50px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const InputTitle = styled.h2`
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.gray700};
  margin-bottom: 10px;
`;

const FileUploadButton = styled.label`
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.gray020};
  display: grid;
  place-content: center;
  border-radius: 5px;
`;

const FileUploadInput = styled.input.attrs({
  type: 'file',
  accept: 'image/*',
})`
  display: none;
`;

const FileUploadErrorMessage = styled.span`
  
`;

function Admin(): JSX.Element {
  const [currentImage, setCurrentImage] = useState<FormData>();
  const [carouselImages, setCarouselImages] = useState([]);
  const [cookies] = useCookies(['X-AUTH-TOKEN']);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const fileInputRef = useRef(null);

  /** 파일이 변경되었을 때 호출되는 함수 */
  const onInputImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      const formData = new FormData();
      formData.append('imageFile', uploadFile);
      setCurrentImage(formData);
      await handleAddImage(formData);
    }
  };

  /** 이미지를 formData 에 담아서 서버로  전송하는 함수 */
  const handleAddImage = async (currentImage: FormData) => {
    if (currentImage) {
      await axios({
        url: '/api/carousel',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
        },
        data: currentImage,
      });
      setErrorMsg('');
    } else {
      setErrorMsg('사진을 먼저 업로드하세요.');
    }
  };

  /** 이미지 삭제를 관리하는 함수 */
  const handleDeletePic = async (id: number) => {
    await axios({
      url: `/api/carousel/${id}`,
      method: 'delete',
      headers: {
        'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
      },
    });
    const { data } = await getCarouselImages();
    setCarouselImages(data);
  };

  useEffect(() => {
    getCarouselImages().then((res) => setCarouselImages(res.data));
  }, [carouselImages]);

  return (
    <Container>
      <CarouselContaier>
        {carouselImages.map(({ id, url }) => (
          <PicContainer key={id} onClick={() => handleDeletePic(id)}>
            <IdContainer>삭제</IdContainer>
            <CarouselImg src={url} alt="이미지" />
          </PicContainer>
        ))}
      </CarouselContaier>
      <InputContainer>
        <InputTitle>캐러셀 이미지 업로드</InputTitle>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <FileUploadButton htmlFor="file-input">업로드</FileUploadButton>
        <FileUploadInput id="file-input" onInput={onInputImage} />
        {errorMsg && (
          <FileUploadErrorMessage>{errorMsg}</FileUploadErrorMessage>
        )}
      </InputContainer>
    </Container>
  );
}

export default Admin;
