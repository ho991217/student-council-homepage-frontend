import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TileProps } from './TileProps';
import Schedule from './components/Schedule'
import News from './components/News';
import Petition from './components/Petition';
import Proceeding from './components/Proceeding';


const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.smallTitle}
  color: ${({ theme }) => theme.colors.accent};
`;

const MoreLink = styled(Link)`
  ${({ theme }) => theme.fonts.smallSubTitle}
  color: ${({ theme }) => theme.colors.gray600};
`;

function Tile({ title, linkTitle, to, detail }: TileProps): JSX.Element {
  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        <MoreLink to={to}>{linkTitle}</MoreLink>
      </TitleContainer>
      { detail==="schedule" && <Schedule /> }
      { detail==="news" && <News /> }
      { detail==="petition" && <Petition /> }
      { detail==="proceeding" && <Proceeding /> }
    </Container>
  );
}

export default Tile;