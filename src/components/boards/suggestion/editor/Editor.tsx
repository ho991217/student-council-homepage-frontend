import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const TAG_LIST = [
  '#학교생활',
  '#교내시설',
  '#코로나19',
  '#장학금',
  '#수업',
  '#기타',
];

const Container = styled.div`
  width: 100%;
  display: flex;
  align-divs: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 1150px;
  width: 100%;
  padding: 70px 100px;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.media.tablet} {
    padding: 50px 50px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 40px 20px 60px 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.size.md};
  user-select: none;
`;

const Content = css`
  margin-top: 15px;
  padding-left: 12px;
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fonts.size.base};
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

const TitleInput = styled.input.attrs({ type: 'text', required: true })`
  ${Content}
  width: 100%;
  height: 40px;
`;

const Textarea = styled.textarea.attrs({ required: true })`
  ${Content}
  width: 100%;
  height: 600px;
  padding-top: 10px;
  resize: none;
  ${({ theme }) => theme.media.mobile} {
    height: 400px;
  }
`;

const TagList = styled.div`
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.size.md};
  user-select: none;
  margin-bottom: 60px;
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

const Tag = styled.input.attrs({ required: true })`
  appearance: none;
`;

const ButtonDiv = styled.div`
  margin: auto;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

const Button = styled.button`
  width: 260px;
  height: 50px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fonts.size.base};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

function Editor(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [tag, setTag] = useState<string>('');

  return (
    <Container>
      <Wrapper>
        <Form>
          <Label>
            제목
            <TitleInput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
              placeholder="제목을 입력해주세요."
            />
          </Label>
          <Label>
            내용
            <Textarea
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              placeholder="건의 내용을 입력해주세요."
            />
          </Label>
          <TagList>
            태그
            <Tags>
              {TAG_LIST.map((item, idx) => {
                return (
                  <TagLabel key={item} check={tag === TAG_LIST[idx]}>
                    {item}
                    <Tag
                      type="radio"
                      name="hashtag"
                      value={item}
                      onChange={(e) => {
                        setTag(e.currentTarget.value);
                      }}
                      required
                    />
                  </TagLabel>
                );
              })}
            </Tags>
          </TagList>
          <ButtonDiv>
            <Button type="submit">작성완료</Button>
          </ButtonDiv>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Editor;
