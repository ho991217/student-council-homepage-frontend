import styled from 'styled-components';
import Logo from 'components/global/Logo';

const Wrapper = styled.footer`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 40px;
  width: 100%;
  min-height: 185px;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray050};

  ${({ theme }) => theme.media.mobile} {
    bottom: 0;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const Policy = styled.div`
  display: flex;
  flex-direction: row;
`;

const Span = styled.span`
  margin: 3px;
  line-height: 14px;
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fonts.size.xs};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
`;

// 이용약관 등등 디자인 나오면 수정
function Footer(): JSX.Element {
  return (
    <Wrapper>
      <Container>
        <Logo />
        <InnerContainer>
          <Span>
            {
              ' 주소: 경기도 용인시 수지구 죽전동 1491 단국대학교 혜당관 406호 총학생회실 | 전화: 031)8005-2680~1 | 이메일: 54thplay@naver.com | 페이스북: @dkuplay54 | 인스타: @dku_play '
            }
          </Span>
          <Policy>
            <Span>이용약관</Span>
            <Span>개인정보 처리방침</Span>
            <Span>만든사람들</Span>
          </Policy>
        </InnerContainer>
      </Container>
    </Wrapper>
  );
}

export default Footer;
