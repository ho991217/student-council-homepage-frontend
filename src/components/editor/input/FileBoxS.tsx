import { useRef } from 'react';
import { FiUpload } from 'react-icons/fi';
import styled from 'styled-components';

interface FileBoxSProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  multiple?: boolean;
}

FileBoxS.defaultProps = {
  accept: '*/*',
  multiple: false,
};

function FileBoxS({ label, onChange, accept, multiple }: FileBoxSProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <Wrapper>
      <Container onClick={handleUploadClick}>
        <FiUpload />
        <Label>
          {label}
          <Input
            multiple={multiple}
            type="file"
            ref={inputRef}
            accept={accept}
            onChange={onChange}
          />
        </Label>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.accent};
  svg {
    font-size: 15px;
    margin-right: 10px;
  }
`;

const Label = styled.label`
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  font-size: ${({ theme }) => theme.fonts.size.md};
`;

const Input = styled.input`
  display: none;
`;

export default FileBoxS;
