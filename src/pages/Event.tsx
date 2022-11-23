import Banner from 'components/event/Banner';
import VoteContainer from 'components/event/VoteContainer';
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
