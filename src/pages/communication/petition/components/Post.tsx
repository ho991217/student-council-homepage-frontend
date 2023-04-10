import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReactModal from 'react-modal';
import FileDownloader from 'components/post/FileDownloader';
import parse from 'html-react-parser';
import axios from 'axios';
import SideNav from 'components/nav/SideNav';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'atoms/UserInfo';
import PetitionChart from './PetitionChart';

const TARGET_AGREEMENT = 150;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.gray040};
  ${({ theme }) => theme.media.desktop} {
    padding-left: 50px;
  }
`;

const Wrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  ${({ theme }) => theme.media.desktop} {
    padding: 40px 50px;
    margin: 40px 30px;
  }
  ${({ theme }) => theme.media.tablet} {
    padding: 40px 50px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 40px 20px;
  }
  background-color: ${({ theme }) => theme.colors.white};
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
  > a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const AgreeButton = styled.button`
  ${({ theme }) => theme.media.mobile} {
    max-width: 90px;
  }
  user-select: none;
  cursor: pointer;
  max-width: 160px;
  height: 100px;
  display: flex;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  padding: 5px 0px;
  margin-top: 0.5rem;
  border-radius: 10px;
  border: 0;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const ChartTitle = styled.h3`
  display: flex;
  gap: 5px;
  align-items: center;
  width: 100%;
`;

const ChartWrapper = styled.div<{ visibility: boolean }>`
  display: ${(props) => (props.visibility ? 'flex' : 'none')};
  position: relative;
  margin-top: 40px;
  background-color: ${({ theme }) => theme.colors.white};
  transition: ${(props) =>
    props.visibility ? 'display 0s linear 0s, opacity 300ms' : 'none'};
  flex-direction: column;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  padding: 10px 10px 30px 10px;
  border-radius: 6px;
  ${({ theme }) => theme.media.mobile} {
    width: 300px;
  }
  ${({ theme }) => theme.media.tablet} {
    width: 600px;
  }
  width: 800px;
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

const AdminPanel = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  input {
    all: unset;
    padding: 10px 15px;
    border-radius: 5px;
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
    height: '150px',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    border: 'none',
    boxShadow: '0px 4px 5px 2px rgba(0, 0, 0, 0.05)',
    borderRadius: '15px',
  },
};

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const ModalText = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
const ModalButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;
const DenyButton = styled.input.attrs({ type: 'button' })`
  height: 100%;
  width: 5rem;
  border-radius: 10px;
  padding: 4px 0;
  border: none;
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  background-color: ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.colors.white};
  &:hover {
    cursor: pointer;
  }
`;

const ConfirmButton = styled.input.attrs({ type: 'button' })`
  height: 100%;
  width: 5rem;
  border-radius: 10px;
  padding: 4px 0;
  border: none;
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  &:hover {
    cursor: pointer;
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
  line-height: 150%;
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
  title: string;
  body: string;
  author: string;
  createdAt: string;
  expiresAt: string;
  status: string;
  answer?: string;
  mine: boolean;
  liked: boolean;
  likes: number;
  statisticList: [];
  tags: [];
  agreeCount: number;
  files?: fileType[];
}

export type fileType = {
  id: number;
  originalName: string;
  url: string;
};

export const generateHyperlink = (body: string) => {
  const token = body.split(/['"\n\t\r ]/);

  const result = [] as string[];

  token.forEach((t) => {
    let newMarkup = t;
    if (t.startsWith('http') || t.startsWith('https')) {
      newMarkup = `<a href='${t}'>${t}</a>`;
    } else if (t.startsWith('www')) {
      newMarkup = `<a href='https://${t}'>${t}</a>`;
    }
    result.push(newMarkup);
  });

  return result.join(' ');
};

function Post() {
  const [searchParams] = useSearchParams();
  const [post, setPost] = useState<PostProps>();
  const [postId, setPostId] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const user = useRecoilValue(userInfo);
  const [adminAnswer, setAdminAnswer] = useState<string>();
  const [dataUpdate, setDataUpdate] = useState(false);
  const [error, setError] = useState({
    isOpen: false,
    message: '',
  });
  const navigate = useNavigate();
  const [modalState, setModalState] = useState({
    content: <div />,
    open: false,
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModalState({
      open: true,
      content: (
        <ModalContainer>
          <ModalText>동의하시겠습니까?</ModalText>
          <ModalButtonContainer>
            <DenyButton value="취소" onClick={handleCloseModal} />
            <ConfirmButton value="확인" onClick={handleCloseModal} />
          </ModalButtonContainer>
        </ModalContainer>
      ),
    });
  };

  const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios({
        method: 'post',
        url: `/post/petition/reply/${postId}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: { answer: adminAnswer },
      }).then((res) => {
        setAdminAnswer('');
      });
      getCurrentPost(postId);
    } catch (e) {
      const { data } = e as any;
      setError((prev) => ({
        ...prev,
        isOpen: true,
        message: data.message,
      }));
    }
  };

  const postAgree = async () => {
    axios({
      url: `/post/petition/agree/${postId}`,
      method: 'post',
      data: '',
    })
      .then((res) => {
        alert('청원에 동의하셨습니다.');
        getCurrentPost(postId);
        setDataUpdate(true);
      })
      .catch(function (error) {
        alert('이미 동의하셨습니다.');
      });
  };

  const getCurrentPost = async (postid: number) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `/post/petition/${postid}`,
      });

      setPost({ ...data, body: generateHyperlink(data.body) });
      setLikeCount(data.likes);
    } catch {
      navigate(-1);
    }
  };

  const handleBlind = async () => {
    try {
      await axios({
        method: 'patch',
        url: `/post/petition/blind/${postId}`,
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
        url: `/post/petition/${postId}`,
      });
      getCurrentPost(postId);
    } catch (err) {
      // 오류
    }
  };

  const handleCloseModal = (e: React.MouseEvent<HTMLInputElement>) => {
    if ((e.target as HTMLInputElement).value === '확인') {
      postAgree();
    }
    setModalState((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const postId = Number(searchParams.get('id'));
    setPostId(postId);
    getCurrentPost(postId);
  }, []);
  const [chartVisibility, setChartVisibility] = useState(false);
  const handleShowChart = () => {
    setChartVisibility(true);
  };
  const handleCancleChart = () => {
    setChartVisibility(false);
  };
  return (
    <Container>
      <SideNav margin="40px 0" />
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
          {user.admin && (
            <AdminPanel>
              <input type="button" value="블라인드" onClick={handleBlind} />
              <input type="button" value="삭제" onClick={handleDelete} />
            </AdminPanel>
          )}
          {/* <Hashtag>#</Hashtag> */}
          <HSeparator bold />
          <Header>{`[ ${
            post.status === 'ACTIVE' ? '진행중' : '마감'
          }  ]`}</Header>
          <Title>{post?.title}</Title>
          <Etc>
            <div>등록일 : {post?.createdAt.slice(0, 10)}</div>
            <div>
              청원 동의 인원 : {post.agreeCount} / {TARGET_AGREEMENT}
            </div>
            <div>청원 마감 : {post.expiresAt}</div>
          </Etc>
          <HSeparator />
          <Contents>
            {parse(post.body)}
            <ButtonContainer>
              <AgreeButton onClick={handleSubmit}>동의하기</AgreeButton>
            </ButtonContainer>
            {post.files && <FileDownloader files={post.files} />}
            <ChartContainer>
              <ChartTitle>
                청원 동의 {post.agreeCount}명
                <svg
                  width="22"
                  height="21"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.2326 20.4651H0.767442C0.347907 20.4651 0 20.1172 0 19.6976C0 19.2781 0.347907 18.9302 0.767442 18.9302H21.2326C21.6521 18.9302 22 19.2781 22 19.6976C22 20.1172 21.6521 20.4651 21.2326 20.4651Z"
                    fill="#1D64AA"
                  />
                  <path
                    d="M8.69775 2.04651V20.4651H13.3024V2.04651C13.3024 0.92093 12.8419 0 11.4605 0H10.5396C9.15822 0 8.69775 0.92093 8.69775 2.04651Z"
                    fill="#1D64AA"
                  />
                  <path
                    opacity="0.4"
                    d="M1.79053 8.18592V20.465H5.88355V8.18592C5.88355 7.06033 5.47425 6.1394 4.24634 6.1394H3.42774C2.19983 6.1394 1.79053 7.06033 1.79053 8.18592Z"
                    fill="#1D64AA"
                  />
                  <path
                    opacity="0.4"
                    d="M16.1162 13.3026V20.4654H20.2092V13.3026C20.2092 12.177 19.7999 11.2561 18.572 11.2561H17.7534C16.5255 11.2561 16.1162 12.177 16.1162 13.3026Z"
                    fill="#1D64AA"
                  />
                </svg>
                {!chartVisibility ? (
                  <RiArrowDownSLine
                    style={{
                      color: 'gray',
                      cursor: 'pointer',
                      fontSize: '35px',
                      alignSelf: 'flex-end',
                    }}
                    onClick={handleShowChart}
                  />
                ) : (
                  <RiArrowUpSLine
                    style={{
                      color: 'gray',
                      cursor: 'pointer',
                      fontSize: '35px',
                      alignSelf: 'flex-end',
                    }}
                    onClick={handleCancleChart}
                  />
                )}
              </ChartTitle>
              <ChartWrapper visibility={chartVisibility}>
                <PetitionChart dataUpdate={dataUpdate} />
              </ChartWrapper>
            </ChartContainer>
            {post.answer && (
              <AnswerContainer>
                <AnswerTitle>
                  총학생회 <AnserTitlePoint>답변</AnserTitlePoint>
                </AnswerTitle>
                <div>{post.answer}</div>
              </AnswerContainer>
            )}
          </Contents>

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
        </Wrapper>
      )}
    </Container>
  );
}

export default Post;
