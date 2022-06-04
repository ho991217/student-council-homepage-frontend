import styled from 'styled-components';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PostProps } from '../PostProps';
import { dummyPost } from '../api/DummyPost';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Wrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 40px 0px;
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.gray040};
`;

const Hashtag = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
  margin: 0px 5px;
  border-radius: 25px;
`;

const HSeparator = styled.div<{ bold?: boolean }>`
  width: 100%;
  height: ${({ bold }) => (bold ? '2px' : '1px')};
  background-color: ${({ bold, theme }) =>
    bold ? theme.colors.gray600 : theme.colors.gray300};
  margin: 20px 0px;
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
  ${({ theme }) => theme.fonts.smallTitle}
  margin: 15px 0px;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.smallTitle}
  margin-bottom: 25px;
`;

const Etc = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 500px;
  width: 100%;
  margin-bottom: 15px;
`;

const Contents = styled.div`
  max-width: 1100px;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 45px;
`;

const CommentSection = styled.section`
  max-width: 1280px;
  width: 100%;
`;

const CommentForm = styled.form`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommentInput = styled.textarea`
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

const CommentSubmit = styled.input.attrs({ type: 'submit' })`
  all: unset;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  width: 160px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  ${({ theme }) => theme.fonts.detailBold}
`;

const CommentLists = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 20px;
  width: 100%;
`;

const Comment = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  padding: 0px 10px 15px 10px;
  width: 100%;
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  height: 14px;
`;

const VSeparator = styled.div`
  height: 100%;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.gray400};
  margin: 0px 10px;
`;

const CommentAuthor = styled.div`
  margin-right: 10px;
  ${({ theme }) => theme.fonts.detailThin}
`;

const CommentDate = styled.div`
  color: ${({ theme }) => theme.colors.gray400};
  ${({ theme }) => theme.fonts.smallDescription}
`;

const CommentText = styled.div`
  ${({ theme }) => theme.fonts.smallSubTitle}
`;

function Post() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [post, setPost] = useState<PostProps>();
  const [id, setId] = useState<number>(0);

  const [comment, setComment] = useState<string>('동의합니다.');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(comment);
  };

  useEffect(() => {
    const postId = Number(searchParams.get('id'));

    setPost(dummyPost.filter((post) => post.id === postId)[0]);
    setId(postId || 0);
  }, []);

  return (
    <Container>
      <Wrapper>
        <Hashtag>#{post?.tag}</Hashtag>
        <HSeparator bold />
        <Header>[ {post?.header} ]</Header>
        <Title>{post?.title}</Title>
        <Etc>
          <div>등록일 : {post?.createdAt}</div>
          <div>청원 마감 : {post?.dueDate}</div>
          <div>작성자 : {post?.writer}</div>
        </Etc>
        <HSeparator />
        <Contents>{post?.contents}</Contents>
        <CommentSection>
          <CommentForm onSubmit={handleSubmit}>
            <CommentInput
              placeholder="동의 내용을 입력해 주세요."
              value={comment}
              onChange={(e) => setComment(e.currentTarget.value)}
            />
            <CommentSubmit value="전송" />
          </CommentForm>
          <CommentLists>
            {post?.commentList.map((comment) => (
              <Comment key={comment.id}>
                <CommentInfo>
                  <CommentAuthor>{comment.writer}</CommentAuthor>
                  <VSeparator />
                  <CommentDate>{comment.createdAt}</CommentDate>
                </CommentInfo>
                <CommentText>{comment.contents}</CommentText>
              </Comment>
            ))}
          </CommentLists>
        </CommentSection>
      </Wrapper>
    </Container>
  );
}

export default Post;
