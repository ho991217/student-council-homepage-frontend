import Block from 'components/Block';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineCheckCircle } from 'react-icons/ai';

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
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 40px;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-bottom: 2rem;
  ${({ theme }) => theme.media.mobile} {
    font-size: 20px;
  }
`;

const SubTitle = styled.h2`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  margin-bottom: 4rem;
  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const GoLoginButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  padding: 0.7rem 0;
  border-radius: 2px;
  margin-bottom: 5rem;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  width: 250px;
  ${({ theme }) => theme.media.mobile} {
    width: 120px;
  }
`;

const GoHomeButton = styled(GoLoginButton)`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray300};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const SuccessIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 130px;
  margin-bottom: 20px;
  ${({ theme }) => theme.media.mobile} {
    font-size: 50px;
  }
`;  

function PasswordSuccess() {
  return (
    <Container>
      <Block
        title=""
        contents={
          <Wrapper>
            <SuccessIcon>
              <AiOutlineCheckCircle />
            </SuccessIcon>
            <Title>비밀번호 변경 성공!</Title>
            <SubTitle>로그인 화면으로 돌아가서 로그인하세요.</SubTitle>
            <ButtonContainer>
              <GoHomeButton to="/">홈페이지로</GoHomeButton>
              <GoLoginButton to="/login">로그인</GoLoginButton>
            </ButtonContainer>
          </Wrapper>
        }
      />
    </Container>
  );
}

export default PasswordSuccess;
