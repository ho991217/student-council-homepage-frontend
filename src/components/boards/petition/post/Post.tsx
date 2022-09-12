import styled from 'styled-components';

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReactModal from 'react-modal';

import axios from 'axios';
import { useCookies } from 'react-cookie';

const TARGET_AGREEMENT = 100;

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
  ${({ theme }) => theme.media.desktop} {
    padding: 30px 50px;
  }
  ${({ theme }) => theme.media.tablet} {
    padding: 30px 50px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 30px 20px;
  }
  display: flex;
  position: relative;
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
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  margin: 15px 0px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  margin-bottom: 25px;
`;

const Etc = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 750px;
  width: 100%;
  margin-bottom: 15px;
  * {
    color: ${({ theme }) => theme.colors.gray500};
  }
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

  ${({ theme }) => theme.media.desktop} {
    height: 100px;
  }
  ${({ theme }) => theme.media.tablet} {
    height: 100px;
  }
  ${({ theme }) => theme.media.mobile} {
    height: 80px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
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
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  cursor: pointer;
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

const CommentDate = styled.div`
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.fonts.size.xs};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
`;

const CommentText = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const AdminPanel = styled.div`
  margin: 7px 0 15px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    all: unset;
    padding: 15px 25px;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.gray020};
    margin: 0 5px;
    cursor: pointer;
  }
`;

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(1px)',
  },
  content: {
    width: '30%',
    height: '200px',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    border: 'none',
    boxShadow: '0px 4px 5px 2px rgba(0, 0, 0, 0.05)',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

const DenyButton = styled.input.attrs({ type: 'button' })`
  height: 100%;
  width: 5rem;
  background-color: white;
  border-radius: 15px 0 0 15px;
  border: none;
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  :hover {
    width: 12rem;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const ConfirmButton = styled.input.attrs({ type: 'button' })`
  height: 100%;
  width: 100px;
  background-color: white;
  border-radius: 0 15px 15px 0;
  border: none;
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  :hover {
    width: 12rem;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Meter = styled.meter`
  ::-webkit-meter-bar {
    background: #fff;
    outline: none;
    border: none;
    border-radius: 2.5px;
  }
  margin-top: 10px;
  padding: 0 25px;
  height: 35px;
  width: 100%;
  ::-webkit-meter-optimum-value {
    background-image: ${({ theme }) =>
      `linear-gradient(to right,${theme.colors.secondary}  0% , ${theme.colors.primary} 100% )`};
  }
  span {
    animation: move 2s linear infinite;
    overflow: hidden;
  }
  @keyframes move {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 50px 50px;
    }
  }
`;

const AnswerContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
  margin: 20px 0;
  width: 100%;
  padding: 40px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AnserTitlePoint = styled.strong`
  color: ${({ theme }) => theme.colors.secondary};
`;

const AnswerTitle = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.xxl};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.gray800};
  margin-bottom: 15px;
`;

interface PostProps {
  adminComment?: string;
  blind: boolean;
  category: string;
  commentCount: number;
  comments: [{ createDate: string; text: string; major: string }];
  createDate: string;
  deleteDate: string;
  postHits: number;
  status: string;
  text: string;
  title: string;
}

function Post() {
  const [searchParams] = useSearchParams();
  const [post, setPost] = useState<PostProps>();
  const [postId, setPostId] = useState<number>(0);
  const [comment, setComment] = useState<string>('동의합니다.');
  const [answer, setAnswer] = useState<string>();
  const [cookies] = useCookies(['X-AUTH-TOKEN', 'isAdmin']);
  const navigate = useNavigate();
  const [modalState, setModalState] = useState({
    content: <div />,
    open: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setModalState({
      open: true,
      content: (
        <>
          <DenyButton value="취소" onClick={handleCloseModal} />
          <div>등록 하시겠습니까?</div>
          <ConfirmButton value="확인" onClick={handleCloseModal} />
        </>
      ),
    });
  };

  const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios({
      method: 'post',
      url: `/api/petition/comment/admin/${postId}`,
      headers: {
        'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ text: answer }),
    });

    console.log(res);
  };

  const sendComment = async () => {
    const text = JSON.stringify({
      text: comment,
    });
    try {
      const { data } = await axios({
        method: 'post',
        url: `api/petition/comment/${postId}`,
        headers: {
          'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
          'Content-Type': 'application/json',
        },
        data: text,
      });
      if (data.successful) {
        getCurrentPost(postId);
        console.log(data.successful);
      }
    } catch (err) {
      const error = err as any;
      setModalState({
        content: (
          <div style={{ width: '100%', display: 'grid', placeItems: 'center' }}>
            {error.response.data.message}
          </div>
        ),
        open: true,
      });
    }
  };

  const getCurrentPost = async (postid: number) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `/api/petition/${postid}`,
        headers: {
          'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
        },
      });
      setPost(data.data);
    } catch {
      navigate(-1);
    }
  };

  const handleBlind = async () => {
    try {
      await axios({
        method: 'post',
        url: `/api/petition/blind/${postId}`,
        headers: {
          'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
        },
      });
      getCurrentPost(postId);
    } catch (err) {
      // 오류
    }
  };

  const handleDelete = async () => {
    try {
      await axios({
        method: 'delete',
        url: `/api/petition/${postId}`,
        headers: {
          'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
        },
      });
      getCurrentPost(postId);
    } catch (err) {
      // 오류
    }
  };

  const handleCloseModal = (e: React.MouseEvent<HTMLInputElement>) => {
    if ((e.target as HTMLInputElement).value === '확인') {
      sendComment();
    }
    setModalState((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const postId = Number(searchParams.get('id'));
    setPostId(postId);
    getCurrentPost(postId);
  }, []);

  return (
    <Container>
      <ReactModal
        isOpen={modalState.open}
        contentLabel="Example Modal"
        style={modalStyle}
        ariaHideApp={false}
        onRequestClose={() =>
          setModalState((prev) => ({ ...prev, open: false }))
        }
        shouldCloseOnOverlayClick
      >
        {modalState.content}
      </ReactModal>
      {post && (
        <Wrapper>
          {cookies.isAdmin === 'true' && (
            <AdminPanel>
              <input type="button" value="블라인드" onClick={handleBlind} />
              <input type="button" value="삭제" onClick={handleDelete} />
            </AdminPanel>
          )}
          {post?.blind ? (
            <div>블라인드 된 게시글</div>
          ) : (
            <>
              <Hashtag>#{post?.category}</Hashtag>
              <HSeparator bold />
              <Header>[ {post?.status} ]</Header>
              <Title>{post?.title}</Title>
              <Etc>
                <div>등록일 : {post?.createDate}</div>
                <div>
                  청원 동의 인원 : {post?.commentCount} / {TARGET_AGREEMENT}
                </div>
                <div>청원 마감 : {post?.deleteDate}</div>
              </Etc>
              <Meter
                min={0}
                max={100}
                value={(post.commentCount / TARGET_AGREEMENT) * 100}
              />
              <HSeparator />
              {post.adminComment && (
                <AnswerContainer>
                  <AnswerTitle>
                    총학생회 <AnserTitlePoint>답변</AnserTitlePoint>
                  </AnswerTitle>
                  <div>{post.adminComment}</div>
                </AnswerContainer>
              )}
              <HSeparator />

              <Contents>{post?.text}</Contents>
              {post.commentCount >= TARGET_AGREEMENT &&
                !post.adminComment &&
                cookies.isAdmin === 'true' && (
                  <>
                    <HSeparator />
                    <AnswerForm onSubmit={handleAnswerSubmit}>
                      <AnswerInput
                        placeholder="답변 내용을 입력해주세요"
                        value={answer}
                        onChange={(e) => setAnswer(e.currentTarget.value)}
                      />
                      <AnswerSubmit value="전송" />
                    </AnswerForm>
                  </>
                )}
              <CommentSection>
                <CommentForm onSubmit={handleSubmit}>
                  <CommentInput
                    placeholder="동의 내용을 입력해 주세요."
                    disabled={post.status === '기간종료'}
                    value={comment}
                    onChange={(e) => setComment(e.currentTarget.value)}
                  />
                  <CommentSubmit
                    disabled={post.status === '기간종료'}
                    value="전송"
                  />
                </CommentForm>
                <CommentLists>
                  {post?.comments.length > 0 &&
                    post?.comments.map((comment) => (
                      <Comment key={post.comments.indexOf(comment)}>
                        <CommentInfo>
                          <CommentAuthor>{comment.major}</CommentAuthor>
                          <VSeparator />
                          <CommentDate>{comment.createDate}</CommentDate>
                        </CommentInfo>
                        <CommentText>{comment.text}</CommentText>
                      </Comment>
                    ))}
                </CommentLists>
              </CommentSection>
            </>
          )}
        </Wrapper>
      )}
    </Container>
  );
}

export default Post;
