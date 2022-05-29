import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TileProps } from './TileProps';

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
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
`;

const MoreLink = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray600};
`;

function Tile({ title, linkTitle, to }: TileProps): JSX.Element {
  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        <MoreLink to={to}>{linkTitle}</MoreLink>
      </TitleContainer>
    </Container>
  );
}

export default Tile;
