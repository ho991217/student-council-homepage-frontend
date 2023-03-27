import CouncilMap from 'pages/council-info/location/components/CouncilMap';
import Block from 'components/Block';
import styled from 'styled-components';
import SideNav from 'components/nav/SideNav';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const Container = styled.div``;

const InfoWrapper = styled.div``;

const Ul = styled.ul`
  width: 100%;
  margin: 50px 0px;
`;

const Li = styled.li`
  display: flex;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  width: 100px;
`;

const Detail = styled.span`
  font-size: ${({ theme }) => theme.fonts.size.md};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
`;

interface infoProps {
  title: string;
  content: string;
  key: number;
}

function Location() {
  const info: infoProps[] = [
    { title: '위치', content: '혜당관 406호 총학생회실', key: 1 },
    {
      title: '주소',
      content: '(16890) 경기도 용인시 수지구 죽전동 1491',
      key: 2,
    },
    { title: '전화', content: '031)8005-2680~1', key: 3 },
    { title: '이메일', content: 'dkudamda@gmail.com', key: 4 },
    { title: '인스타그램', content: '@dku_damda', key: 5 },
  ];
  return (
    <Wrapper>
      <SideNav />
      <Block
        title="주소 / 연락처"
        hasSideNav
        contents={
          <Container>
            <CouncilMap />
            <InfoWrapper>
              <Ul>
                {info.map((item: infoProps) => (
                  <Li key={item.key}>
                    <Title>{item.title}</Title>
                    <Detail>{item.content}</Detail>
                  </Li>
                ))}
              </Ul>
            </InfoWrapper>
          </Container>
        }
      />
    </Wrapper>
  );
}

export default Location;
