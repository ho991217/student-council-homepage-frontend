import styled from 'styled-components';

interface TextBoxSProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

TextBoxS.defaultProps = {
  placeholder: '값을 입력하시오.',
  value: '',
  onChange: () => null,
};

function TextBoxS({ label, placeholder, value, onChange }: TextBoxSProps) {
  return (
    <Label htmlFor="title">
      {label}
      <TitleInput
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Label>
  );
}

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.size.md};
  user-select: none;
`;

const TitleInput = styled.input.attrs({ type: 'text' })`
  margin-top: 15px;
  padding-left: 12px;
  background-color: ${({ theme }) => theme.colors.gray040};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray200};
  }
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  font-size: ${({ theme }) => theme.fonts.size.base};
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
  height: 40px;
  width: 100%;
`;

export default TextBoxS;
