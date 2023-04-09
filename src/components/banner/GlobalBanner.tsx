import styled from 'styled-components';
import BannerImg from 'static/images/global-banner/globalBannerBackground.png';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Container = styled.div`
  display: flex;
  background-image: url(${BannerImg});
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  ${({ theme }) => theme.media.desktop} {
    background-size: 100% 250px
    height: 250px;
  }
  ${({ theme }) => theme.media.tablet} {
    background-size: 100% 200px
    height: 200px;
  }
  ${({ theme }) => theme.media.mobile} {
      background-size: 100% 150px
    height: 150px;
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.size.x3xl};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-bottom: 12px;
`;

function GlobalBanner({ title }: { title: string }) {
  const location = useLocation().pathname;
  const [bannerVisibility, setBannerVisibility] = useState(false);
  useEffect(() => {
    if (location.indexOf('boards') > 0) {
      setBannerVisibility(true);
    }
  }, []);
  return (
    <div>
      {bannerVisibility && (
        <>
          <Container>
            <Banner>
              <Title>{title}</Title>
            </Banner>
          </Container>
          <Outlet />
        </>
      )}
    </div>
  );
}

export default GlobalBanner;
