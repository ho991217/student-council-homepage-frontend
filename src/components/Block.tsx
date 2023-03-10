import styled from 'styled-components';

const Container = styled.div<{isSideNav?: boolean}>`
  max-width: 1440px;
  ${({ theme }) => theme.media.desktop} {
    width: ${props => props.isSideNav?"calc(100% - 310px)":"100%"};
    padding: 70px 120px 60px 120px;
    margin-top: 40px;
    margin-bottom: 100px;
  }
  ${({ theme }) => theme.media.tablet} {
    padding: 70px 120px 60px 120px;
    margin-top: 30px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 20px 20px 60px 20px;
  }
  background-color: ${({ theme }) => theme.colors.white};
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.size.x3xl};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
`;

const Contents = styled.div`
  width: 100%;
`;

interface BlockProps {
  title: string;
  contents: JSX.Element;
  isSideNav?: boolean;
}
Block.defaultProps = {
  isSideNav: false,
}
function Block({ title, contents, isSideNav }: BlockProps): JSX.Element {
  return (
    <Container isSideNav={isSideNav}>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <Contents>{contents}</Contents>
    </Container>
  );
}

export default Block;
