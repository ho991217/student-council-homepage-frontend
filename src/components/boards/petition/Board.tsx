import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

import { PostProps } from './PostProps';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 1290px;
  width: 100%;

  ${({ theme }) => theme.media.desktop} {
    padding: 30px 50px 10px 50px;
  }
  ${({ theme }) => theme.media.tablet} {
    padding: 30px 50px 10px 50px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 30px 20px 20px 10px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoardsContainer = styled.div`
  width: 100%;
`;

const PageInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
`;

const BoardHead = styled.div`
  width: 100%;
  height: 70px;
  border-top: 1.5px solid ${({ theme }) => theme.colors.gray200};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
`;

const Row = styled.div`
  width: 100%;
  height: 70px;
  display: grid;
  grid-template-columns: 1fr 2fr 8fr 2fr 1fr;
  place-items: center;
  ${({ theme }) => theme.media.desktop} {
    padding: 0px 50px;
  }
  ${({ theme }) => theme.media.tablet} {
    padding: 0px 50px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 0px 10px;
  }
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  text-align: center;

  div:last-child {
    width: 60px;
  }
`;

const Svg = styled.svg`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

const PointText = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  margin: 0 5px;
`;

const Button = styled.button`
  all: unset;
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.size.base};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  width: 75px;
  height: 40px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  float: right;
  margin-top: 12px;
`;

interface BoardProps {
  posts: PostProps[];
  totalBoards: number;
  currentPage: number;
}

// TODO: 로그인 했는지 안했는지 체크
function Board({ posts, totalBoards, currentPage }: BoardProps): JSX.Element {
  const [board, setBoard] = useState<PostProps[]>([]);
  const [cookies] = useCookies(['X-AUTH-TOKEN']);

  useEffect(() => {
    setBoard(posts);
  }, [posts]);

  return (
    <Container>
      <Wrapper>
        <BoardsContainer>
          <PageInfo>
            Total <PointText>{totalBoards}건,</PointText> {currentPage}/
            {Math.ceil(totalBoards / 6)}
          </PageInfo>
          <BoardHead>
            <Row>
              <div>번호</div>
              <div>머릿말</div>
              <div>제목</div>
              <div>추천수</div>
              <div>동의수</div>
            </Row>
          </BoardHead>

          {board.map((post) => (
            <Row key={post.id}>
              <div>{post.id}</div>
              <div>{post.status}</div>
              <div>
                <Link to={`/board-petition/board?id=${post.id}`}>
                  {post.title}
                </Link>
              </div>
              <div>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  height="48"
                  width="48"
                >
                  <path d="M35.8 42H13.6V16.4L27.5 2L29.45 3.55Q29.75 3.8 29.9 4.25Q30.05 4.7 30.05 5.35V5.85L27.8 16.4H42.75Q43.95 16.4 44.85 17.3Q45.75 18.2 45.75 19.4V23.5Q45.75 23.85 45.825 24.225Q45.9 24.6 45.75 24.95L39.45 39.45Q39 40.5 37.975 41.25Q36.95 42 35.8 42ZM16.6 39H36.45Q36.45 39 36.45 39Q36.45 39 36.45 39L42.75 24.05V19.4Q42.75 19.4 42.75 19.4Q42.75 19.4 42.75 19.4H24.1L26.75 6.95L16.6 17.65ZM16.6 17.65V19.4Q16.6 19.4 16.6 19.4Q16.6 19.4 16.6 19.4V24.05V39Q16.6 39 16.6 39Q16.6 39 16.6 39ZM13.6 16.4V19.4H6.95V39H13.6V42H3.95V16.4Z" />
                </Svg>
                {post.likes}
              </div>
              <div>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  height="48"
                  width="48"
                >
                  <path d="M4 34V6.1Q4 5.4 4.65 4.7Q5.3 4 6 4H31.95Q32.7 4 33.35 4.675Q34 5.35 34 6.1V23.9Q34 24.6 33.35 25.3Q32.7 26 31.95 26H12ZM14.05 36Q13.35 36 12.675 35.3Q12 34.6 12 33.9V29H37V12H42Q42.7 12 43.35 12.7Q44 13.4 44 14.15V43.95L36.05 36ZM31 7H7V26.75L10.75 23H31ZM7 7V23V26.75Z" />
                </Svg>
                {post.commentList.length}
              </div>
            </Row>
          ))}
          <Link to="/petition/editor">
            <Button type="button">작성</Button>
          </Link>
        </BoardsContainer>
      </Wrapper>
    </Container>
  );
}

export default Board;
