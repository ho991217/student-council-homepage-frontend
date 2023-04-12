import { ChangeEvent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 50px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.size.md};
  user-select: none;
`;

const TextArea = styled.textarea`
  background-color: #f2f3f5;
  padding: 10px;
  margin-top: 15px;
  border: 1px solid #c4c8cc;
  min-height: 450px;
  font-size: ${({ theme }) => theme.fonts.size.base};
  ::placeholder {
    color: #c4c8cc;
  }
`;

interface TextBoxLProps {
  content: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextBoxL({ content, label, onChange }: TextBoxLProps) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <TextArea
        placeholder="내용을 입력하세요."
        onChange={onChange}
        value={content}
      />
    </Wrapper>
  );
}

export default TextBoxL;
