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

// ToDo: detail 내용 동적으로 바꾸기
function News(): JSX.Element {
  return (
    <Wrapper>
      <P>이벤트</P>
      <P>축제 이벤트</P>
    </Wrapper>
  );
}

export default News;