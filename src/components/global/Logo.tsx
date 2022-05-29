import styled from 'styled-components';

// 클릭시에 홈으로 돌아가는 로고 링크 (재사용 가능)
import LogoImg from 'static/images/logos/logo-transparent.png';

const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-left: 50px;
`;

function Logo(): JSX.Element {
  return (
    <Container>
      <img src={LogoImg} alt="dankook logo" height={50} />
    </Container>
  );
}

export default Logo;
