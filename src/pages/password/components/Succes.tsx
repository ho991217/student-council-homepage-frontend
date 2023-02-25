import Block from 'components/Block';
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
  padding: 10rem 0;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.gray800};
  font-size: ${({ theme }) => theme.fonts.size.x4xl};
  font-weight: ${({ theme }) => theme.fonts.weight.black};
  margin-bottom: 2rem;
`;

const SubTitle = styled.h2`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  margin-bottom: 4rem;
`;

const GoHomeButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  padding: 0.7rem 2rem;
  border-radius: 9999px;
  margin-bottom: 5rem;
  text-align: center;
`;

function PasswordSuccess() {
  return (
    <Container>
      <Block
        title=""
        contents={
          <Wrapper>
            <Title>비밀번호 변경 성공!</Title>
            <SubTitle>로그인 화면으로 돌아가서 로그인하세요.</SubTitle>
            <GoHomeButton to="/login">
              로그인 화면으로 <br />
              돌아가기
            </GoHomeButton>
          </Wrapper>
        }
      />
    </Container>
  );
}

export default PasswordSuccess;
