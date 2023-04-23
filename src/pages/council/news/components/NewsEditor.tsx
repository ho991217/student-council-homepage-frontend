import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SubmitButtonM from 'components/editor/button/SubmitButtonM';
import { useErrorModal } from 'hooks/UseErrorModal';
import { useLogin } from 'hooks/UseLogin';

const Container = styled.div`
  margin: 40px 0;
  ${({ theme }) => theme.media.mobile} {
    margin: 0;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 1150px;
  width: 100%;
  padding: 70px 100px;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.media.tablet} {
    padding: 50px 50px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 40px 20px 60px 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.size.md};
  user-select: none;
`;

const Content = css`
  margin-top: 15px;
  padding-left: 12px;
  background-color: ${({ theme }) => theme.colors.gray040};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray200};
  }
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  font-size: ${({ theme }) => theme.fonts.size.base};
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

const TitleInput = styled.input.attrs({ type: 'text' })`
  ${Content}
  width: 100%;
  height: 40px;
`;

const Textarea = styled.textarea`
  ${Content}
  width: 100%;
  height: 450px;
  padding-top: 10px;
  resize: none;
`;

function NewsEditor() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [form, setForm] = useState<FormData>();
  const [carouselForm, setCarouselForm] = useState<FormData>();
  const [carouselUpload, setCarouselUpload] = useState(false);
  const { renderModal, setErrorMessage, setErrorTitle, open } = useErrorModal();
  const navigate = useNavigate();
  const { getAccessToken } = useLogin();
  const formData = new FormData();
  const carouselFormData = new FormData();

  const onContentHandler = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setContent(value);
  };

  const onTitleHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTitle(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    Array.from(e.target.files).forEach((f, index) => {
      if (index === 0) {
        carouselFormData.append('imageFile', f);
        carouselFormData.append('redirectUrl', `redirect.com/redirectPath`);
      }
      console.log(formData.getAll('files'));
      formData.append('files', f);
    });
    formData.append('body', content);
    formData.append('title', title);
    setForm(formData);
    setCarouselForm(carouselFormData);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.append('body', content);
    formData.append('title', title);
    setForm(formData);
    setErrorTitle('소식 등록 실패');
    if (title === '') {
      setErrorMessage('소식명을 입력해주세요');
      open();
    } else if (content === '') {
      setErrorMessage('소식 내용을 입력해주세요');
      open();
    } else if (form === undefined) {
      setErrorMessage('사진을 첨부해주세요');
      open();
    } else {
      try {
        const { data } = await axios({
          method: 'post',
          url: '/post/news',
          data: form,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    if (carouselUpload) {
      try {
        const { data } = await axios({
          method: 'post',
          url: '/main/carousel',
          data: carouselForm,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });
        navigate('/council-news');
        console.log(data);
      } catch (error: any) {
        console.log(error);
        setErrorMessage(error.response.data.message);
        open();
      }
    }
  };
  return (
    <>
      {renderModal()}
      <Container>
        <InnerContainer>
          <Wrapper>
            <Form onSubmit={onSubmitHandler}>
              <Label htmlFor="title">
                소식명
                <TitleInput
                  id="title"
                  value={title}
                  onChange={onTitleHandler}
                  placeholder="소식명을 입력해주세요."
                />
              </Label>
              <Label htmlFor="content">
                소식 내용
                <Textarea
                  id="content"
                  value={content}
                  onChange={onContentHandler}
                />
              </Label>
              {/* <Label htmlFor="file">
                첨부파일
                <form>
                <input
                  checked={carouselUpload}
                  onChange={() => setCarouselUpload((prev) => !prev)}
                  type="checkbox"
                />
                캐러셀 업로드
                </form>
                <input
                  type="file"
                  multiple
                  onChange={handleChange}
                  style={{ marginTop: 10 }}
                />
              </Label> */}
              <SubmitButtonM text="작성 완료" />
            </Form>
            <Label htmlFor="file">
              첨부파일
              <form>
                <input
                  checked={carouselUpload}
                  onChange={() => setCarouselUpload((prev) => !prev)}
                  type="checkbox"
                />
                캐러셀 업로드
              </form>
              <input
                type="file"
                multiple
                onChange={handleChange}
                style={{ marginTop: 10 }}
              />
            </Label>
          </Wrapper>
        </InnerContainer>
      </Container>
    </>
  );
}

export default NewsEditor;
