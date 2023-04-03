import axios from 'axios';
import TextBoxS from 'components/editor/input/TextBoxS';
import TextBoxL from 'components/editor/input/TextBoxL';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import SideNav from 'components/nav/SideNav';
import SubmitButton from './components/SubmitButton';

function QnAEditor() {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [cookies] = useCookies(['X-AUTH-TOKEN']);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (window.confirm('게시글 작성을 완료하시겠습니까?')) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', text);
      axios({
        url: '/post/voc',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${cookies['X-AUTH-TOKEN']}`,
        },
        data: formData,
      })
        .then((res) => {
          if (res.data.successful) navigate('/voc/qna/boards?page=1');
          navigate('/voc/qna/boards');
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
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Container>
      <Wrapper>
        <SideNav />
        <Form onSubmit={onSubmitHandler}>
          <TextBoxS
            label="제목"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={({ currentTarget }) => setTitle(currentTarget.value)}
          />
          <TextBoxLL label="내용" htmlStr={text} setHtmlStr={setText} />
          <MenuBox>
            <Link to="/voc/qna/boards">
              <Button>취소</Button>
            </Link>
            <SubmitButton text="등록" />
          </MenuBox>
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
  ${({ theme }) => theme.media.desktop} {
    margin-bottom: 80px;
  }
  ${({ theme }) => theme.media.mobile} {
    margin: 0;
  }
`;

const Wrapper = styled.div`
  /* max-width: 1150px; */
  width: 100%;
  padding: 0 50px;
  background-color: ${({ theme }) => theme.colors.gray040};
  ${({ theme }) => theme.media.tablet} {
    padding: 0;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 40px 20px 60px 20px;
  }
  display: flex;
  gap: 30px;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 70px 92px;
  ${({ theme }) => theme.media.desktop} {
    margin-top: 40px;
  }
`;

const Button = styled.button`
  all: unset;
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.size.base};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  width: 75px;
  height: 35px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  border-radius: 5px;
  float: right;
`;

const MenuBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

const TextBoxLL = styled(TextBoxL)`
  ::-webkit-scrollbar {
    display: none;
  }
`;
export default QnAEditor;
