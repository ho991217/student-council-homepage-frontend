import styled from 'styled-components';
import {
  PetitonType,
  RecentConferencesType,
  RecentNewsType,
} from 'pages/home/Home';
import Tile from './Tile';
import Schedule from './components/Schedule';
import News from './components/News';
import Petition from './components/Petition';
import Proceeding from './components/Proceeding';

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
    width: 100%;
  }
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.media.mobile} {
    margin-bottom: 20px;
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
    width: 100%;
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
  ${({ theme }) => theme.media.desktop} {
  }
  ${({ theme }) => theme.media.tablet} {
    height: 100%;
  }
  ${({ theme }) => theme.media.mobile} {
    margin-bottom: 20px;
  }
`;

export interface TilesProps {
  popularPetitions: PetitonType[];
  recentConferences: RecentConferencesType[];
  recentNews: RecentNewsType[];
}

function Tiles({
  popularPetitions,
  recentConferences,
  recentNews,
}: TilesProps) {
  return (
    <Container>
      <BigTile>
        <Tile to="/">
          <Schedule />
        </Tile>
      </BigTile>
      <SmallTileContainer>
        <SmallTile>
          <Tile title="총학소식" linkTitle="더보기" to="/council-news">
            <News news={recentNews} />
          </Tile>
        </SmallTile>
        <SmallTile>
          <Tile
            title="실시간 인기청원"
            linkTitle="더보기"
            to="/board-petition/boards?page=1"
          >
            <Petition petition={popularPetitions} />
          </Tile>
        </SmallTile>
        <SmallTile>
          <Tile title="금주의 회의록" linkTitle="더보기" to="/conference">
            <Proceeding conference={recentConferences} />
          </Tile>
        </SmallTile>
      </SmallTileContainer>
    </Container>
  );
}

export default Tiles;
