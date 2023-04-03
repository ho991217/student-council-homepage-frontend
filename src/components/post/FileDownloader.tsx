import { fileType } from 'pages/communication/petition/components/Post';
import { FiFile } from 'react-icons/fi';
import styled from 'styled-components';

const FilesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.gray100};
  padding: 20px;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fonts.size.lg};
`;

const File = styled.a`
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.secondary};

  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
  &:hover {
    cursor: pointer;
  }
`;

function FileDownloader({ files }: { files: fileType[] }) {
  return (
    <FilesContainer>
      첨부파일
      <ul>
        {files.map(({ id, url, originalName }) => (
          <li key={id}>
            <File href={url}>
              <FiFile />
              {originalName}
            </File>
          </li>
        ))}
      </ul>
    </FilesContainer>
  );
}

export default FileDownloader;
