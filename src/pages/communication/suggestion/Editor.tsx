import styled from "styled-components";
import Editor from "components/boards/suggestion/editor/Editor";


const Container = styled.div`
  margin: 40px 0;
  ${({ theme }) => theme.media.mobile} { 
    margin: 0;
  }
`;

function SuggestionEditor() {
  return (
    <Container>
      <Editor />
    </Container>
  );
}

export default SuggestionEditor;