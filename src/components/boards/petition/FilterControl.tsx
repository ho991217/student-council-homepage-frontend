import styled from 'styled-components';
import { Link } from 'react-router-dom';

// TODO: 서버에서 받아올 것 
const tags = [
  '전체',
  '학교생활',
  '교내시설',
  '코로나19',
  '장학금',
  '수업',
  '기타',
];

const Container = styled.div`
  ${({ theme }) => theme.media.mobile} {
    /* padding: 0px 50px; */
    width: 100vw;
    height: 50px;
    overflow: scroll;
    justify-content: flex-start;
  }
  margin: 20px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  scrollbar-width: 0;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  a:first-child {
    margin-left: 30px;
  }
  a:last-child {
    margin-right: 30px;
  }
`;

const Hashtag = styled(Link)<{ cur: boolean }>`
  background-color: ${({ cur, theme }) =>
    cur ? theme.colors.accent : theme.colors.gray050};
  color: ${({ cur, theme }) =>
    cur ? theme.colors.white : theme.colors.gray700};
  ${({ theme }) => theme.media.mobile} {
    min-width: 90px;
    min-height: 40px;
    font-size: ${({ theme }) => theme.fonts.size.md};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
  margin: 0px 5px;
  border-radius: 25px;
  font-size: ${({ theme }) => theme.fonts.size.base};
`;

function FilterControl({ currentTag }: { currentTag: string }): JSX.Element {
  return (
    <Container>
      {tags.map((tag) => (
        <Hashtag
          key={tag}
          cur={tag === currentTag}
          to={`/board-petition/boards?filter=${tag}`}
        >
          #{tag}
        </Hashtag>
      ))}
    </Container>
  );
}

export default FilterControl;
