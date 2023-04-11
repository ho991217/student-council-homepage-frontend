import { useState, useEffect } from 'react';
import { PagingProps } from 'components/PageControl';
import { Link } from 'react-router-dom';
import { Desktop, Mobile, Tablet } from 'hooks/MediaQueries';
import styled from 'styled-components';
// import { PagingProps } from "components/PageControl";
import { PostProps } from '../../qna/PostProps';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 18px;
`;

const Wrapper = styled.div`
  max-width: 1290px;
  width: 100%;
  ${({ theme }) => theme.media.desktop} {
    padding: 10px 50px 10px 0px;
  }
  ${({ theme }) => theme.media.tablet} {
    padding: 30px 50px 10px 0px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 30px 10px 20px 10px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoardsContainer = styled.div`
  width: 100%;
`;

const BoardHead = styled.div`
  width: 100%;
  height: 70px;
  border-top: 3px solid #434343;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
`;

const LinkDiv = styled.div`
  width: 100%;
  a {
    display: block;
  }
`;

const Row = styled.div`
  width: 100%;
  height: 70px;
  display: grid;
  place-items: center;
  ${({ theme }) => theme.media.desktop} {
    padding: 0px 20px;
    grid-template-columns: 1fr 1fr 3fr 1fr 1fr;
  }
  ${({ theme }) => theme.media.tablet} {
    padding: 0px 20px;
    grid-template-columns: 1fr 1fr 3fr 1fr 1fr;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 0px 5px;
    grid-template-columns: 1fr 1fr 3fr 1fr;
  }
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  text-align: center;
  div:last-child {
    width: 60px;
  }
`;

interface BoardProps {
  posts: PostProps[];
  pagingInfo: PagingProps;
  currentPage: number;
}

function Board({ posts, pagingInfo, currentPage }: BoardProps): JSX.Element {
  const [board, setBoard] = useState<PostProps[]>([]);

  useEffect(() => {
    setBoard(posts);
  }, [posts]);

  return (
    <Container>
      <Wrapper>
        <BoardsContainer>
          <Desktop>
            <>
              <BoardHead>
                <Row>
                  <div>번호</div>
                  <div>작성일</div>
                  <div>제목</div>
                  <div>처리상태</div>
                  <div>조회수</div>
                </Row>
              </BoardHead>
              {board.map((post, index) => (
                <Row key={post.id}>
                  <div>
                    {index + 1 + pagingInfo.page * pagingInfo.size}
                  </div>
                  <div>{post.createdAt}</div>
                  <LinkDiv>
                    {post.status === '정지' ? (
                      <Link
                        to="/voc/boards?page=1"
                        style={{ cursor: 'default' }}
                      >
                        관리자에 의해 삭제된 게시물입니다.
                      </Link>
                    ) : (
                      <Link to={`/voc/my-voice/board?id=${post.id}`}>
                        {post.title}
                      </Link>
                    )}
                  </LinkDiv>
                  <div>
                    {post.status === 'WAITING' ? '답변 전' : '답변 완료'}
                  </div>
                  <div>{post.views}</div>
                </Row>
              ))}
            </>
          </Desktop>
          <Tablet>
            <>
              <BoardHead>
                <Row>
                  <div>번호</div>
                  <div>작성일</div>
                  <div>제목</div>
                  <div>처리상태</div>
                  <div>조회수</div>
                </Row>
              </BoardHead>
              {board.map((post, index) => (
                <Row key={post.id}>
                  <div>
                    {index + 1 + pagingInfo.page * pagingInfo.size}
                  </div>
                  <div>{post.createdAt}</div>
                  <LinkDiv>
                    {post.status === '정지' ? (
                      <Link
                        to="/voc/boards?page=1"
                        style={{ cursor: 'default' }}
                      >
                        관리자에 의해 삭제된 게시물입니다.
                      </Link>
                    ) : (
                      <Link to={`/voc/my-voice/board?id=${post.id}`}>
                        {post.title}
                      </Link>
                    )}
                  </LinkDiv>
                  <div>
                    {post.status === 'WAITING' ? '답변 전' : '답변 완료'}
                  </div>
                  <div>{post.views}</div>
                </Row>
              ))}
            </>
          </Tablet>
          <Mobile>
            <>
              <BoardHead>
                <Row>
                  <div>번호</div>
                  <div>작성일</div>
                  <div>제목</div>
                  <div>처리상태</div>
                </Row>
              </BoardHead>
              {board.map((post, index) => (
                <Row key={post.id}>
                  <div>
                    {index + 1 + pagingInfo.page * pagingInfo.size}
                  </div>

                  <div>{post.createdAt}</div>
                  <LinkDiv>
                    {post.status === '정지' ? (
                      <Link
                        to="/voc/boards?page=1"
                        style={{ cursor: 'default' }}
                      >
                        관리자에 의해 삭제된 게시물입니다.
                      </Link>
                    ) : (
                      <Link to={`/voc/my-voice/board?id=${post.id}`}>
                        {post.title}
                      </Link>
                    )}
                  </LinkDiv>
                  <div>
                    {post.status === 'WAITING' ? '답변 전' : '답변 완료'}
                  </div>
                </Row>
              ))}
            </>
          </Mobile>
        </BoardsContainer>
      </Wrapper>
    </Container>
  );
}

export default Board;
