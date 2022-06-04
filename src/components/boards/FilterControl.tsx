import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  margin: 20px 0px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Hashtag = styled(Link)<{ cur: boolean }>`
  background-color: ${({ cur, theme }) =>
    cur ? theme.colors.accent : theme.colors.gray050};
  color: ${({ cur, theme }) =>
    cur ? theme.colors.white : theme.colors.gray700};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
  margin: 0px 5px;
  border-radius: 25px;
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
