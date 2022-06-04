import styled from 'styled-components';
import BannerImg from 'static/images/global-banner/dankook.png';
import { useLocation } from 'react-router-dom';
import { NavItems } from '../nav/NavItems';

const Container = styled.div`
  background-image: url(${BannerImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  ${({ theme }) => theme.media.desktop} {
    height: 250px;
  }
  ${({ theme }) => theme.media.tablet} {
    height: 200px;
  }
  ${({ theme }) => theme.media.mobile} {
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 100%;
  backdrop-filter: blur(1px);
  background-color: rgba(0, 0, 0, 0.33);
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.title}
  margin-bottom: 12px;
`;

const Detail = styled.h2`
  ${({ theme }) => theme.fonts.detailThin}
`;

function GlobalBanner({ title, detail }: { title: string; detail: string }) {
  const { pathname } = useLocation();
  return (
    <Container>
      <Banner>
        <Title>{title}</Title>
        <Detail>{detail}</Detail>
      </Banner>
    </Container>
  );
}

export default GlobalBanner;
