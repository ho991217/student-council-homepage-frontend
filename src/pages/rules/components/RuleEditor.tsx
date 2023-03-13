import React, { useState } from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'components/modal/Modal';
import TextBoxS from 'components/editor/input/TextBoxS';
import TextBoxL from 'components/editor/input/TextBoxL';
import FileBoxS from 'components/editor/input/FileBoxS';
import SubmitButtonM from 'components/editor/button/SubmitButtonM';

function RuleEditor() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [form, setForm] = useState<FormData>();
  const [cookies] = useCookies(['X-AUTH-TOKEN']);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

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
    Array.from(e.target.files).forEach((f) => formData.append('files', f));
    formData.append('text', content);
    formData.append('title', title);
    setForm(formData);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === '') {
      setErrorMsg('제목을 입력해주세요');
      setIsOpen(true);
    } else if (content === '') {
      setErrorMsg('내용을 입력해주세요');
      setIsOpen(true);
    } else if (form === undefined) {
      setErrorMsg('파일을 첨부해주세요');
      setIsOpen(true);
    } else {
      const config = {
        method: 'post',
        url: '/rule',
        data: form,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
        },
      };

      axios(config)
        .then((response) => {
          if (response.data.successful) {
            navigate('/rules');
          } else {
            setErrorMsg(response.data.message);
            setIsOpen(true);
          }
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
          title="등록 실패"
          contents={errorMsg}
          onClose={() => setIsOpen(false)}
        />
      )}
      <Container>
        <InnerContainer>
          <Wrapper>
            <Form onSubmit={onSubmitHandler}>
              <TextBoxS
                label="회칙명"
                value={title}
                onChange={onTitleHandler}
                placeholder="회칙명을 입력해주세요."
              />
              <TextBoxL
                label="회칙 내용"
                htmlStr={content}
                setHtmlStr={setContent}
              />
              <FileBoxS label="첨부파일" onChange={handleChange} multiple />
              <SubmitButtonM text="작성 완료" />
            </Form>
          </Wrapper>
        </InnerContainer>
      </Container>
    </>
  );
}

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

export default RuleEditor;
