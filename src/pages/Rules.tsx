import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { RuleProps } from 'components/rules/RuleProps';
import { dummyRules } from 'components/rules/api/DummyRules';
import PageControl from 'components/rules/PageControl';
import RulesBoard from 'components/rules/RulesBoard';
import SideBar from 'components/rules/SideBar';


const Container = styled.div`
  padding-top: 4%;
  background-color: ${(props) => props.theme.colors.white};
`;

function Rules() { 
  const [board, setBoard] = useState<RuleProps[]>([]);
  const [boardsCount, setBoardsCount] = useState<number>(dummyRules.length);
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
  }, [dummyRules, searchParams]);

  useEffect(() => {
    setBoard(dummyRules.slice((page - 1) * 6, page * 6));
    setBoardsCount(dummyRules.length);
  }, [dummyRules, page]);

  return (
    <Container>
      <SideBar 
        totalBoards={boardsCount} 
        currentPage={page} 
      />
      <RulesBoard 
        posts={board} 
      />
      <PageControl
        postCount={boardsCount}
        currentPage={page}
      />
    </Container>
  )
}

export default Rules;
