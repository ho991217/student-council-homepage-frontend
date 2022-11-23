import React from 'react';
import styled from 'styled-components';
import bannerImage from './images/banner.png';

const Container = styled.div`
  background-color: #f2f3f5;

  ${({ theme }) => theme.media.mobile} {
    display: none;
  }

  img {
    width: 100%;
  }
`;

function Banner() {
  return (
    <Container>
      <img src={bannerImage} alt="후즈 더 베스트 드레서 이벤트 배너" />
    </Container>
  );
}

export default Banner;
