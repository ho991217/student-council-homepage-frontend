import Banner from 'pages/event/components/Banner';
import VoteContainer from 'pages/event/components/VoteContainer';
import styled from 'styled-components';

const Frame = styled.div`
  background: #f2f3f5;
`;

function Event() {
  return (
    <Frame>
      <Banner />
      <VoteContainer />
    </Frame>
  );
}

export default Event;
