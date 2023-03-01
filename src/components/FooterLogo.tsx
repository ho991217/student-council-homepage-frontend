import styled from 'styled-components';

// 클릭시에 홈으로 돌아가는 로고 링크 (재사용 가능)
import LogoImg from 'static/images/logos/logo-transparent.png';
import { Desktop, Mobile, Tablet } from 'hooks/MediaQueries';

const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.media.desktop} {
    margin-left: 50px;
  }
`;

function FooterLogo(): JSX.Element {
  return (
    <Container>
      <Desktop>
        <img src={LogoImg} alt="dankook logo" height={50} />
      </Desktop>
      <Tablet>
        <img src={LogoImg} alt="dankook logo" height={50} />
      </Tablet>
      <Mobile>
        <img src={LogoImg} alt="dankook logo" height={35} />
      </Mobile>
    </Container>
  );
}

export default FooterLogo;
