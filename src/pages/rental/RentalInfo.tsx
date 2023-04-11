import styled from 'styled-components';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import qs from 'qs';
import { useEffect, useState } from 'react';
import PageControl, { PagingProps } from 'components/PageControl';
import { BoardComponents, Container } from './components/InfoBoard.style';
import { H1, H2, Hr } from './RentalLists';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px 0;
  margin: 20px 0 32px 0;
  border-radius: 15px;
`;
export type RentalInfoList = {
  id: number;
  name: string;
  remaining: number;
}[];

function RentalInfo() {
  const [searchParams] = useSearchParams();
  const [productInfo, setProductInfo] = useState<RentalInfoList>([]);
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

  const[itemName, setitemName] = useState({name: ''});

  const getRentalInfoLists = async (id: number) => {
    let { page } = qs.parse(searchParams.toString());
    
    if (!page) page = '1';
    const {
      data: { content, ...options },
    } = await axios({
      method: 'get',
      url: `/rental/item?sort=name&page=${Number(page) - 1}&size=6`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setProductInfo(content);
    setPagingInfo(options);
  };

  useEffect(() => {
    const { id } = qs.parse(searchParams.toString());
    getRentalInfoLists(Number(id));
  }, [page]);

  useEffect(() => {
    // const { id, name } = qs.parse(searchParams.toString());
    const { id } = qs.parse(searchParams.toString());

    setPage(Number(searchParams.get('page')) || 1);
  }, [searchParams]);

  useEffect(() => {
    // const { id, name } = qs.parse(searchParams.toString());
    const { name } = qs.parse(searchParams.toString());


    if (typeof name === 'string') setitemName({ name });
  }, [searchParams]);  

  return (
    <Container>
      <HeaderContainer>
        <Hr />
        <H1>{itemName.name}</H1>
        <H2>대여 물품 현황 페이지 입니다.</H2>
      </HeaderContainer>
      <BoardComponents.BoardContainer>
        <BoardComponents.Index>
          <BoardComponents.Col>행사명</BoardComponents.Col>
          <BoardComponents.Col>사용일시</BoardComponents.Col>
          <BoardComponents.Col>사용자구분</BoardComponents.Col>
          <BoardComponents.Col>사용자</BoardComponents.Col>
        </BoardComponents.Index>

        {productInfo.map((el) => (
          <BoardComponents.Item key={el.id}>
          <BoardComponents.Col>{el.id}</BoardComponents.Col>
          <BoardComponents.Col>{el.name}</BoardComponents.Col>
          <BoardComponents.Col>{el.remaining}</BoardComponents.Col>
          <BoardComponents.Col>{el.remaining}</BoardComponents.Col>
        </BoardComponents.Item>
        ))}
      </BoardComponents.BoardContainer>
      <PageControl currentPage={page} pagingInfo={pagingInfo} />

    </Container>
  );
}

export default RentalInfo;
