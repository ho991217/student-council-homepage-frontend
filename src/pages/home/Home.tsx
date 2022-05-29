import Carousel from 'components/carousel/Carousel';
import Tiles from 'components/home/Tiles';
import styled from 'styled-components';

const Wrapper = styled.div`
  /* height: 100vh; */
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

function Home() {
  return (
    <Wrapper>
      <Carousel />
      <Tiles />
    </Wrapper>
  );
}

export default Home;