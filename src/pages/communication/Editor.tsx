import styled from "styled-components";
import GlobalBanner from "components/global/banner/GlobalBanner";
import Contents from "components/boards/editor/Contents";


const Container = styled.div`
  width: 1150px;
  margin: 60px auto;
  ${({ theme }) => theme.media.tablet} { max-width: 750px;}
  ${({ theme }) => theme.media.mobile} { 
    max-width: 375px;
    margin: 0 auto;
  }
`;

function Editor() {
  return (
    <>
      <GlobalBanner title="청원게시판" detail="설명, 들어갈 내용과 사진 주시면 감사하겠습니다!"/>
      <Container>
        <Contents />
      </Container>
    </>
  );
}

export default Editor;