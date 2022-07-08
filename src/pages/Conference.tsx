import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ConferenceProps } from 'components/conference/ConferenceProps';
import { dummyConference } from 'components/conference/api/DummyConference';
import { useSearchParams } from 'react-router-dom';
import PageControl from 'components/conference/PageControl';
import ConferenceBoard from 'components/conference/ConferenceBoard';

const Container = styled.div`
  padding-top: 4%;
  background-color: ${(props) => props.theme.colors.white};
`;

function Conference(): JSX.Element {
  const [board, setBoard] = useState<ConferenceProps[]>([]);
  const [boardsCount, setBoardsCount] = useState<number>(dummyConference.length);
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
  }, [dummyConference, searchParams]);

  useEffect(() => {
    setBoard(dummyConference.slice((page - 1) * 6, page * 6));
    setBoardsCount(dummyConference.length);
  }, [dummyConference, page]);

  return (
    <Container>
      <ConferenceBoard 
        posts={board} 
        totalBoards={boardsCount} 
        currentPage={page} 
      />
      <PageControl
        postCount={boardsCount}
        currentPage={page}
      />
    </Container>
  );
}

export default Conference;
