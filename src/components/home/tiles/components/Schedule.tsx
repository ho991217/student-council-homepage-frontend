import styled from 'styled-components';
import Calendar from './Calendar';

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 17px;
`;

const DetailWrapper = styled.div`
  margin-top: 20px;
`;

const P = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  color: ${({ theme }) => theme.colors.gray900};
  display: flex;
  ${({ theme }) => theme.media.desktop} {
    font-size: ${({ theme }) => theme.fonts.size.base};
    margin-bottom: 8px;
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fonts.size.base};
    margin-bottom: 8px;
  }

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    font-size: ${({ theme }) => theme.fonts.size.lg};
    margin-bottom: 20px;
  }
`;

const Span = styled.span`
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.gray900};
  margin-right: 10px;
  ${({ theme }) => theme.media.desktop} {
    font-size: ${({ theme }) => theme.fonts.size.base};
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fonts.size.base};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.lg};
    margin-bottom: 5px;
  }
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
