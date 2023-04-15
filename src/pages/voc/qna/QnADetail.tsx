import SideNav from 'components/nav/SideNav';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'atoms/UserInfo';
import axios from 'axios';
import qs from 'qs';
import { PostProps } from './PostProps';

interface PostDetailProps {
  title: string;
  author: string;
  createdAt: string;
  body: string;
  status: string;
  answer: string;
}
function QnADetail() {
  const [searchParams] = useSearchParams();
  const [postDetail, setPostDetail] = useState<PostDetailProps>({
    title: '',
    author: '',
    createdAt: '',
    body: '',
    status: '',
    answer: '',
  });
  const [id, setId] = useState<number>(1);
  const [cookies] = useCookies(['X-AUTH-TOKEN']);
  const [isReplyed, setisReplyed] = useState<boolean>(true);
  const [adminAnswer, setAdminAnswer] = useState<string>();
  const user = useRecoilValue(userInfo);

  const getPost = async () => {
    let { id } = qs.parse(searchParams.toString());
    console.log(id);
    if (!id) id = '1';
    const { data } = await axios({
      method: 'get',
      url: `/post/voc/${Number(id)}`,
      headers: {
        Authorization: `Bearer ${cookies['X-AUTH-TOKEN']}`,
      },
    });
    console.log(data);
    setPostDetail(data);
  };

  const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios({
        method: 'post',
        url: `/post/voc/reply/${Number(id)}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: { answer: adminAnswer },
      }).then((res) => {
        setAdminAnswer('');
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setId(Number(searchParams.get('id')) || 1);
    getPost();
  }, [searchParams]);
  return (
    <Wrapper>
      <SideNav />
      <Container>
        <Hr bold />
        <Header>{`[ ${
          postDetail.status === 'ANSWERED' ? '답변 완료' : '답변 전'
        }  ]`}</Header>
        <Title>{postDetail.title}</Title>
        <Author>{postDetail.author}</Author>
        <Date>{postDetail.createdAt.substring(0, 10)}</Date>
        <Hr />
        <Text>{postDetail.body}</Text>
        <Button>
          <Link to="/voc/qna/boards">목록</Link>
        </Button>
        {postDetail.status === 'ANSWERED' && (
          <>
            <Hr />
            <Header>총학생회 답변</Header>
            <Text>{postDetail.answer}</Text>
          </>
        )}
        {user.admin && (
          <AnswerForm onSubmit={handleAnswerSubmit}>
            <AnswerInput
              placeholder="답변 내용을 입력해주세요"
              value={adminAnswer}
              onChange={(e) => setAdminAnswer(e.currentTarget.value)}
            />
            <AnswerSubmit value="답변하기" />
          </AnswerForm>
        )}
      </Container>
    </Wrapper>
  );
}

export default QnADetail;

const Wrapper = styled.div`
  width: 100%;
  min-height: 600px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray040};
  gap: 30px;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  max-width: 1200px;
  ${({ theme }) => theme.media.desktop} {
    width: calc(100% - 310px);
    padding: 40px 50px;
    margin: 40px 0;
  }
  ${({ theme }) => theme.media.tablet} {
    padding: 40px 50px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 40px 20px;
  }
  position: relative;
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  margin: 15px 0px;
  text-align: center;
`;

const Button = styled.button`
  all: unset;
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.size.base};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  width: 75px;
  height: 35px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  border-radius: 5px;
  position: absolute;
  ${({ theme }) => theme.media.desktop} {
    bottom: 50px;
    right: 40px;
  }
  ${({ theme }) => theme.media.tablet} {
    bottom: 30px;
    right: 40px;
  }
  ${({ theme }) => theme.media.mobile} {
    bottom: 30px;
    right: 40px;
  }

  bottom: 0;
  right: 0;
`;

const Hr = styled.div<{ bold?: boolean }>`
  width: 100%;
  height: ${({ bold }) => (bold ? '2px' : '1px')};
  background-color: ${({ bold, theme }) =>
    bold ? theme.colors.gray600 : theme.colors.gray200};
  margin: ${({ bold }) => (bold ? '5px 0px' : '10px 0px')};
`;

const Date = styled.div`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  text-align: right;
  padding: 0 0 12px 5px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  margin-bottom: 25px;
  text-align: center;
`;

const Text = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.md};
  margin-bottom: 60px;
  white-space: pre-wrap;
  line-height: ${({ theme }) => theme.fonts.size.xl};
`;

const Status = styled(Title)`
  text-align: center;
  color: #204a80;
`;

const Author = styled(Date)`
  margin-bottom: 5px;
`;

const ReplyTitle = styled(Title)`
  padding-top: 40px;
  padding-bottom: 40px;
`;

const AnswerInput = styled.textarea`
  all: unset;
  flex-grow: 1;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray100};
  margin-right: 10px;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.gray600};
`;

const AnswerSubmit = styled.input.attrs({ type: 'submit' })`
  all: unset;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  width: 160px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  cursor: pointer;
`;

const AnswerForm = styled.form`
  width: 100%;
  ${({ theme }) => theme.media.desktop} {
    height: 200px;
  }
  ${({ theme }) => theme.media.tablet} {
    height: 200px;
  }
  ${({ theme }) => theme.media.mobile} {
    height: 120px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;
