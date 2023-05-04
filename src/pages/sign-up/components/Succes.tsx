import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5rem 0;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.gray800};
  font-size: ${({ theme }) => theme.fonts.size.x4xl};
  font-weight: ${({ theme }) => theme.fonts.weight.black};
  margin-bottom: 2rem;
`;

const SubTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  margin-bottom: 8rem;
`;

const Button = styled(Link)`
  font-size: ${({ theme }) => theme.fonts.size.md};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  border-radius: 2px;
  width: 220px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${({ theme }) => theme.media.mobile} {
    width: 100px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const GoHomeButton = styled(Button)`
  border: 2px solid ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.gray200};
  margin-right: 1rem;
`;

const LoginButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

function Success() {
  return (
    <Container>
      <Wrapper>
        <Title>
          <svg
            width="87"
            height="87"
            viewBox="0 0 87 87"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M43.63 84.26C66.0693 84.26 84.26 66.0693 84.26 43.63C84.26 21.1907 66.0693 3 43.63 3C21.1907 3 3 21.1907 3 43.63C3 66.0693 21.1907 84.26 43.63 84.26Z"
              stroke="#1D64AA"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21.7012 38.9903L40.0212 60.1803L67.1312 30.8203"
              stroke="#1D64AA"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Title>
        <SubTitle>가입이 완료되었습니다 :)</SubTitle>
        <ButtonContainer>
          <GoHomeButton to="/">홈 화면으로</GoHomeButton>
          <LoginButton to="/login">로그인</LoginButton>
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
}

export default Success;
