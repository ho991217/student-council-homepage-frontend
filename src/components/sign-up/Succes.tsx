import Block from 'components/global/Block';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Success() {
  return (
    <Container>
      <Block title="회원가입" contents={<div>성공</div>} />
    </Container>
  );
}

export default Success;
