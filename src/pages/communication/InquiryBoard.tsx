import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 1290px;
  width: 100%;

  ${({ theme }) => theme.media.desktop} {
    padding: 30px 50px;
  }
  ${({ theme }) => theme.media.tablet} {
    padding: 30px 50px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 30px 20px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Line = styled.hr`
  border: 0;
  width: 100%;
  height: 1.5px;
  background: ${(props) => props.theme.colors.gray200};
`;

const Contents = styled.div`
  max-width: 1100px;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 30px;
`;

const BoardHead = styled.div`
  width: 80%;
  height: 70px;
  background: ${({ theme }) => theme.colors.gray100};
  border-top: 2px solid ${({ theme }) => theme.colors.gray200};
  border-collapse: collapse;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  width: 80%;
  height: 70px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  text-align: center;

  div {
    display: flex;
    place-content: center;
    place-items: center;
    border-right: 1px solid ${({ theme }) => theme.colors.gray100};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};

    &:last-child {
      border-right: none;
    }
  }

`;

function InquiryBoard(): JSX.Element {
  // TODO: 총학생회에서 url 제공하면 변경
  const [snsInfo, setSnsInfo] = useState(
    { 
      "총학생회 이메일": "54thplay@naver.com",
      "인스타그램": "@dku_play",
      "페이스북": "@dkuplay54",
      "유튜브": "단국대학교 54대 play 총학생회",
      "카카오톡 플러스 친구": "단국대학교 총학생회"
    }
  );

  return (
    <Container>
      <Wrapper>
        <Line />
        <Contents>
            <p style={{ lineHeight: 1.5 }}>
              학우여러분, 안녕하세요.
              <br />
              단국대학교 제 54대 총학생회 PLAY!입니다.
              <br />
              <br /> 아래 소통창구를 통해 각종 문의 건의사항을 말씀해주시면 신속하고 정확하게 답변드리도록 하겠습니다.
              <br /> * 소통창구의 운영시간은 [주말 제외 평일 10:00 ~ 18:00] 입니다.
              <br />
            </p>
        </Contents>
        <BoardHead>
          <div>총학생회 소통창구 소개</div>
        </BoardHead>
        {Object.entries(snsInfo).map(([key, value]) => (
            <Row key={key}>
              <div>{key}</div>
              <div>{value}</div>
            </Row>
          ))}
      </Wrapper>
    </Container>
  );
}

export default InquiryBoard;
