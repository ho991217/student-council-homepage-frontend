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

const Button = styled.button.attrs({ type: 'button' })`
  background-color: ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.xs};
  cursor: pointer;
  margin: 0 5px 10px 0;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
`;

const Header = styled.div``;

const Date = styled.div`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  padding: 0 0 12px 5px;
`;

const Title = styled.h1`
  width: 100%;
  padding: 0 5px 15px 5px;
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
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

const CommentAuthor = styled.div`
  margin-right: 10px;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const EditButtons = styled.div`
  display: flex;
`;

const Buttons = styled.button`
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

const CommentInput = styled.textarea.attrs({ required: true, maxLength: 500 })`
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
  commentList: [
    { name: string; time: string; text: string; mine: boolean; id: number; status: string; },
  ];
  createDate: string;
  fileList: [];
  postHits: number;
  text: string;
  title: string;
  mine: boolean;
}

function Post() {
  const [post, setPost] = useState<PostProps>();
  const [comment, setComment] = useState<string>('');
  const [editComment, setEditComment] = useState<string>('');
  const [isEditComment, setIsEditComment] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<number>();

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
      })
      .catch((err) => {
        // 에러 처리
      });
  }, []);

  const onAdminDeletePost = () => {
    axios({
      url: `/api/suggestion/admin/${postId}`,
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
  };

  const onUserDeletePost = () => {
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
  };

  const onCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios({
      url: `/api/suggestion/comment/${postId}`,
      method: 'post',
      headers: {
        'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
        'Content-Type': 'application/json',
      },
      data: { text: comment },
    })
      .then((res) => {
        if (res.data.successful) window.location.reload();
      })
      .catch((err) => {
        // 에러 처리
      });
  };

  const onAdminDeleteComment = (item: any) => {
    axios({
      url: `/api/suggestion/comment/admin/${item}`,
      method: 'delete',
      headers: {
        'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
      },
    })
      .then((res) => {
        if (res.data.successful) window.location.reload();
      })
      .catch((err) => {
        // 에러 처리
      });
  };

  const onUserDeleteComment = (item: any) => {
    axios({
      url: `/api/suggestion/comment/${item}`,
      method: 'delete',
      headers: {
        'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
      },
    })
      .then((res) => {
        if (res.data.successful) window.location.reload();
      })
      .catch((err) => {
        // 에러 처리
      });
  };

  const onEditCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios({
      url: `/api/suggestion/comment/${commentId}`,
      method: 'PATCH',
      headers: {
        'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
        'Content-Type': 'application/json',
      },
      data: { text: editComment },
    })
      .then((res) => {
        if (res.data.successful) window.location.reload();
      })
      .catch((err) => {
        // 에러 처리
      });
  };

  const currentComment = (item: any) => {
    setIsEditComment(true);
    setEditComment(item.text);
    setCommentId(item.id);
  };

  return (
    <Container>
      <Wrapper>
        {cookies.isAdmin === 'true' && (
          <Button onClick={onAdminDeletePost}>삭제</Button>
        )}
        {cookies.isAdmin === 'false' && post?.mine && (
          <Button onClick={onUserDeletePost}>삭제</Button>
        )}
        <Header>
          <Date>{post?.createDate}</Date>
          <Title>{post?.title}</Title>
        </Header>
        <Hr bold />
        <Contents>
          <Text>{post?.text}</Text>
          <HashTag>#{post?.category}</HashTag>
        </Contents>
        <Hr bold />
        <CommentWrapper>
          댓글 {post?.commentList.length}
          <Hr />
          <CommentLists>
            {post?.commentList.map((comment) => (
              <Comment key={post.commentList.indexOf(comment)}>
                {cookies.isAdmin === 'true' && <Button onClick={() => onAdminDeleteComment(comment.id)}>삭제</Button>}
                {cookies.isAdmin === 'false' && comment?.mine && (
                  <EditButtons>
                    {isEditComment ? (
                      <Button
                        onClick={() => {
                          setIsEditComment(false);
                        }}
                      >
                        취소
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          currentComment(comment);
                        }}
                      >
                        수정
                      </Button>
                    )}
                    <Button onClick={() => onUserDeleteComment(comment.id)}>삭제</Button>
                  </EditButtons>
                )}
                <CommentInfo>
                  <CommentAuthor>익명</CommentAuthor>
                  <VSeparator />
                  <CommentDate>
                    {comment.time.slice(0, 10)} {comment.time.slice(11, 16)}
                  </CommentDate>
                </CommentInfo>
                {comment.status === '삭제' && <CommentText>작성자에 의해 삭제된 댓글입니다.</CommentText>}
                {comment.status === '정지' && <CommentText>정책을 위반한 댓글입니다.</CommentText>}
                {comment.status === '등록' && <CommentText>{comment.text}</CommentText>}
              </Comment>
            ))}
          </CommentLists>
          {cookies.isAdmin === 'false' && !isEditComment && (
            <CommentForm onSubmit={onCommentHandler}>
              <CommentInput
                placeholder="댓글을 입력해주세요."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <CommentSubmit value="입력" />
            </CommentForm>
          )}
          {cookies.isAdmin === 'false' && isEditComment && (
            <CommentForm onSubmit={onEditCommentHandler}>
              <CommentInput
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
              />
              <CommentSubmit value="수정" />
            </CommentForm>
          )}
        </CommentWrapper>
      </Wrapper>
    </Container>
  );
}

export default Post;
