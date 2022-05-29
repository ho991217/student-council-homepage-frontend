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

const TitleContainer = styled.div``;

function Tile({ title, linkTitle, to }: TileProps): JSX.Element {
  return (
    <Container>
      <TitleContainer>{title}</TitleContainer>
    </Container>
  );
}

export default Tile;
