import Block from 'components/global/Block';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 20px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.size.x8xl};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 25px;
`;

const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.fonts.size.xl};
  color: ${({ theme }) => theme.colors.gray800};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  line-height: 30px;
  text-align: center;
  margin-bottom: 30px;
`;

const BacktoHome = styled(Link).attrs({ to: '/' })`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 7.5px 15px;
  border-radius: 25px;
  color: ${({ theme }) => theme.colors.white};
`;

function NotFound(): JSX.Element {
  return (
    <Container>
      <Block
        title=""
        contents={
          <InnerContainer>
            <Title>404 Not Found</Title>
            <Subtitle>
              페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다.
              <br />
              입력하신주소가 정확한지 다시 한 번 확인해주세요.
            </Subtitle>
            <BacktoHome>홈으로 돌아가기</BacktoHome>
          </InnerContainer>
        }
      />
    </Container>
  );
}

export default NotFound;
