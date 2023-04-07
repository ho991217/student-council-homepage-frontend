import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import axios from 'axios';

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
  grid-template-columns: ${({ isAdmin }: { isAdmin: boolean }) =>
    isAdmin ? '1fr 2fr 2fr 2fr 1fr 0.5fr' : '1fr 2fr 2fr 2fr 1fr'};
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
  }
`;

const Svg = styled.svg`
  width: 16px;
  height: 16px;
  cursor: pointer;
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
  posts: ConferenceProps[];
  totalBoards: number;
  currentPage: number;
}

function ConferenceBoard({
  posts,
  totalBoards,
  currentPage,
}: BoardProps): JSX.Element {
  const [cookies] = useCookies(['X-AUTH-TOKEN', 'isAdmin']);
  const [isAdmin, setIsAdmin] = useState<boolean>(cookies.isAdmin === 'true');

  const handleDelete = (id: number) => {
    axios
      .delete(`/conference/${id}`, {
        headers: {
          'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
        },
      })
      .then(function (response) {
        window.location.replace('/conference');
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      });
  };

  return (
    <Container>
      <Wrapper>
        <BoardsContainer>
          <PageInfo>
            Total <PointText>{totalBoards}건,</PointText> {currentPage}/
            {Math.ceil(totalBoards / 6)}
          </PageInfo>
          <BoardHead>
            <Row isAdmin={isAdmin}>
              <div>회차</div>
              <div>개최일자</div>
              <div>등록일자</div>
              <div>회의록</div>
              <div>보기</div>
              {isAdmin && <div>삭제</div>}
            </Row>
          </BoardHead>

          {posts.map((post) => (
            <Row key={post.id} isAdmin={isAdmin}>
              <div>{post.round}차</div>
              <div>
                {post.date.substring(0, 4)}년 {post.date.substring(5, 7)}월{' '}
                {post.date.substring(8, 10)}일
              </div>
              <div>{post.createdAt}</div>
              <div>{post.title}</div>
              <div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={post.files[0].url}
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
              </div>
              {isAdmin && (
                <div>
                  <Svg
                    width="20"
                    height="20"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => handleDelete(post.id)}
                  >
                    <path
                      d="M12.5 31.25L18.3086 86.4277C18.4297 87.5798 18.9732 88.6461 19.8341 89.4212C20.6949 90.1962 21.8123 90.6251 22.9707 90.625H77.0293C78.1877 90.6251 79.3051 90.1962 80.1659 89.4212C81.0268 88.6461 81.5703 87.5798 81.6914 86.4277L87.5 31.25H12.5ZM60.9375 73.7227L50 62.7852L39.0625 73.7227L34.0898 68.75L45.0273 57.8125L34.0898 46.875L39.0625 41.9023L50 52.8398L60.9375 41.9023L65.9102 46.875L54.9727 57.8125L65.9102 68.75L60.9375 73.7227Z"
                      fill="black"
                    />
                    <path
                      d="M91.4062 9.375H8.59375C7.29933 9.375 6.25 10.4243 6.25 11.7188V22.6562C6.25 23.9507 7.29933 25 8.59375 25H91.4062C92.7007 25 93.75 23.9507 93.75 22.6562V11.7188C93.75 10.4243 92.7007 9.375 91.4062 9.375Z"
                      fill="black"
                    />
                  </Svg>
                </div>
              )}
            </Row>
          ))}
          {isAdmin && (
            <Link to="/conference/editor">
              <Button type="button">작성</Button>
            </Link>
          )}
        </BoardsContainer>
      </Wrapper>
    </Container>
  );
}

export default ConferenceBoard;
