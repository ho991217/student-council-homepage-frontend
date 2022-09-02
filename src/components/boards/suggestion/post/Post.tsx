import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Wrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 40px 0;
  ${({ theme }) => theme.media.desktop} {
    padding: 30px 50px;
  }
  ${({ theme }) => theme.media.tablet} {
    padding: 30px 50px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 30px 20px;
  }
  background-color: ${({ theme }) => theme.colors.white};
`;

const Hr = styled.div<{ bold?: boolean }>`
  width: 100%;
  height: ${({ bold }) => (bold ? '2px' : '1px')};
  background-color: ${({ bold, theme }) =>
    bold ? theme.colors.gray600 : theme.colors.gray200};
  margin: 10px 0px;
`;

const Header = styled.div`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.fonts.size.md};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  padding: 0 0 20px 5px;
`;

const Infos = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 5px 15px 5px;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.size.lg};
`;

const State = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  height: 100%;
`;

const Contents = styled.div`
  max-width: 1100px;
  width: 100%;
  padding: 40px 20px;
`;

const Text = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.md};
  margin-bottom: 100px;
`;

const HashTag = styled.div`
  max-width: 150px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 25px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.xs};
  border-radius: 12px;
  ${({ theme }) => theme.media.mobile} {
    max-width: 100px;
  }
`;

const CommentWrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  margin-top: 80px;
  ${({ theme }) => theme.media.mobile} {
    margin-top: 60px;
  }
`;

const CommentLists = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 20px;
  width: 100%;
`;

const Comment = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  padding: 0px 10px 15px 10px;
  width: 100%;
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  height: 14px;
`;

const VSeparator = styled.div`
  height: 100%;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.gray400};
  margin: 0px 10px;
`;

const CommentAuthor = styled.div`
  margin-right: 10px;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const CommentDate = styled.div`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.fonts.size.xs};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
`;

const CommentText = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const CommentForm = styled.form`
  width: 100%;
  ${({ theme }) => theme.media.desktop} {
    height: 100px;
  }
  ${({ theme }) => theme.media.tablet} {
    height: 100px;
  }
  ${({ theme }) => theme.media.mobile} {
    height: 80px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommentInput = styled.textarea`
  all: unset;
  flex-grow: 1;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray040};
  margin-right: 10px;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.gray600};
`;

const CommentSubmit = styled.input.attrs({ type: 'submit' })`
  all: unset;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  width: 160px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  cursor: pointer;
`;

function Post() {
  return (
    <Container>
      <Wrapper>
        <Header>2022.08.05(금)</Header>
        <Infos>
          <Title>건의 게시판 테스트 입니다.</Title>
          <State>[답변 완료]</State>
        </Infos>
        <Hr bold />
        <Contents>
          <Text>건의합니다.</Text>
          <HashTag>#COVID 19</HashTag>
        </Contents>
        <Hr bold />
        <CommentWrapper>
          댓글 2
          <Hr />
          <CommentLists>
            <Comment>
              <CommentInfo>
                <CommentAuthor>총학생회</CommentAuthor>
                <VSeparator />
                <CommentDate>2022.08.06 19:21</CommentDate>
              </CommentInfo>
              <CommentText>테스트 댓글입니다.</CommentText>
            </Comment>
            <Comment>
              <CommentInfo>
                <CommentAuthor>총학생회</CommentAuthor>
                <VSeparator />
                <CommentDate>2022.08.06 19:21</CommentDate>
              </CommentInfo>
              <CommentText>테스트 댓글입니다.</CommentText>
            </Comment>
            <Comment>
              <CommentInfo>
                <CommentAuthor>총학생회</CommentAuthor>
                <VSeparator />
                <CommentDate>2022.08.06 19:21</CommentDate>
              </CommentInfo>
              <CommentText>테스트 댓글입니다.</CommentText>
            </Comment>
          </CommentLists>
          <CommentForm>
            <CommentInput placeholder="댓글을 입력해주세요." />
            <CommentSubmit value="입력" />
          </CommentForm>
        </CommentWrapper>
      </Wrapper>
    </Container>
  );
}

export default Post;