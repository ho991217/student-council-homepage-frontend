/* global kakao */
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 500px;
`;

function CouncilMap() {
  const container = useRef(null);

  useEffect(() => {
    const councilLocation = new kakao.maps.LatLng(37.32038, 127.1285);

    const map = new kakao.maps.Map(container.current, {
      center: councilLocation,
      level: 3,
    });

    const marker = new kakao.maps.Marker({ position: councilLocation });
    marker.setMap(map);
  }, []);
  return <Container ref={container}>hi</Container>;
}

export default CouncilMap;
