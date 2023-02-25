import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { TileProps } from './TileProps';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  overflow: hidden;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const MoreLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
`;

function Tile({ title, linkTitle, to, children }: TileProps): JSX.Element {
  return (
    <Container>
      {title && linkTitle && (
        <TitleContainer>
          <Title>{title}</Title>
          <MoreLink to={to}>{linkTitle}</MoreLink>
        </TitleContainer>
      )}
      {children}
    </Container>
  );
}

export default Tile;
