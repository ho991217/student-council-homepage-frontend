import axios from 'axios';
import { getCarouselImages } from 'pages/home/components/carousel/getCarouselImages';
import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { PulseLoader } from 'react-spinners';
import { useErrorModal } from 'hooks/UseErrorModal';

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Table = styled.table`
  width: 100%;
  max-width: 1200px;
  padding: 1em;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  margin-top: 2rem;
  margin-bottom: 4rem;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  background-color: ${({ theme }) => theme.colors.gray040};
`;

const Th = styled.th`
  padding: 1em;
  text-align: center;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.size.base};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
`;

const Td = styled.td`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
`;

const Button = styled.input.attrs({ type: 'button' })`
  width: 100%;
  height: 50px;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
`;

const Image = styled.img`
  width: 50%;
`;

const ImageInput = styled.input.attrs({ type: 'file', accept: 'image/*' })`
  /* width: 100%; */
  padding: 10px;
`;

const UrlInput = styled.input.attrs({ type: 'text' })`
  min-height: 50px;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 10px;
`;

type CarouselImage = {
  id: number;
  url: string;
  redirectUrl: string;
};

function Admin() {
  const [currentImage, setCurrentImage] = useState<FormData>();
  const [redirectUrl, setRedirectUrl] = useState('');
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);

  const { renderModal, setErrorMessage, open } = useErrorModal();

  /** 파일이 변경되었을 때 호출되는 함수 */
  const onInputImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      const formData = new FormData();
      formData.append('imageFile', uploadFile);
      setCurrentImage(formData);
    }
  };

  /** 이미지를 formData 에 담아서 서버로  전송하는 함수 */
  const handleAddImage = async () => {
    if (currentImage) {
      currentImage.append('redirectUrl', redirectUrl);
      try {
        await axios({
          url: '/main/carousel',
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: currentImage,
        });
        const { data } = await getCarouselImages();

        setCarouselImages(data);
      } catch (e) {
        const { response } = e as any;
        console.log(response);
        // setErrorMessage(response.data.message[0]);
        open();
      }
    } else {
      setErrorMessage('사진을 먼저 업로드하세요.');
      open();
    }
  };

  /** 이미지 삭제를 관리하는 함수 */
  const handleDeletePic = async (id: number) => {
    await axios({
      url: `/main/carousel/${id}`,
      method: 'delete',
    });
    const { data } = await getCarouselImages();
    setCarouselImages(data);
  };

  useEffect(() => {
    getCarouselImages().then((res) => setCarouselImages(res.data));
  }, []);

  return (
    <>
      {renderModal()}
      <Container>
        <Table>
          <Thead>
            <Tr>
              <Th>이미지</Th>
              <Th>Redirect Url</Th>
              <Th>삭제</Th>
            </Tr>
          </Thead>
          <Tbody>
            {carouselImages.map((image: CarouselImage) => (
              <Tr key={image.id}>
                <Td>
                  <Image src={image.url} alt="이미지" />
                </Td>
                <Td>{image.redirectUrl}</Td>
                <Td>
                  <Button
                    onClick={() => handleDeletePic(image.id)}
                    value="삭제"
                  />
                </Td>
              </Tr>
            ))}
            <Tr>
              <Td>
                <ImageInput accept="image/*" onInput={onInputImage} />
              </Td>
              <Td>
                <UrlInput
                  type="text"
                  placeholder="연결 url을 입력하세요."
                  onChange={(e) => setRedirectUrl(e.target.value)}
                  value={redirectUrl}
                />
              </Td>
              <Td>
                <Button value="등록" onClick={handleAddImage} />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Container>
    </>
  );
}

export default Admin;
