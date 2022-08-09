import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Desktop, Mobile, Tablet } from 'hooks/MediaQueries';
import styled from 'styled-components';

import { NewsProps } from 'components/news/NewsProps';
import { dummyNews } from 'components/news/api/DummyNews';

import PageControl from 'components/news/PageControl';
import NewsBoard from 'components/news/NewsBoard';
import MobileNewsBoard from 'components/news/mobile/NewsBoard';
import TopBar from 'components/news/TopBar';
import MobileTopBar from 'components/news/mobile/TopBar';


const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white};
`;

function News() { 
  const [board, setBoard] = useState<NewsProps[]>([]);
  const [boardsCount, setBoardsCount] = useState<number>(dummyNews.length);
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
  }, [dummyNews, searchParams]);

  useEffect(() => {
    setBoard(dummyNews.slice((page - 1) * 6, page * 6));
    setBoardsCount(dummyNews.length);
  }, [dummyNews, page]);

  return (
    <Container>
      <Desktop>
        <TopBar 
          totalBoards={boardsCount} 
          currentPage={page} 
        />
      </Desktop>
      <Tablet>
        <TopBar 
          totalBoards={boardsCount} 
          currentPage={page} 
        />
      </Tablet>
      <Mobile>
        <MobileTopBar 
          totalBoards={boardsCount} 
          currentPage={page} 
        />
      </Mobile>
      
      <Desktop>
        <NewsBoard posts={board} />
      </Desktop>
      <Tablet>
        <NewsBoard posts={board} />
      </Tablet>
      <Mobile>
        <MobileNewsBoard posts={board} />
      </Mobile>

      <PageControl
        postCount={boardsCount}
        currentPage={page}
      />
    </Container>
  )
}

export default News;
