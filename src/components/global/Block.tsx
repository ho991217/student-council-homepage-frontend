import styled from 'styled-components';

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  padding: 70px 120px 60px 120px;
  background-color: ${({ theme }) => theme.colors.white};
  margin-top: 40px;
  margin-bottom: 100px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
`;

const Contents = styled.div`
  width: 100%;
`;

interface BlockProps {
  title: string;
  contents: JSX.Element;
}

function Block({ title, contents }: BlockProps): JSX.Element {
  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <Contents>{contents}</Contents>
    </Container>
  );
}

export default Block;
