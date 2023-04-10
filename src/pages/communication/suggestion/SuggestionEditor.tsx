import axios from 'axios';
import SubmitButtonM from 'components/editor/button/SubmitButtonM';
import TextBoxS from 'components/editor/input/TextBoxS';
import TextBoxL from 'components/editor/input/TextBoxL';
import TagSelectM from 'components/editor/TagSelectM';
import FileBoxS from 'components/editor/input/FileBoxS';
import { useEffect, useState } from 'react';
import { useErrorModal } from 'hooks/UseErrorModal';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCategories } from './functions/GetCategories';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
  ${({ theme }) => theme.media.mobile} {
    margin: 0;
  }
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

function SuggestionEditor() {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [categoryList, setCategoryList] = useState<string[]>(['']);
  const [files, setFiles] = useState<File[]>([]);
  const { renderModal, setErrorMessage, setErrorTitle, open } = useErrorModal();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorTitle('게시글 등록 실패');
    if (title.length === 0) {
      setErrorMessage('제목을 입력해주세요.');
      open();
    } else if (text.length < 9) {
      setErrorMessage('9자 이상의 내용을 입력해주세요.');
      open();
    } else {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', text);
      if (category === '') {
        formData.append('category', '기타');
      } else {
        formData.append('category', category);
      }

      files.forEach((file) => formData.append('files', file));

      axios({
        url: '/post/general-forum',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      })
        .then((res) => {
          if (res.data.successful) navigate('/board-suggestion/boards?page=1');
          navigate('/board-suggestion/boards');
        })
        .catch((e) => {
          const error = e as any;
          setErrorMessage(error.response.data.message[0]);
          open();
        });
    }
  };

  useEffect(() => {
    getCategories().then((res) => {
      setCategoryList(res);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Container>
      <Wrapper>
        {renderModal()}
        <Form onSubmit={onSubmitHandler}>
          <TagSelectM
            label="카테고리"
            selectedTag={category}
            tagList={categoryList}
            onChange={({ currentTarget }) => setCategory(currentTarget.value)}
          />
          <TextBoxS
            label="제목"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={({ currentTarget }) => setTitle(currentTarget.value)}
          />
          <TextBoxL
            label="내용"
            content={text}
            onChange={(e) => setText(e.target.value)}
          />
          <FileBoxS setter={setFiles} accept="image/*" multiple />
          <SubmitButtonM text="작성 완료" />
        </Form>
      </Wrapper>
    </Container>
  );
}

export default SuggestionEditor;
