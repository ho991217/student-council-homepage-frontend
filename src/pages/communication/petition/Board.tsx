import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { PagingProps } from 'components/PageControl';
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
  grid-template-columns: 1fr 2fr 8fr 2fr;
  place-items: center;
  transition: all 0.2s ease-in-out;
  :not(:first-child) {
    :hover {
      background-color: rgba(0, 0, 0, 0.07);
    }
  }
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

const PostTitle = styled.div`
  ${({ theme }) => theme.media.mobile} {
    max-width: 100px;
  }
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
          <PageInfo>
            Total <PointText>{pagingInfo.totalElements}건,</PointText>{' '}
            {currentPage}/
            {Math.ceil(pagingInfo.totalElements / pagingInfo.size)}
          </PageInfo>
          <BoardHead>
            <Row>
              <div>번호</div>
              <div>머릿말</div>
              <div>제목</div>
              <div>동의수</div>
            </Row>
          </BoardHead>

          {board.map((post, index) => (
            <Link key={post.id} to={`/board-petition/board?id=${post.id}`}>
              <Row>
                <div>{index + 1 + (pagingInfo.page - 1) * pagingInfo.size}</div>
                <div>{post.petitionStatus}</div>
                <PostTitle>{post.title}</PostTitle>
                <div>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    height="48"
                    width="48"
                  >
                    <path d="M4 34V6.1Q4 5.4 4.65 4.7Q5.3 4 6 4H31.95Q32.7 4 33.35 4.675Q34 5.35 34 6.1V23.9Q34 24.6 33.35 25.3Q32.7 26 31.95 26H12ZM14.05 36Q13.35 36 12.675 35.3Q12 34.6 12 33.9V29H37V12H42Q42.7 12 43.35 12.7Q44 13.4 44 14.15V43.95L36.05 36ZM31 7H7V26.75L10.75 23H31ZM7 7V23V26.75Z" />
                  </Svg>
                  {post.commentCount}
                </div>
              </Row>
            </Link>
          ))}
          <Link to="/board-petition/editor">
            <Button type="button">작성</Button>
          </Link>
        </BoardsContainer>
      </Wrapper>
    </Container>
  );
}

export default Board;
