import styled from 'styled-components';

const Container = styled.div`
  width: 950px;
  height: 574px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
`;

const BigTile = styled.div`
  height: 100%;
  width: 465px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const SmallTileContainer = styled.div`
  height: 100%;
  width: 465px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SmallTile = styled.div`
  width: 100%;
  height: 178px;
  background-color: ${({ theme }) => theme.colors.white};
`;

function Tiles(): JSX.Element {
  return (
    <Container>
      <BigTile>학사일정</BigTile>
      <SmallTileContainer>
        <SmallTile>총학소식</SmallTile>
        <SmallTile>실시간 인기청원</SmallTile>
        <SmallTile>금주의 회의록</SmallTile>
      </SmallTileContainer>
    </Container>
  );
}

export default Tiles;
