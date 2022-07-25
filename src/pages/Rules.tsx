import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Desktop, Mobile, Tablet } from 'hooks/MediaQueries';
import styled from 'styled-components';

import { RuleProps } from 'components/rules/RuleProps';
import { dummyRules } from 'components/rules/api/DummyRules';

import PageControl from 'components/rules/PageControl';
import RulesBoard from 'components/rules/RulesBoard';
import MobileRulesBoard from 'components/rules/mobile/RulesBoard';
import TopBar from 'components/rules/TopBar';
import MobileTopBar from 'components/rules/mobile/TopBar';
import GlobalBanner from 'components/global/banner/GlobalBanner';


const Container = styled.div`
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
      <Desktop>
        <>
          <GlobalBanner title="회칙 및 세칙" detail="회칙 및 세칙 입니다."  />
          <TopBar 
            totalBoards={boardsCount} 
            currentPage={page} 
          />
        </>
      </Desktop>
      <Tablet>
        <>
          <GlobalBanner title="회칙 및 세칙" detail="회칙 및 세칙 입니다."  />
          <TopBar 
            totalBoards={boardsCount} 
            currentPage={page} 
          />
        </>
      </Tablet>
      <Mobile>
        <MobileTopBar 
          totalBoards={boardsCount} 
          currentPage={page} 
        />
      </Mobile>
      
      <Desktop>
        <RulesBoard posts={board} />
      </Desktop>
      <Tablet>
        <RulesBoard posts={board} />
      </Tablet>
      <Mobile>
        <MobileRulesBoard posts={board} />
      </Mobile>

      <PageControl
        postCount={boardsCount}
        currentPage={page}
      />
    </Container>
  )
}

export default Rules;
