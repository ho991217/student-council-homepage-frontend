import styled from 'styled-components';
import Tile from './Tile';

const Container = styled.div`
  ${({ theme }) => theme.media.desktop} {
    max-width: 950px;
    width: 100%;
  }
  ${({ theme }) => theme.media.tablet} {
    max-width: 900px;
    width: 100%;
  }
  ${({ theme }) => theme.media.mobile} {
    max-width: 500px;
    width: 100%;
  }
  overflow-x: hidden;
  height: 574px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 80px;
  ${({ theme }) => theme.media.mobile} {
    height: 100%;
    flex-direction: column;
    margin-bottom: 10px;
  }
`;

const BigTile = styled.div`
  height: 100%;
  ${({ theme }) => theme.media.desktop} {
    width: 465px;
  }
  ${({ theme }) => theme.media.tablet} {
    width: 435px;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 350px;
  }
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.media.mobile} {
    margin-bottom: 10px;
  }
`;

const SmallTileContainer = styled.div`
  height: 100%;
  ${({ theme }) => theme.media.desktop} {
    width: 465px;
  }
  ${({ theme }) => theme.media.tablet} {
    width: 435px;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 350px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SmallTile = styled.div`
  width: 100%;
  height: 178px;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.media.mobile} {
    margin-bottom: 10px;
  }
`;

function Tiles(): JSX.Element {
  return (
    <Container>
      <BigTile>
        <Tile
          title="학사일정"
          linkTitle="학사일정바로가기"
          to="/"
          detail="schedule"
        />
      </BigTile>
      <SmallTileContainer>
        <SmallTile>
          <Tile title="총학소식" linkTitle="더보기" to="/" detail="news" />
        </SmallTile>
        <SmallTile>
          <Tile
            title="실시간 인기청원"
            linkTitle="더보기"
            to="/board-petition"
            detail="petition"
          />
        </SmallTile>
        <SmallTile>
          <Tile
            title="금주의 회의록"
            linkTitle="더보기"
            to="/board-inquiry"
            detail="proceeding"
          />
        </SmallTile>
      </SmallTileContainer>
    </Container>
  );
}

export default Tiles;
