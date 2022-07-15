import React, { useState } from "react";
import styled, {css} from "styled-components";
import { theme } from "styles/Theme";


const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 70px 100px;
  ${({ theme }) => theme.media.tablet} { padding: 50px 50px; }
  ${({ theme }) => theme.media.mobile} { padding: 40px 20px 120px 20px; }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-bottom: 50px;
  font-size: ${({ theme }) => theme.fonts.size.lg};
  user-select: none;
`;

const Input = css`
  background-color: ${({ theme }) => theme.colors.gray040};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray200};
  }
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  font-size: ${({ theme }) => theme.fonts.size.md};
  margin-top: 15px;
  padding-left: 15px;
  ${({ theme }) => theme.media.mobile} { max-width: 100%; }
`;

const WriteInput = styled.input`
  ${Input}
  width: 360px;
  height: 40px;
`;

const TitleInput = styled.input`
  ${Input}
  width: 100%;
  height: 40px;
`;

const Textarea = styled.textarea`
  ${Input}
  width: 100%;
  height: 450px;
  padding-top: 10px;
  resize: none;
`;

const ButtonDiv = styled.div`
  margin: auto;
  ${({ theme }) => theme.media.mobile} { width: 100%; }
`;

const Button = styled.button`
  width: 260px;
  height: 50px;
  font-size: ${({ theme }) => theme.fonts.size.base};
  background-color: ${({ theme }) => theme.colors.darkblue};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  cursor: pointer;
  ${({ theme }) => theme.media.mobile} { width: 100%; }
`;


// TODO: 사용자 이름이 작성자 이름이 되도록
function Contents() {
  // const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // const onWriterHandler = (event: React.FormEvent<HTMLInputElement>) => {
  //   const {
  //     currentTarget: { value },
  //   } = event;
  //   setWriter(value);
  // }

  const onTitleHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTitle(value);
  }

  const onContentHandler = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setContent(value);
  }

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: 백으로 데이터 전송
  }

  return (
    <Wrapper>
      <Form onSubmit={onSubmitHandler}>
        <Label htmlFor="writer">
          작성자
          <WriteInput 
            id="writer" 
            type="text" 
            // value={writer}
            placeholder="작성자를 입력해주세요." 
            // onChange={onWriterHandler}
          />
        </Label>
        <Label htmlFor="title">
          청원 제목
          <TitleInput 
            id="title" 
            type="text" 
            value={title}
            placeholder="청원 제목을 입력해주세요." 
            onChange={onTitleHandler}
          />  
        </Label>
        <Label htmlFor="content">
          청원 내용
          <Textarea
            id="content" 
            value={content}
            onChange={onContentHandler}
          />
        </Label>
        <ButtonDiv>
          <Button type="submit">작성완료</Button>
        </ButtonDiv>
      </Form>
    </Wrapper>
  );
}

export default Contents;