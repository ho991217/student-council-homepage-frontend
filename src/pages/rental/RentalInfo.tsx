import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import qs from 'qs';
import { useEffect, useState } from 'react';
import { BoardComponents, Container } from './components/Board.style';
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

function RentalInfo() {
  const [searchParams] = useSearchParams();
  const [productInfo, setProductInfo] = useState({ id: 0, name: 'no-infos' });

  useEffect(() => {
    const { id, name } = qs.parse(searchParams.toString());

    if (typeof name === 'string') setProductInfo({ id: Number(id), name });
  }, [searchParams]);

  return (
    <Container>
      <HeaderContainer>
        <Hr />
        <H1>{productInfo.name}</H1>
        <H2>대여 물품 현황 페이지 입니다.</H2>
      </HeaderContainer>
      <BoardComponents.BoardContainer>
        <BoardComponents.Index>
          <BoardComponents.Col>신청일자</BoardComponents.Col>
          <BoardComponents.Col>사용일시</BoardComponents.Col>
          <BoardComponents.Col>사용자</BoardComponents.Col>
        </BoardComponents.Index>
      </BoardComponents.BoardContainer>
    </Container>
  );
}

export default RentalInfo;
