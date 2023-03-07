import styled from 'styled-components';
import BannerImg from 'static/images/global-banner/globalBannerBackground.png';

const Container = styled.div`
  background-image: url(${BannerImg});
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  ${({ theme }) => theme.media.desktop} {
    background-size: 100% 250px;
    height: 250px;
  }
  ${({ theme }) => theme.media.tablet} {
    background-size: 100% 200px;
    height: 200px;
  }
  ${({ theme }) => theme.media.mobile} {
    background-size: 100% 150px;
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

const Detail = styled.h2`
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
`;

function GlobalBanner({
  title,
  detail,
}: {
  title: string;
  detail: string;
}): JSX.Element {
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
