import styled from 'styled-components';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

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
  margin: 40px 0;
  ${({ theme }) => theme.media.desktop} {
    padding: 30px 50px;
  }
  ${({ theme }) => theme.media.tablet} {
    padding: 30px 50px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 10px 20px;
  }
  background-color: ${({ theme }) => theme.colors.white};
`;

const Hr = styled.div<{ bold?: boolean }>`
  width: 100%;
  height: ${({ bold }) => (bold ? '2px' : '1px')};
  background-color: ${({ bold, theme }) =>
    bold ? theme.colors.gray600 : theme.colors.gray200};
  margin: ${({ bold }) => (bold ? '5px 0px' : '10px 0px')};
`;

const DeleteBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  cursor: pointer;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  padding: 12px 15px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Date = styled.div`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  padding: 0 0 12px 5px;
`;

const Infos = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 5px 15px 5px;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.size.lg};
`;

const State = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  height: 100%;
`;

const Contents = styled.div`
  width: 100%;
  padding: 40px 20px;
  ${({ theme }) => theme.media.mobile} {
    padding: 25px 15px;
  }
`;

const Text = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.md};
  margin-bottom: 60px;
  white-space: pre-wrap;
  line-height: ${({ theme }) => theme.fonts.size.xl};
`;

const HashTag = styled.div`
  max-width: 130px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.xs};
  border-radius: 12px;
  ${({ theme }) => theme.media.mobile} {
    max-width: 90px;
  }
`;

const CommentWrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  margin-top: 80px;
  ${({ theme }) => theme.media.mobile} {
    margin-top: 60px;
  }
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

const Admin = styled.div`
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
`;

const User = styled.div`
  margin-right: 10px;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const EditButtons = styled.div`
  display: flex;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.xs};
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 10px 10px 0 0;
`;

const CommentDate = styled.div`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.fonts.size.xs};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
`;

const CommentText = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const CommentForm = styled.form`
  width: 100%;
  ${({ theme }) => theme.media.desktop} {
    height: 150px;
  }
  ${({ theme }) => theme.media.tablet} {
    height: 150px;
  }
  ${({ theme }) => theme.media.mobile} {
    height: 100px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommentInput = styled.textarea`
  all: unset;
  flex-grow: 1;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray040};
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
  ${({ theme }) => theme.media.mobile} {
    width: 80px;
  }
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  cursor: pointer;
`;

interface PostProps {
  id: number;
  answer: string;
  category: string;
  commentList: [{ name: string; time: string; text: string }];
  createDate: string;
  fileList: [];
  postHits: number;
  status: string;
  text: string;
  title: string;
}

function Post() {
  const [post, setPost] = useState<PostProps>();
  const [comment, setComment] = useState<string>('');
  const [answer, setAnswer] = useState<string>();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const [cookies] = useCookies(['X-AUTH-TOKEN', 'isAdmin']);
  const navigate = useNavigate();
  const postId = searchParams.get('id');

  useEffect(() => {
    axios({
      url: `/api/suggestion/${postId}`,
      method: 'get',
      headers: {
        'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
      },
    })
      .then((res) => {
        const result = res.data.data;
        setPost(result);
        setAnswer(result.answer);
      })
      .catch((err) => {
        // 에러 처리
      });
  }, []);

  const onClickDeleteBtn = () => {
    if(window.confirm('해당 글을 삭제하시겠습니까?')) {
      axios({
        url: `/api/suggestion/${postId}`,
        method: 'delete',
        headers: {
          'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
        },
      })
        .then((res) => {
          if (res.data.successful) navigate('/board-suggestion/boards');
        })
        .catch((err) => {
          // 에러 처리
        });
    }
  };

  const onCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios({
      url:
        cookies.isAdmin === 'true'
          ? `/api/suggestion/comment/admin/${postId}`
          : `/api/suggestion/comment/${postId}`,
      method: 'post',
      headers: {
        'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
        'Content-Type': 'application/json',
      },
      data: isEdit === true ? { text: answer } : { text: comment },
    })
      .then((res) => {
        if (res.data.successful) window.location.reload();
      })
      .catch((err) => {
        // 에러 처리
      });
  };

  return (
    <Container>
      <Wrapper>
        {cookies.isAdmin === 'true' && (
          <DeleteBtn type="button" onClick={onClickDeleteBtn}>
            삭제하기
          </DeleteBtn>
        )}
        <Header>
          <Date>{post?.createDate}</Date>
        </Header>
        <Infos>
          <Title>{post?.title}</Title>
          <State>[ {post?.status} ]</State>
        </Infos>
        <Hr bold />
        <Contents>
          <Text>{post?.text}</Text>
          <HashTag>#{post?.category}</HashTag>
        </Contents>
        <Hr bold />
        <CommentWrapper>
          댓글 {post?.commentList.length}
          <Hr />
          {(cookies.isAdmin === 'true' && !post?.answer && !isEdit) && (
            <CommentForm onSubmit={onCommentHandler}>
              <CommentInput
                placeholder="답변을 입력해주세요."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <CommentSubmit value="입력" />
            </CommentForm>
          )}
          {isEdit && (
            <CommentForm onSubmit={onCommentHandler}>
              <CommentInput
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <CommentSubmit value="수정" />
            </CommentForm>
          )}
          <CommentLists>
            {post?.answer && (
              <Comment>
                <CommentInfo>
                  <Admin>총학생회</Admin>
                </CommentInfo>
                <CommentText>{post?.answer}</CommentText>
                {cookies.isAdmin === 'true' && (
                  <EditButtons>
                    <Button type="button" onClick={() => setIsEdit(true)}>
                      수정하기
                    </Button>
                    <Button type="button" onClick={() => setIsEdit(false)}>
                      취소
                    </Button>
                  </EditButtons>
                )}
              </Comment>
            )}
            {post?.commentList.map((comment) => (
              <Comment key={post.commentList.indexOf(comment)}>
                <CommentInfo>
                  <User>익명</User>
                  <VSeparator />
                  <CommentDate>
                    {comment.time.slice(0, 10)} {comment.time.slice(11, 16)}
                  </CommentDate>
                </CommentInfo>
                <CommentText>{comment.text}</CommentText>
              </Comment>
            ))}
          </CommentLists>
          {cookies.isAdmin === 'false' && (
            <CommentForm onSubmit={onCommentHandler}>
              <CommentInput
                placeholder="댓글을 입력해주세요."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <CommentSubmit value="입력" />
            </CommentForm>
          )}
        </CommentWrapper>
      </Wrapper>
    </Container>
  );
}

export default Post;
