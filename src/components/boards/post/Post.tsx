import styled from 'styled-components';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Post } from '../PostProps';
import { dummyPost } from '../api/DummyPost';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Wrapper = styled.div`
  max-width: 1290px;
  width: 100%;
  margin: 40px 0px;
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.gray040};
`;

const Separator = styled.div<{ bold?: boolean }>`
  width: 100%;
  height: ${({ bold }) => (bold ? '2px' : '1px')};
  background-color: ${({ bold, theme }) =>
    bold ? theme.colors.gray600 : theme.colors.gray300};
  margin: 20px 0px 40px 0px;
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
  ${({ theme }) => theme.fonts.smallTitle}
  margin-bottom: 15px;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.smallTitle}
  margin-bottom: 25px;
`;

const Etcs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 500px;
  width: 100%;
`;

const Contents = styled.div`
  max-width: 1000px;
  width: 100%;
`;

function Post() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [post, setPost] = useState<Post>();

  const [title, setTitle] = useState<string>('');
  const [id, setId] = useState<number>(0);
  const [contents, setContents] = useState<JSX.Element>();
  const [header, setHeader] = useState<string>('답변완료');

  useEffect(() => {
    const postId = Number(searchParams.get('id'));

    setPost(dummyPost.filter((post) => post.id === postId)[0]);
    setId(postId || 0);
    setTitle(dummyPost.filter((post) => post.id === postId)[0].title);
    setContents(dummyPost.filter((post) => post.id === postId)[0].contents);
    setHeader(dummyPost.filter((post) => post.id === postId)[0].header);
  }, []);

  return (
    <Container>
      <Wrapper>
        <Separator bold />
        <Header>[ {header} ]</Header>
        <Title>{title}</Title>
        <Etcs>
          <div>등록일 : {}</div>
          <div>청원 마감 : {}</div>
          <div>작성자 : {}</div>
        </Etcs>
        <Separator />
        <Contents>{contents}</Contents>
      </Wrapper>
    </Container>
  );
}

export default Post;
