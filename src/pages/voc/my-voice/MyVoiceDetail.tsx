import SideNav from 'components/nav/SideNav';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import qs from 'qs';

interface PostDetailProps {
  title: string;
  author: string;
  createdAt: string;
  body: string;
  status: string;
}
function MyVoiceDetail() {
  const [searchParams] = useSearchParams();
  const [postDetail, setPostDetail] = useState<PostDetailProps>({
    title: '',
    author: '',
    createdAt: '',
    body: '',
    status: '',
  });
  const [id, setId] = useState<number>(1);
  const [cookies] = useCookies(['X-AUTH-TOKEN']);
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

  useEffect(() => {
    setId(Number(searchParams.get('id')) || 1);
    getPost();
  }, [searchParams]);
  return (
    <Wrapper>
      <SideNav />
      <Container>
        <QnAP>Q&A</QnAP>
        <Hr bold />
        <Status>
          {'[ '}
          {postDetail.status === 'WAITING' ? '답변 전' : '답변 완료'}
          {' ]'}
        </Status>
        <Title>{postDetail.title}</Title>
        <Author>{postDetail.author}</Author>
        <Date>{postDetail.createdAt}</Date>
        <Hr />
        <Text>{postDetail.body}</Text>
        <Button>
          <Link to="/voc/my-voice/boards">목록</Link>
        </Button>
        {postDetail.status === 'ANSWERED' && (
          <>
            <Hr />
            <ReplyTitle>총학생회 답변</ReplyTitle>
            <Text>{postDetail.body}</Text>
          </>
        )}
      </Container>
    </Wrapper>
  );
}

export default MyVoiceDetail;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray040};
  gap: 30px;
`;

const Container = styled.div`
  max-width: 1250px;
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  padding: 40px 50px;
  ${({ theme }) => theme.media.desktop} {
    min-height: 585px;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  ${({ theme }) => theme.media.tablet} {
    min-height: 300px;
    margin-top: 0;
  }
  position: relative;
`;

const QnAP = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.lg};
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-bottom: 40px;
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
  width: 100%;
  padding: 10px 5px 15px 5px;
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
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
