import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';

import { RuleProps } from './RuleProps';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-divs: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 1290px;
  width: 100%;
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  align-divs: center;
  justify-content: center;
`;

const BoardsContainer = styled.div`
  width: 100%;
`;

const BoardHead = styled.div`
  width: 100%;
  height: 70px;
  border-top: 3px solid ${({ theme }) => theme.colors.gray900};
  border-collapse: collapse;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
`;

const Row = styled.div`
  width: 100%;
  height: 70px;
  display: grid;
  grid-template-columns: 0.8fr 3fr 1.2fr 0.8fr 1fr 0.8fr;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  text-align: center;
  div {
    display: flex;
    place-content: center;
    place-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  }
`;

const Title = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.gray100};
  :last-child {
    border-right: none;
  }
`;

const Content = styled.div`
  :nth-child(2) {
    display: flex;
    justify-content: left;
    padding-left: 25px;
    cursor: pointer;
  }
`;

const Svg = styled.svg`
  width: 16px;
  height: 16px;
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
  posts: RuleProps[];
}

function RulesBoard({ posts }: BoardProps): JSX.Element {
  const [board, setBoard] = useState<RuleProps[]>([]);
  const [cookies] = useCookies(['X-AUTH-TOKEN', 'isAdmin']);
  const [isAdmin, setIsAdmin] = useState<boolean>(cookies.isAdmin === 'true');

  useEffect(() => {
    setBoard(posts);
  }, [posts]);

  return (
    <Container>
      <Wrapper>
        <BoardsContainer>
          <BoardHead>
            <Row>
              <Title>번호</Title>
              <Title>제목</Title>
              <Title>부서명</Title>
              <Title>조회수</Title>
              <Title>등록일</Title>
              <Title>첨부파일</Title>
            </Row>
          </BoardHead>
          {board.map((post) => (
            <Row key={post.id}>
              <Content>{post.id}</Content>
              <Content>
                <Link to={`/rule?id=${post.id}`}>{post.title}</Link>
              </Content>
              <Content>{post.userName}</Content>
              <Content>{post.postHits}</Content>
              <Content>{post.createDate}</Content>
              <Content>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={post?.fileList[0]?.url}
                >
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    height="64"
                    width="64"
                  >
                    <path d="M45.414 36.586a2 2 0 0 0-2.828 0L41 38.172l-3.811-3.811A20.908 20.908 0 0 0 42 21C42 9.42 32.579 0 21 0S0 9.42 0 21s9.421 21 21 21c5.071 0 9.728-1.808 13.361-4.811L38.172 41l-1.586 1.586a2 2 0 0 0 0 2.828l18 18c.391.391.902.586 1.414.586s1.023-.195 1.414-.586l6-6a2 2 0 0 0 0-2.828l-18-18zM4 21c0-9.374 7.626-17 17-17s17 7.626 17 17-7.626 17-17 17S4 30.374 4 21zm52 38.171L40.828 44 44 40.829 59.172 56 56 59.171z" />
                  </Svg>
                </a>
              </Content>
            </Row>
          ))}
          {isAdmin && (
            <Link to="/rule/editor">
              <Button type="button">작성</Button>
            </Link>
          )}
        </BoardsContainer>
      </Wrapper>
    </Container>
  );
}

export default RulesBoard;
