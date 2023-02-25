import styled from 'styled-components';

interface TagSelectMProps {
  label: string;
  tagList: string[];
  selectedTag: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TagSelectM({
  label,
  tagList,
  selectedTag,
  onChange,
}: TagSelectMProps) {
  return (
    <Container>
      {label}
      <Tags>
        {tagList?.map((tag: string, idx: number) => {
          return (
            <TagLabel
              key={tagList.indexOf(tag)}
              check={selectedTag === tagList[idx]}
            >
              {tag}
              <Tag
                type="radio"
                name="tagList"
                value={tag}
                onChange={onChange}
              />
            </TagLabel>
          );
        })}
      </Tags>
    </Container>
  );
}

const Container = styled.div`
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.size.md};
  user-select: none;
  margin-bottom: 30px;
`;

const Tags = styled.div`
  margin-top: 15px;
  ${({ theme }) => theme.media.mobile} {
    margin-top: 5px;
    max-width: 100vw;
    height: 30px;
    overflow: auto;
    white-space: nowrap;
  }
  ${({ theme }) => theme.media.tablet} {
    max-width: 100vw;
    height: 30px;
    overflow: auto;
    white-space: nowrap;
  }
  scrollbar-width: 0;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const TagLabel = styled.label<{ check: boolean }>`
  margin-right: 25px;
  padding: 5px 40px;
  font-size: ${({ theme }) => theme.fonts.size.xs};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  border-radius: 12px;
  cursor: pointer;
  ${({ theme }) => theme.media.mobile} {
    padding: 5px 15px;
    margin-right: 12px;
  }
  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
  background-color: ${({ check, theme }) =>
    check ? theme.colors.primary : theme.colors.gray100};
  color: ${({ check, theme }) => check && theme.colors.white};
`;

const Tag = styled.input`
  appearance: none;
`;

export default TagSelectM;
