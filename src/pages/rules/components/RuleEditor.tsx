import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextBoxS from 'components/editor/input/TextBoxS';
import TextBoxL from 'components/editor/input/TextBoxL';
import FileBoxS from 'components/editor/input/FileBoxS';
import SubmitButtonM from 'components/editor/button/SubmitButtonM';
import { useErrorModal } from 'hooks/UseErrorModal';

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

function RuleEditor() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [form, setForm] = useState<FormData>();
  const [files, setFiles] = useState<File[]>([]);
  const { renderModal, setErrorMessage, setErrorTitle, open } = useErrorModal();
  const navigate = useNavigate();

  const onTitleHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTitle(value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorTitle('회칙 등록 실패');

    if (title === '') {
      setErrorMessage('제목을 입력해주세요');
      open();
    } else if (content === '') {
      setErrorMessage('내용을 입력해주세요');
      open();
    } else if (form === undefined) {
      setErrorMessage('파일을 첨부해주세요');
      open();
    } else {
      const config = {
        method: 'post',
        url: '/rule',
        data: form,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      axios(config)
        .then((response) => {
          if (response.data.successful) {
            navigate('/rules');
          } else {
            setErrorMessage(response.data.message);
            open();
          }
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
          open();
        });
    }
  };

  return (
    <>
      {renderModal()}
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
                content={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <FileBoxS setter={setFiles} multiple />
              <SubmitButtonM text="작성 완료" />
            </Form>
          </Wrapper>
        </InnerContainer>
      </Container>
    </>
  );
}

export default RuleEditor;
