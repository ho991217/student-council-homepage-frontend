import { dummyPost } from 'components/boards/api/DummyPost';
import Board from 'components/boards/Board';
import FilterControl from 'components/boards/FilterControl';
import PageControl from 'components/boards/PageControl';

import { PostProps } from 'components/boards/PostProps';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white};
`;

function PetitionBoard(): JSX.Element {
  const [board, setBoard] = useState<PostProps[]>([]);
  const [boardsCount, setBoardsCount] = useState<number>(dummyPost.length);
  const [curFilter, setCurFilter] = useState<string>('전체');
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
    setCurFilter(searchParams.get('filter') || '전체');
  }, [dummyPost, searchParams]);

  useEffect(() => {
    const filteredBoard: PostProps[] = dummyPost.filter(
      (post) => post.tag === curFilter,
    );

    if (curFilter === '전체') {
      setBoard(dummyPost.slice((page - 1) * 6, page * 6));
      setBoardsCount(dummyPost.length);
    } else {
      setBoard(filteredBoard.slice((page - 1) * 6, page * 6));
      setBoardsCount(filteredBoard.length);
    }
  }, [dummyPost, page, curFilter]);

  return (
    <Container>
      <FilterControl currentTag={curFilter} />
      <Board posts={board} currentPage={page} />
      <PageControl
        postCount={boardsCount}
        filter={curFilter}
        currentPage={page}
      />
    </Container>
  );
}

export default PetitionBoard;
