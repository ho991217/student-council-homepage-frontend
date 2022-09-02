import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { RuleProps } from '../RuleProps';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-divs: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 10px;
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
  border-collapse: collapse;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  border-bottom: 2.5px solid ${({ theme }) => theme.colors.gray100};
  :nth-child(1) {
    height: 30px;
  }
`;

const Row = styled.div`
  width: 100%;
  height: 70px;
  display: grid;
  grid-template-columns: 1fr 3fr 1.3fr;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  text-align: center;
  div {
    display: flex;
    place-content: center;
    place-items: center;
    border-bottom: 0.5px solid ${({ theme }) => theme.colors.gray100};
  }
  :nth-child(1) {
    border-bottom: none;
  }
`;

const Title = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.gray100};
  height: 30px;
  :nth-child(2) {
    display: flex;
    justify-content: left;
    padding-left: 25px;
  }
  :last-child {
    border-right: none;
  }
`;

const Content = styled.div`
  :nth-child(2) {
    display: flex;
    justify-content: left;
    padding-left: 15px;
  }
  :last-child {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

interface BoardProps {
  posts: RuleProps[];
}

function RulesBoard({ posts }: BoardProps): JSX.Element {
  const [board, setBoard] = useState<RuleProps[]>([]);

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
            </Row>
          </BoardHead>
          {board.map((post) => (
            <Row key={post.id}>
              <Content>{post.id}</Content>
              <Content>
                <Link to={`/rule?id=${post.id}`}>{post.title}</Link>
              </Content>
              <Content>{post.userName}</Content>
            </Row>
          ))}
        </BoardsContainer>
      </Wrapper>
    </Container>
  );
}

export default RulesBoard;
