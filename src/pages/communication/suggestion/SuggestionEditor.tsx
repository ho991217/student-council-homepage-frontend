import axios from 'axios';
import SubmitButtonM from 'components/editor/button/SubmitButtonM';
import TextBoxS from 'components/editor/input/TextBoxS';
import TextBoxL from 'components/editor/input/TextBoxL';
import TagSelectM from 'components/editor/TagSelectM';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCategories } from './functions/GetCategories';

function SuggestionEditor() {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [categoryList, setCategoryList] = useState<string[]>(['']);
  const [cookies] = useCookies(['X-AUTH-TOKEN']);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (window.confirm('게시글 작성을 완료하시겠습니까?')) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', text);
      if (category === '') {
        formData.append('category', '기타');
      } else {
        formData.append('category', category);
      }

      axios({
        url: '/post/general-forum',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${cookies['X-AUTH-TOKEN']}`,
        },
        data: formData,
      })
        .then((res) => {
          console.log(res)
          if (res.data.successful) navigate('/board-suggestion/boards?page=1');
          navigate('/board-suggestion/boards')
        })
        .catch(
          ({
            response: {
              data: { message },
            },
          }) =>
            // 에러 처리
            alert(message),
        );
    }
  };

  useEffect(() => {
    getCategories(cookies['X-AUTH-TOKEN']).then((res) => {
      setCategoryList(res);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Container>
      <Wrapper>
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
          <TextBoxL label="내용" htmlStr={text} setHtmlStr={setText} />
          <SubmitButtonM text="작성 완료" />
        </Form>
      </Wrapper>
    </Container>
  );
}
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

export default SuggestionEditor;
