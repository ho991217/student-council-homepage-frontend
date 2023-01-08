import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import Modal from 'components/modal/Modal';

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

const ButtonDiv = styled.div`
  margin: auto;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

const Text = styled.span`
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-bottom: 20px;
`;

const Button = styled.input.attrs({ type: 'submit' })`
  width: 260px;
  height: 50px;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fonts.size.base};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
  border-radius: 5px;
`;

function NewsEditor() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [form, setForm] = useState<FormData>();
  const [carouselForm, setCarouselForm] = useState<FormData>();
  const [postState, setPostState] = useState({
    sent: false,
    success: false,
  });
  const [carouselUpload, setCarouselUpload] = useState(false);
  const [cookies] = useCookies(['X-AUTH-TOKEN']);
  const navigate = useNavigate();

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

    const formData = new FormData();
    const form = new FormData();
    Array.from(e.target.files).forEach((f) => formData.append('files', f));
    formData.append('text', content);
    formData.append('title', title);

    setForm(formData);
    setCarouselForm(form);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === '') {
      setErrorMsg('소식명을 입력해주세요');
      setIsOpen(true);
    } else if (content === '') {
      setErrorMsg('소식 내용을 입력해주세요');
      setIsOpen(true);
    } else if (form === undefined) {
      setErrorMsg('사진을 첨부해주세요');
      setIsOpen(true);
    } else {
      setPostState((prev) => ({
        ...prev,
        sent: true,
      }));
      const config = {
        method: 'post',
        url: '/api/news',
        data: form,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
        },
      };

      axios(config)
        .then((response) => {
          if (carouselUpload) {
            const form = carouselForm;
            form?.append('redirectUrl', `/news?id=${response.data.data.id}`);
            axios({
              method: 'post',
              url: '/api/carousel',
              data: form,
              headers: {
                'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
                'Content-Type': 'multipart/form-data',
              },
            });
          }
          setPostState((prev) => ({
            ...prev,
            success: response.data.successful,
          }));
          navigate('/council-news');
        })
        .catch((error) => {
          setErrorMsg(error.response.data.message);
          setIsOpen(true);
        });
    }
  };

  return (
    <>
      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          title="소식 등록 실패"
          contents={errorMsg}
        />
      )}
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
              <ButtonDiv>
                <Button value="작성완료" />
              </ButtonDiv>
            </Form>
          </Wrapper>
        </InnerContainer>
      </Container>
    </>
  );
}

export default NewsEditor;
