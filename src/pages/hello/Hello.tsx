import Block from 'components/council-info/Block';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Hello(): JSX.Element {
  return (
    <Wrapper>
      <Block
        title="인사말"
        contents={
          <p style={{ lineHeight: 1.4 }}>
            안녕하십니까
            <br />
            단국대학교 죽전캠퍼스 학우 여러분, 54대 PLAY! 총학생회입니다:)
            <br />
            <br /> 학우 여러분에게 2022년은 어떤 해가 되고있나요? 저희 PLAY!
            총학생회는 학우 여러분들의 2022년을 보다 알차고 낭만 가득하게
            채워드리기 위해 다양한 정책을 준비하여 시행 중에 있습니다.
            <br /> 학우 여러분들이 2022년의 단국을 행복으로 기억할 수 있도록
            PLAY! 총학생회가 항상 학우 여러분과 소통하고 발전해 나아가겠습니다.
            <br />
            <br />
            감사합니다.
          </p>
        }
      />
    </Wrapper>
  );
}

export default Hello;
