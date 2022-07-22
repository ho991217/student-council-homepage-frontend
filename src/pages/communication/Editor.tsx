import styled from "styled-components";
import Content from "components/boards/editor/Contents";


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
    <Container>
      <Content />
    </Container>
  );
}

export default Editor;