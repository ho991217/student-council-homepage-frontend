import Block from 'components/global/Block';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Makers(): JSX.Element {
  return (
    <Wrapper>
      <Block title="만든 사람들" contents={<div>hi</div>} />
    </Wrapper>
  );
}

export default Makers;
