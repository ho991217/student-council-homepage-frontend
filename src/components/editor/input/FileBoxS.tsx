import { useEffect, useRef, useState } from 'react';
import { FiUpload, FiFileMinus, FiFilePlus } from 'react-icons/fi';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray020};
  padding: 10px 15px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.accent};
  cursor: pointer;
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

const FilePreviewContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  max-width: 85%;
  margin-left: 12px;
  white-space: nowrap;
  overflow-x: scroll;
`;

const FilePreviewList = styled.ul`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const FilePreviewItem = styled.li`
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 10px 15px;
  height: 100%;
  font-size: 1rem;
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  filter: grayscale(0.5);
  cursor: pointer;
  svg {
    font-size: 15px;
    margin-right: 10px;
  }
`;

interface FileBoxSProps {
  setter: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

FileBoxS.defaultProps = {
  accept: '*/*',
  multiple: false,
};

function FileBoxS({ setter, accept, multiple }: FileBoxSProps) {
  const [files, setFiles] = useState<File[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newFi = [...files, ...newFiles];
      setFiles(newFi);
      setter(newFi);
    }
  };

  const onFileClick = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setter(newFiles);
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <Wrapper>
      <Container onClick={handleUploadClick}>
        <FiFilePlus />
        <Label>
          파일 추가
          <Input
            multiple={multiple}
            type="file"
            ref={inputRef}
            accept={accept}
            onChange={handleFileChange}
          />
        </Label>
      </Container>
      <FilePreviewContainer>
        <FilePreviewList>
          {files.map((file, index) => (
            <FilePreviewItem key={file.name} onClick={() => onFileClick(index)}>
              <FiFileMinus />
              {file.name}
            </FilePreviewItem>
          ))}
        </FilePreviewList>
      </FilePreviewContainer>
    </Wrapper>
  );
}

export default FileBoxS;
