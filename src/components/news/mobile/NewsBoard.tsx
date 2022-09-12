import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';

import { NewsProps } from '../NewsProps';
import { PagingProps } from '../PageControl';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-divs: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 25px 10px;
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
  grid-template-columns: 1fr 3fr 1.5fr;
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

const Button = styled.button`
  all: unset;
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.size.base};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  width: 65px;
  height: 30px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  float: right;
  margin-top: 12px;
`;

interface BoardProps {
  posts: NewsProps[];
  pagingInfo: PagingProps;
  currentPage: number;
}

function NewsBoard({
  posts,
  pagingInfo,
  currentPage,
}: BoardProps): JSX.Element {
  const [board, setBoard] = useState<NewsProps[]>([]);
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
              <Title>등록일</Title>
            </Row>
          </BoardHead>
          {board.map((post, index) => (
            <Row key={post.id}>
              <Content>
                {index + 1 + (pagingInfo.page - 1) * pagingInfo.size}
              </Content>
              <Content>
                <Link to={`/news?id=${post.id}`}>{post.title}</Link>
              </Content>
              <Content>{post.createDate}</Content>
            </Row>
          ))}
          {isAdmin && (
            <Link to="/news/editor">
              <Button type="button">작성</Button>
            </Link>
          )}
        </BoardsContainer>
      </Wrapper>
    </Container>
  );
}

export default NewsBoard;
