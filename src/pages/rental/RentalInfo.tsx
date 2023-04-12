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
  lender: string;
  rentalStart: string;
  rentalEnd: string;
  title: string;
  userClass: string;

}[];

function ConvertUserClass(type : string) {
  let ConvertedClass;
  if (type === "INDIVIDUAL") {
    ConvertedClass = "개인";
  } else if (type === "DEPARTMENT_STUDENT_COUNCIL") {
    ConvertedClass = "단과대학생회";
  } else if (type === "MAJOR_STUDENT_COUNCIL"){
    ConvertedClass = "과(학부) 학생회";
  } else if (type === "CLUB") {
    ConvertedClass = "동아리";
  } else {
    ConvertedClass = "기타"
  }

  return <BoardComponents.Col>{ConvertedClass}</BoardComponents.Col>;
}

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
    const { name } = qs.parse(searchParams.toString());
    
    if (!page) page = '1';
    const {
      data: { content, ...options },
    } = await axios({
      method: 'get',
      url: `/rental/${Number(id)}?&page=${Number(page) - 1}&size=6`,
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
    setPage(Number(searchParams.get('page')) || 1);
  }, [searchParams]);

  useEffect(() => {
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
          <BoardComponents.Col>{el.title}</BoardComponents.Col>
          <BoardComponents.Col>{el.rentalStart.substring(0,4)}년 {el.rentalStart.substring(5,7)}월{' '} {el.rentalStart.substring(8,10)}일
           {" ~ "} 
           {el.rentalEnd.substring(0,4)}년 {el.rentalStart.substring(5,7)}월{' '} {el.rentalStart.substring(8,10)}일</BoardComponents.Col>
           {ConvertUserClass(el.userClass)}
          {/* <BoardComponents.Col>{el.userClass}</BoardComponents.Col> */}
          <BoardComponents.Col>{el.lender}</BoardComponents.Col>
        </BoardComponents.Item>
        ))}
      </BoardComponents.BoardContainer>
      <PageControl currentPage={page} pagingInfo={pagingInfo} />

    </Container>
  );
}

export default RentalInfo;
