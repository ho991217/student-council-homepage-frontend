import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 17px;
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
function Petition(): JSX.Element {
  return (
    <Wrapper>
      <P>
        <Span>[D-3] </Span>학교 오르막에 에스컬레이터를 설치해주세요.
      </P>
      <P>
        <Span>[D-12] </Span>코로나를 없애주세요.
      </P>
    </Wrapper>
  );
}

export default Petition;
