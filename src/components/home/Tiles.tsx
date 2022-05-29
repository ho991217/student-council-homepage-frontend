import styled from 'styled-components';

const Container = styled.div`
  width: 950px;
  height: 574px;
`;

const BigTile = styled.div``;

const SmallTileContainer = styled.div``;

const SmallTile = styled.div``;

function Tiles(): JSX.Element {
  return (
    <Container>
      <BigTile>Calendar</BigTile>
      <SmallTileContainer>
        <SmallTile>총학소식</SmallTile>
        <SmallTile>실시간 인기청원</SmallTile>
        <SmallTile>금주의 회의록</SmallTile>
      </SmallTileContainer>
    </Container>
  );
}

export default Tiles;
