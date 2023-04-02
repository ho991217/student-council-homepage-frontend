import Block from 'components/Block';
import styled from 'styled-components';

import samplePhoto from 'static/images/samples/council-image.png';
import SideNav from 'components/nav/SideNav';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const Img = styled.img`
  width: 100%;
`;

const P = styled.p`
  margin-bottom: 20px;
`;

function Greeting() {
  return (
    <Wrapper>
      <SideNav />
      <Block
        title="인사말"
        hasSideNav
        contents={
          <div>
            <P style={{ lineHeight: 1.4 }}>
              그대의 청춘에 단국을 담다,
              <br />
              <br />
              안녕하십니까 단국대학교 죽전 캠퍼스 학우 여러분, 55대 담다
              총학생회입니다.
              <br />
              <br />
              2023년, 우리 단국은 코로나19로부터 벗어나 제약 없는 대면
              학교생활을 맞이하게됩니다.
              <br />
              저희 담다 총학생회는 학우 여러분의 청춘의 한 페이지에 단국을 담을
              수 있도록, 학우 여러분의 다양한 목소리를 담아 더 나은 학교를
              만들기 위해 노력하겠습니다.
              <br />
              <br />
              감사합니다.
            </P>
            <Img src={samplePhoto} alt="" width={1000} />
          </div>
        }
      />
    </Wrapper>
  );
}

export default Greeting;
