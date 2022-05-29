import Carousel from 'components/carousel/Carousel';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
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
      {/* <iframe
        width="500px"
        height="500px"
        title="cal"
        src="https://www.dankook.ac.kr/widget/web/kor/-2014-?p_p_id=Event_WAR_eventportlet&p_p_lifecycle=0&p_p_mode=view&_Event_WAR_eventportlet_action=view"
      /> */}
    </Wrapper>
  );
}

export default Home;
