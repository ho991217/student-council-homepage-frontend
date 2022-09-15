import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
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
  const [info, setInfo] = useState({
    startIdx: 0,
    endIdx: 0,
    total: 0,
  });
  const params = useSearchParams();
  const location = useLocation();

  const generateParams = (page: number) => {
    let { filter } = qs.parse(params[0].toString());
    let { query } = qs.parse(params[0].toString());

    if (!filter) filter = '';
    if (!query) query = '';

    if (filter === '' && query === '') {
      return `${location.pathname}?page=${page}`;
    }
    return `${location.pathname}?page=${page}&filter=${filter}&query=${query}`;
  };

  useEffect(() => {
    const total = Math.ceil(pagingInfo.totalElements / pagingInfo.size);
    const startIdx =
      currentPage % 10 === 0
        ? currentPage - (currentPage % 10) - 9
        : currentPage - (currentPage % 10) + 1;
    let endIdx =
      currentPage % 10 === 0
        ? currentPage - (currentPage % 10)
        : currentPage - (currentPage % 10) + 10;

    if (endIdx > pagingInfo.totalPages) endIdx = pagingInfo.totalPages;
    setInfo({
      startIdx,
      endIdx,
      total,
    });
  }, [pagingInfo.totalElements, currentPage]);

  return (
    <Container>
      {info.startIdx !== 1 && (
        <Link to={generateParams(info.startIdx - 1)}>
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
        {Array.from({ length: info.endIdx - info.startIdx + 1 }, (_, i) => (
          <Index cur={info.startIdx + i === currentPage} key={i}>
            <Link to={generateParams(i + 1)}>{info.startIdx + i}</Link>
          </Index>
        ))}
      </Indexes>
      {info.endIdx !== pagingInfo.totalPages && (
        <Link to={generateParams(info.startIdx + 10)}>
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
