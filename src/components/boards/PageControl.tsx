import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

const Arrow = styled.svg``;

const Indexes = styled.ol`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Index = styled.li<{ cur: boolean }>`
  margin: 0px 7.5px;
  font-weight: ${(props) => (props.cur ? '500' : '300')};
`;

function PageControl({
  postCount,
  filter,
  currentPage,
}: {
  postCount: number;
  filter: string;
  currentPage: number;
}) {
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    setPageCount(Math.ceil(postCount / 6));
  }, [postCount]);

  return (
    <Container>
      {currentPage !== 1 && (
        <a href={`/board-petition/boards/${currentPage - 1}`}>
          {/* 

            FIXME: Link로 구현 시 rerender가 일어나지 않아 게시글이 중첩되는 버그가 발생,
                따라서 a태그로 구현함

        */}
          <Arrow
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            height="24"
            width="24"
          >
            <path d="M28.05 36 16 23.95 28.05 11.9 30.2 14.05 20.3 23.95 30.2 33.85Z" />
          </Arrow>
        </a>
      )}
      <Indexes>
        {Array.from({ length: pageCount }, (_, i) => (
          <Index cur={i + 1 === currentPage} key={i}>
            <a href={`/board-petition/boards/${i + 1}`}>{i + 1}</a>
          </Index>
        ))}
      </Indexes>
      {currentPage !== pageCount && (
        <a href={`/board-petition/boards/${currentPage + 1}`}>
          <Arrow
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            height="24"
            width="24"
          >
            <path d="M18.75 36 16.6 33.85 26.5 23.95 16.6 14.05 18.75 11.9 30.8 23.95Z" />
          </Arrow>
        </a>
      )}
    </Container>
  );
}

export default PageControl;
