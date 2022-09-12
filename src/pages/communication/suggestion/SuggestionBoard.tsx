import axios from 'axios';
import Board from 'components/boards/suggestion/Board';
import FilterControl from 'components/boards/suggestion/FilterControl';
import PageControl, {
  PagingProps,
} from 'components/boards/suggestion/PageControl';
import qs from 'qs';

import { PostProps } from 'components/boards/suggestion/PostProps';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white};
`;

function PetitionBoard(): JSX.Element {
  const [board, setBoard] = useState<PostProps[]>([]);
  const [boardsCount, setBoardsCount] = useState<number>(0);
  const [pagingInfo, setPagingInfo] = useState<PagingProps>({
    first: true,
    hasNext: false,
    last: true,
    page: 1,
    size: 6,
    totalElements: 0,
    totalPages: 1,
  });
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();

  const getPosts = async () => {
    const { page } = qs.parse(searchParams.toString());
    let { filter } = qs.parse(searchParams.toString());
    let { status } = qs.parse(searchParams.toString());
    const { query } = qs.parse(searchParams.toString());

    if (filter === '전체') filter = '';
    if (status === '전체') status = '';

    const { data } = await axios({
      method: 'get',
      url: `/api/suggestion?page=${Number(page) - 1}&size=6&sort=id,desc`
        .concat(filter ? `&category=${filter}` : '')
        .concat(status ? `&status=${status}` : '')
        .concat(query ? `&query=${query}` : ''),
    });

    setBoardsCount(data.totalElements);
    setBoard([...data.content]);
    setPagingInfo(data);
  };

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
    getPosts();
  }, [searchParams, boardsCount]);

  return (
    <Container>
      <FilterControl />
      <Board posts={board} pagingInfo={pagingInfo} currentPage={page} />
      <PageControl pagingInfo={pagingInfo} currentPage={page} />
    </Container>
  );
}

export default PetitionBoard;
