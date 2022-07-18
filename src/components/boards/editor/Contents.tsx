import React, { useState } from "react";
import styled, {css} from "styled-components";
import { theme } from "styles/Theme";
import ReactModal from "react-modal";
import Modal from "./Modal";


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
  }, 
};

const Wrapper = styled.div`
  width: 100%;
  padding: 70px 100px;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.media.tablet} { padding: 50px 50px; }
  ${({ theme }) => theme.media.mobile} { padding: 40px 20px 120px 20px; overflow: visible;}
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
  font-size: ${({ theme }) => theme.fonts.size.lg};
  user-select: none;
`;

const Select = styled.select`
  font-size: ${({ theme }) => theme.fonts.size.md};
  color: black;
  width: 280px;
  height: 40px;
  margin-top: 15px;
  padding-left: 10px;
  -webkit-appearance: none;
  -moz-appearance: none; 
  appearance: none;
  ${({ theme }) => theme.media.mobile} { 
    width: 180px; 
  }
`;

const Content = css`
  margin-top: 15px;
  padding-left: 12px;
  background-color: ${({ theme }) => theme.colors.gray040};
  ::placeholder { 
    color: ${({ theme }) => theme.colors.gray200}; 
  }
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  font-size: ${({ theme }) => theme.fonts.size.md};
  ${({ theme }) => theme.media.mobile} { width: 100%; }
`;

const TitleInput = styled.input.attrs({ required: true })`
  ${Content}
  width: 100%;
  height: 40px;
`;

const Textarea = styled.textarea.attrs({ required: true })`
  ${Content}
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
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fonts.size.base};
  background-color: ${({ theme }) => theme.colors.darkblue};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.media.mobile} { width: 100%; }
`;

function Contents(): JSX.Element {
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onCategoryHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value);
  }

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

  const onModalHandler = () => {
    setIsOpen(isOpen => !isOpen);
  };

  const onSubmitHandler = () => {
    // TODO: 백으로 데이터 전송
  }

  return (
    <Wrapper>
      <Form onSubmit={onSubmitHandler}>
        <Label htmlFor="category">
          카테고리
          <Select 
            name="category" 
            id="category" 
            value={category}
            onChange={onCategoryHandler} 
          >
            <option value="" disabled selected>카테고리를 선택해주세요.</option>
            <option value="school-life">학교생활</option>
            <option value="school-facilities">교내시설</option>
            <option value="covid-19">코로나19</option>
            <option value="scholarship">장학금</option>
            <option value="lesson">수업</option>
            <option value="etc">기타</option>
          </Select>
        </Label>
        
        <Label htmlFor="title">
          청원 제목
          <TitleInput 
            id="title" 
            type="text" 
            value={title}
            onChange={onTitleHandler}
            placeholder="청원 제목을 입력해주세요." 
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
          <Button type="button" onClick={onModalHandler}>작성완료</Button>
        </ButtonDiv>
      </Form>
      <ReactModal
        isOpen={isOpen}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="개인정보 수집 및 이용 동의"
        onRequestClose={() => setIsOpen(false)}
      >
        <Modal onModalHandler={onModalHandler} onSubmitHandler={onSubmitHandler} />
      </ReactModal>
    </Wrapper>
  );
}

export default Contents;