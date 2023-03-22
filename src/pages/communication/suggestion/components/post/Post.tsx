import styled from 'styled-components';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import parse from 'html-react-parser';
import { CommentProps, PostProps } from './PostProps';

function Post() {
  const [post, setPost] = useState<PostProps>();
  const [commentList, setCommentList] = useState<CommentProps[]>();
  const [comment, setComment] = useState<string>('');
  const [likeCount, setLikeCount] = useState<number>(0);
  const [editComment, setEditComment] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<number>();
  const [searchParams] = useSearchParams();
  const [cookies] = useCookies(['X-AUTH-TOKEN', 'isAdmin']);
  const navigate = useNavigate();
  const postId = searchParams.get('id');

  useEffect(() => {
    getPost();
    getComment();
  }, []);
  
  const getPost = () => {
    axios({
      url: `/post/general-forum/${postId}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${cookies['X-AUTH-TOKEN']}`,
      },
    })
      .then((res) => {
        setPost(res.data);
        setLikeCount(res.data.likes)
        console.log(res);
      })
      .catch((err) => {
        // 에러 처리
      });

  }

  const getComment = () => {
    axios({
      url: `post/general-forum/comment/${postId}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${cookies['X-AUTH-TOKEN']}`,
      },
    }).then((res) => {
      setCommentList(res.data.content);
      console.log(res.data.content);
    });
  };

  const onCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios({
      url: isEdit
        ? `/post/general-forum/comment/${commentId}`
        : `/post/general-forum/comment/${postId}`,
      method: isEdit ? 'PATCH' : 'post',
      headers: {
        Authorization: `Bearer ${cookies['X-AUTH-TOKEN']}`,
        'Content-Type': 'application/json',
      },
      data: isEdit ? { text: editComment } : { text: comment },
    })
      .then((res) => {
        if (res.data.successful) window.location.reload();
        getComment();
      })
      .catch((err) => {
        // 에러 처리
        alert(err);
      });
  };

  const postLike = async () => {
    await axios({
      url: `/post/general-forum/like/${postId}`,
      method: 'post',
      headers: {
        Authorization: `Bearer ${cookies['X-AUTH-TOKEN']}`,
      },
    }).then((res) => {
      console.log(res);
    });
    getPost();
  };
  
  const deleteLike = async () => {
    await axios({
      url: `/post/general-forum/like/${postId}`,
      method: 'delete',
      headers: {
        Authorization: `Bearer ${cookies['X-AUTH-TOKEN']}`,
      },
    }).then((res) => {
      console.log(res);
    });
    getPost()
  }

  const onDeletePost = () => {
    if (window.confirm('해당 글을 삭제하시겠습니까?')) {
      axios({
        url: `/post/general-forum/${postId}`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${cookies['X-AUTH-TOKEN']}`,
        },
      })
        .then((res) => {
          navigate('/board-suggestion/boards');
        })
        .catch((err) => {
          console.log(err)
        });
    }
  };

  const onDeleteComment = (item: number) => {
    if (window.confirm('해당 댓글을 삭제하시겠습니까?')) {
      axios({
        url:
          cookies.isAdmin === 'true'
            ? `/suggestion/comment/admin/${item}`
            : `/suggestion/comment/${item}`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${cookies['X-AUTH-TOKEN']}`,
        },
      })
        .then((res) => {
          if (res.data.successful) window.location.reload();
        })
        .catch((err) => {
          // 에러 처리
        });
    }
  };
  return (
    <Container>
      <Wrapper>
        {post?.mine === true && (
          <Button onClick={onDeletePost}>삭제</Button>
        )}
        {cookies.isAdmin === 'false' && post?.mine && (
          <Button onClick={onDeletePost}>삭제</Button>
        )}
        <Header>
          <Date>{post?.createdAt}</Date>
          <Title>{post?.title}</Title>
        </Header>
        <Hr bold />

        <Contents>
          <Text>{parse(post?.body ?? '')}</Text>
          <Like liked={post?.liked} onClick={post?.liked?deleteLike:postLike}>
            좋아요 {likeCount}
          </Like>
        </Contents>
        <Hr bold />
        <CommentForm onSubmit={onCommentHandler}>
          <CommentInput
            placeholder="댓글을 입력해주세요."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <CommentSubmit value="입력" />
        </CommentForm>
        <CommentWrapper>
          댓글 {commentList?.length}
          <Hr />
        </CommentWrapper>
        <CommentLists>
          {commentList?.map((comment, index) => (
            <Comment key={comment.id}>
              <CommentInfo>
                <CommentAuthor>
                  익명 {index + 1}
                  <CommentMajor>{comment.major}</CommentMajor>
                </CommentAuthor>
                <VSeparator />
                <CommentDate>{comment.createdAt}</CommentDate>
              </CommentInfo>
              <CommentText>{comment.text}</CommentText>
            </Comment>
          ))}
        </CommentLists>
        {/* 
          <CommentLists>
            {commentList?.map((comment) => (
              <Comment key={post.commentList.indexOf(comment)}>
                {cookies.isAdmin === 'true' &&
                  (comment.status === '등록' || comment.status === '수정') && (
                    <Button onClick={() => onDeleteComment(comment.id)}>
                      삭제
                    </Button>
                  )}
                {cookies.isAdmin === 'false' &&
                  comment?.mine &&
                  (comment.status === '등록' || comment.status === '수정') && (
                    <EditButtons>
                      <Button onClick={() => currentComment(comment)}>
                        수정
                      </Button>
                      <Button onClick={() => setIsEdit(false)}>취소</Button>
                      <Button onClick={() => onDeleteComment(comment.id)}>
                        삭제
                      </Button>
                    </EditButtons>
                  )}
                <CommentInfo>
                  <CommentAuthor>익명 {comment.anonymousNum + 1}</CommentAuthor>
                  <VSeparator />
                  <CommentDate>
                    {comment.time.slice(0, 10)} {comment.time.slice(11, 16)}
                  </CommentDate>
                </CommentInfo>
                {comment.status === '삭제' && (
                  <CommentText>댓글 작성자에 의해 삭제되었습니다.</CommentText>
                )}
                {comment.status === '정지' && (
                  <CommentText>정책을 위반한 댓글입니다.</CommentText>
                )}
                {(comment.status === '등록' || comment.status === '수정') && (
                  <CommentText>{comment.text}</CommentText>
                )}
              </Comment>
            ))}
          </CommentLists>
          {cookies.isAdmin === 'false' && !isEdit && (
            <CommentForm onSubmit={onCommentHandler}>
              <CommentInput
                placeholder="댓글을 입력해주세요."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <CommentSubmit value="입력" />
            </CommentForm>
          )}
          {cookies.isAdmin === 'false' && isEdit && (
            <CommentForm onSubmit={onCommentHandler}>
              <CommentInput
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
              />
              <CommentSubmit value="수정" />
            </CommentForm>
          )}
        </CommentWrapper> */}
      </Wrapper>
    </Container>
  );
}

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

const EditButtons = styled.div`
  display: flex;
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

const Like = styled.div<{ liked?: boolean }>`
  ${({ theme }) => theme.media.mobile} {
    max-width: 90px;
  }
  user-select: none;
  cursor: pointer;
  max-width: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${({ theme, liked }) =>
    liked ? theme.colors.gray020 : theme.colors.gray900};
  background-color: ${({ theme, liked }) =>
    liked ? theme.colors.accent : theme.colors.gray040};
  font-size: 0.9rem;
  padding: 5px 0px;
  margin-top: 0.5rem;
  border-radius: 9999px;
  :hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.gray020};
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
  margin-right: 5px;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const CommentMajor = styled.span`
  margin-left: 10px;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.gray500};
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

export default Post;
