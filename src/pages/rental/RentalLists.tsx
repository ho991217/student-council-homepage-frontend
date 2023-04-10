import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'qs';
import PageControl, { PagingProps } from 'components/PageControl';
import { BoardComponents, Container } from './components/Board.style';

const Header = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
  background-color: #f9f9f9;
  padding: 20px 50px;
  margin: 20px 0 32px 0;
  border-radius: 15px;
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 15px;
`;

export const Hr = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 4px;
  width: 45px;
  margin-bottom: 9px;
  margin-bottom: 9px;
`;

export const H1 = styled.h1`
  margin-bottom: 9px;
  font-size: ${({ theme }) => theme.fonts.size.xxl};
  font-weight: 700;
`;

export const H2 = styled.h2`
  font-size: ${({ theme }) => theme.fonts.size.md};
  font-weight: 500;
`;

const SearchContainer = styled.div`
  height: 100%;
  flex-grow: 1;
  flex-wrap: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const SearchSelect = styled.select``;

const SearchInput = styled.input``;

const SearchButton = styled.button``;

const NewRentalButton = styled(Link)`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em 1.2em;
  position: absolute;
  bottom: -3em;
  right: 1em;
`;

export type IRentalList = {
  id: number;
  name: string;
  remaining: number;
}[];

function RentalLists() {
  const [rentalLists, setRentalLists] = useState<IRentalList>([]);
  const [page, setPage] = useState<number>(1);
  const [pagingInfo, setPagingInfo] = useState<PagingProps>({
    hasNext: false,
    totalPages: 0,
    totalElements: 0,
    page: 0,
    size: 0,
    first: true,
    last: false,
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleItemClick = (id: number, name: string) => {
    navigate(`/rental/info?id=${id}&name=${name}`);
  };

  const getRentalLists = async () => {
    const { page } = qs.parse(searchParams.toString());

    const {
      data: { content, ...options },
    } = await axios({
      method: 'get',
      url: `/rental/item?page=${page}&size=6`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setRentalLists(content);
    setPagingInfo(options);
  };

  useEffect(() => {
    getRentalLists();
  }, [page]);

  useEffect(() => {
    const { page } = qs.parse(searchParams.toString());

    setPage(Number(page));
  }, [searchParams]);

  return (
    <Container>
      <Header>
        <HeadingContainer>
          <Hr />
          <H1>대여물품</H1>
          <H2>안내관련 내용가입</H2>
        </HeadingContainer>
        <SearchContainer>
          <SearchContainer>
            <SearchSelect defaultValue="all">
              <option value="all">전체</option>
            </SearchSelect>
            <SearchInput placeholder="검색어를 입력해주세요." />
            <SearchButton>검색</SearchButton>
          </SearchContainer>
        </SearchContainer>
      </Header>
      <BoardComponents.BoardContainer>
        <BoardComponents.Index>
          <BoardComponents.Col>번호</BoardComponents.Col>
          <BoardComponents.Col>대여물품</BoardComponents.Col>
          <BoardComponents.Col>잔여 개수</BoardComponents.Col>
        </BoardComponents.Index>
        {rentalLists.map((el) => (
          <BoardComponents.Item
            key={el.id}
            onClick={() => handleItemClick(el.id, el.name)}
          >
            <BoardComponents.Col>{el.id}</BoardComponents.Col>
            <BoardComponents.Col>{el.name}</BoardComponents.Col>
            <BoardComponents.Col>{el.remaining}</BoardComponents.Col>
          </BoardComponents.Item>
        ))}
        <NewRentalButton to="/rental/new">대여 신청</NewRentalButton>
      </BoardComponents.BoardContainer>
      <PageControl currentPage={page} pagingInfo={pagingInfo} />
    </Container>
  );
}

export default RentalLists;
