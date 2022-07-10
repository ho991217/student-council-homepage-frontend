import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ConferenceProps } from './ConferenceProps';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-divs: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 1290px;
  width: 100%;

  ${({ theme }) => theme.media.desktop} {
    padding: 30px 50px;
  }
  ${({ theme }) => theme.media.tablet} {
    padding: 30px 50px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 30px 10px;
  }
  display: flex;
  flex-direction: column;
  align-divs: center;
  justify-content: center;
`;

const BoardsContainer = styled.div`
  width: 100%;
`;

const PageInfo = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
`;

const BoardHead = styled.div`
  width: 100%;
  height: 70px;
  border-top: 2px solid ${({ theme }) => theme.colors.gray200};
  border-collapse: collapse;
`;

const Row = styled.div`
  width: 100%;
  height: 70px;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 1fr;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  text-align: center;

  div {
    display: flex;
    place-content: center;
    place-items: center;
    border-right: 1px solid ${({ theme }) => theme.colors.gray100};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};

    &:last-child {
      border-right: none;
  }

`;

const Svg = styled.svg`
  width: 16px;
  height: 16px;
`;

const PointText = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  margin: 0 5px;
`;

interface BoardProps {
  posts: ConferenceProps[];
  totalBoards: number;
  currentPage: number;
}

function ConferenceBoard({ posts, totalBoards, currentPage }: BoardProps): JSX.Element {
  const [board, setBoard] = useState<ConferenceProps[]>([]);

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
              <div><span>회차</span></div>
              <div>개최일자</div>
              <div>등록일자</div>
              <div>회의록</div>
              <div>보기</div>
            </Row>
          </BoardHead>

          {board.map((post) => (
            <Row key={post.id}>
              <div>{post.round}차</div>
              <div>{post.conferenceDate.substring(0,4)}년 {post.conferenceDate.substring(5,7)}월 {post.conferenceDate.substring(8,10)}일</div>
              <div>{post.createdAt}</div>
              <div>{post.title}</div>
              <div>
                <a 
                target="_blank"
                rel="noopener noreferrer"
                href={post.fileUrl}>
                  <Svg 
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                      height="64"
                      width="64"
                  >
                    <path d="M45.414 36.586a2 2 0 0 0-2.828 0L41 38.172l-3.811-3.811A20.908 20.908 0 0 0 42 21C42 9.42 32.579 0 21 0S0 9.42 0 21s9.421 21 21 21c5.071 0 9.728-1.808 13.361-4.811L38.172 41l-1.586 1.586a2 2 0 0 0 0 2.828l18 18c.391.391.902.586 1.414.586s1.023-.195 1.414-.586l6-6a2 2 0 0 0 0-2.828l-18-18zM4 21c0-9.374 7.626-17 17-17s17 7.626 17 17-7.626 17-17 17S4 30.374 4 21zm52 38.171L40.828 44 44 40.829 59.172 56 56 59.171z" />
                  </Svg>
                </a>
              </div>
            </Row>
          ))}
        </BoardsContainer>
      </Wrapper>
    </Container>
  );
}

export default ConferenceBoard;
