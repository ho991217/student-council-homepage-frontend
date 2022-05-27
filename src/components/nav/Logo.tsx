import { Link } from 'react-router-dom';
import LogoImg from 'static/images/logos/logo-transparent.png';
import styled from 'styled-components';

const Container = styled(Link).attrs({ to: '/home' })`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-left: 25px;
`;

function Logo(): JSX.Element {
  return (
    <Container>
      <img src={LogoImg} alt="dankook logo" height={50} />
    </Container>
  );
}

export default Logo;
