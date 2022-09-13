import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import qs from 'qs';
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
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1) inset;
  ${({ theme }) => theme.media.desktop} {
    max-width: 400px;
  }
  ${({ theme }) => theme.media.tablet} {
    max-width: 200px;
  }
  ${({ theme }) => theme.media.mobile} {
    max-width: 200px;
  }
  overflow-x: scroll;
  padding: 15px 0;
`;

const Index = styled.li<{ cur: boolean }>`
  margin: 0px 7.5px;
  font-weight: ${(props) => (props.cur ? '500' : '300')};
`;

export interface PagingProps {
  first: boolean;
  hasNext: boolean;
  last: boolean;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

function PageControl({
  currentPage,
  pagingInfo,
}: {
  currentPage: number;
  pagingInfo: PagingProps;
}) {
  const [pageCount, setPageCount] = useState(0);
  const params = useSearchParams();

  const generateParams = (page: number) => {
    let { filter } = qs.parse(params[0].toString());
    let { query } = qs.parse(params[0].toString());

    if (!filter) filter = '';
    if (!query) query = '';

    if (filter === '' && query === '') {
      return `/board-suggestion/boards?page=${page}`;
    }
    return `/board-suggestion/boards?page=${page}&filter=${filter}&query=${query}`;
  };

  useEffect(() => {
    setPageCount(Math.ceil(pagingInfo.totalElements / pagingInfo.size));
  }, [pagingInfo.totalElements]);

  return (
    <Container>
      {currentPage !== 1 && (
        <Link to={generateParams(currentPage - 1)}>
          <Arrow
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            height="24"
            width="24"
          >
            <path d="M28.05 36 16 23.95 28.05 11.9 30.2 14.05 20.3 23.95 30.2 33.85Z" />
          </Arrow>
        </Link>
      )}
      <Indexes>
        {Array.from({ length: pageCount }, (_, i) => (
          <Index cur={i + 1 === currentPage} key={i}>
            <Link to={generateParams(i + 1)}>{i + 1}</Link>
          </Index>
        ))}
      </Indexes>
      {currentPage !== pageCount && (
        <Link to={generateParams(currentPage + 1)}>
          <Arrow
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            height="24"
            width="24"
          >
            <path d="M18.75 36 16.6 33.85 26.5 23.95 16.6 14.05 18.75 11.9 30.8 23.95Z" />
          </Arrow>
        </Link>
      )}
    </Container>
  );
}

export default PageControl;
