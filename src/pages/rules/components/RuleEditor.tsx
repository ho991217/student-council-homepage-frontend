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

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.size.md};
  user-select: none;
`;

function RuleEditor() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState<FormData>();
  const { renderModal, setErrorMessage, setErrorTitle, open } = useErrorModal();
  const navigate = useNavigate();
  const formData = new FormData();

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
    Array.from(e.target.files).forEach( f => {
      console.log(formData.getAll('files'));
      formData.append('files', f);
    });
    formData.append('body', content);
    formData.append('title', title);
    setForm(formData);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.append('body', content);
    formData.append('title', title);
    setForm(formData);

    if (title === '') {
      setErrorTitle('회칙 등록 실패');
      setErrorMessage('제목을 입력해주세요');
      open();
    } else if (content === '') {
      setErrorTitle('회칙 등록 실패');
      setErrorMessage('내용을 입력해주세요');
      open();
    } else if (files === undefined) {
      setErrorTitle('회칙 등록 실패');
      setErrorMessage('파일을 첨부해주세요');
      open();
    } else {
      const config = {
        method: 'post',
        url: '/post/rule',
        data: form,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      axios(config)
        .then((response) => {
          console.log(response);
          navigate('/rules');
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
              {/* <FileBoxS setter={setFiles} multiple /> */}
              <Label htmlFor="file">
                첨부파일
                <input
                  type="file"
                  multiple
                  onChange={handleChange}
                  style={{ marginTop: 10 }}
                />
              </Label>
              <SubmitButtonM text="작성 완료" />
            </Form>
          </Wrapper>
        </InnerContainer>
      </Container>
    </>
  );
}

export default RuleEditor;
