import styled from "styled-components";

import logo from 'static/images/logos/student-council.png';

const Container = styled.div`
  max-width: 1160px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 60px 80px;
  margin: 40px auto;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: #6F49B7;
  margin: 0 0 40px 25px;
`;

const SubTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0 0 20px 25px;
`;

const Line = styled.div`
  width: 100%;
  height: 5px;
  border: 1.5px solid ${({ theme }) => theme.colors.accent};
  border-radius: 3px;
  margin-bottom: 70px;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 25px 0px 10px;
`;

const Img = styled.img``;

const InfoWrapper = styled.div``;

const Dl = styled.dl`
  margin: 10px 0 30px 0;
  font-size: 1.3rem;
`;

const Dt = styled.dt`
  font-weight: 700;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  padding-bottom: 12px;
`;

const Dd = styled.dd`
  padding: 25px 0 0 0;
`;

function Pledge() {
  return (
    <Container>
      <Title>단국대학교 제54대 PLAY! 총학생회</Title>
      <SubTitle>총학생회 기조</SubTitle>
      <Line /> 
      <DetailContainer>
        <Img src={logo} alt="student-council-logo" width={490} height={250} />
        <InfoWrapper>
          <Dl>
            <Dt>자치</Dt>
            <Dd>- 우리를 위해 적극적으로 소통하는 총학생회</Dd>
            <Dd>- 우리의 권리를 지키고 나아가는 총학생회</Dd>
          </Dl>
          <Dl>
            <Dt>인권</Dt>
            <Dd>- 인권의 사각지대를 직접 비춰 들여다보는 총학생회</Dd>
            <Dd>- 믿고 도움을 요청할 수 있는 총학생회</Dd>
          </Dl>
          <Dl>
            <Dt>낭만</Dt>
            <Dd>- 우리의 기대를 현실로 보여주는 총학생회</Dd>
          </Dl>
        </InfoWrapper>
      </DetailContainer>
    </Container>
  )
}

export default Pledge;