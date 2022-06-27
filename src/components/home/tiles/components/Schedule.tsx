import styled from 'styled-components';
import Calendar from './Calendar';

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 17px;
`;

const DetailWrapper = styled.div`
  margin-top: 27px;
`;

const P = styled.p`
  ${({ theme }) => theme.fonts.detailThin}
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 7px;
`;

const Span = styled.span`
  ${({ theme }) => theme.fonts.detailBold}
  color: ${({ theme }) => theme.colors.gray900};
`;

// TODO: detail 내용 동적으로 바꾸기
function Schedule(): JSX.Element {
  return (
    <Container>
      <Calendar />
      <DetailWrapper>
        <P>
          <Span>[2022.05.10 ~2022.05.12] </Span>단국축제(죽전), 대동제(천안)
        </P>
        <P>
          <Span>[2022.05.10 ~2022.05.12] </Span>단국축제(죽전), 대동제(천안)
        </P>
        <P>
          <Span>[2022.05.10 ~2022.05.12] </Span>단국축제(죽전), 대동제(천안)
        </P>
        <P>
          <Span>[2022.05.10 ~2022.05.12] </Span>단국축제(죽전), 대동제(천안)
        </P>
        <P>
          <Span>[2022.05.10 ~2022.05.12] </Span>단국축제(죽전), 대동제(천안)
        </P>
        <P>
          <Span>[2022.05.10 ~2022.05.12] </Span>단국축제(죽전), 대동제(천안)
        </P>
        <P>
          <Span>[2022.05.10 ~2022.05.12] </Span>단국축제(죽전), 대동제(천안)
        </P>
        <P>
          <Span>[2022.05.10 ~2022.05.12] </Span>단국축제(죽전), 대동제(천안)
        </P>
      </DetailWrapper>
    </Container>
  );
}

export default Schedule;
