import axios from 'axios';
import SubmitButtonM from 'components/editor/button/SubmitButtonM';
import TextBoxS from 'components/editor/input/TextBoxS';
import TextBoxL from 'components/editor/input/TextBoxL';
import FileBoxS from 'components/editor/input/FileBoxS';
import { useEffect, useState } from 'react';
import { useErrorModal } from 'hooks/UseErrorModal';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
  ${({ theme }) => theme.media.mobile} {
    margin: 0;
  }
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
const TagBoxLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.size.md};
  user-select: none;
  margin-bottom: 15px;
`;
const TagsContainer = styled.ul`
  display: flex;
  gap: 5px;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-bottom: 30px;
  padding-bottom: 10px;
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    width: 1px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
  &::-webkit-scrollbar-track {
    width: 1px;
    background-color: ${({ theme }) => theme.colors.gray040};
  }
`;
const TagLabel = styled.label.attrs({ className: 'tagLabel' })`
  background-color: ${({ theme }) => theme.colors.gray020};
  padding: 5px 10px;
  border-radius: 3px;
  white-space: nowrap;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
  &.selected {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;
const TagInput = styled.input.attrs({ type: 'checkBox' })`
  display: none;
`;
interface Tags {
  id: number;
  name: string;
}

function SuggestionEditor() {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [originalTags, setOriginalTags] = useState<Tags[]>([]);
  const [tagResult, setTagResult] = useState<number[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const { renderModal, setErrorMessage, setErrorTitle, open } = useErrorModal();
  const formData = new FormData();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const getTags = async () => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `/post/tag`,
      });
      setOriginalTags(data);
    } catch (e) {
      const error = e as any;
      setErrorMessage(error.response.data.message[0]);
      open();
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  const handlePost = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: '/post/general-forum',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });
      console.log(res);
      navigate(`/board-suggestion/board?id=${res.data.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorTitle('게시글 등록 실패');
    if (title.length === 0) {
      setErrorMessage('제목을 입력해주세요.');
      open();
    } else if (text.length < 9) {
      setErrorMessage('9자 이상의 내용을 입력해주세요.');
      open();
    }
    if (tagResult.length === 0) {
      formData.append('title', title);
      formData.append('body', text);
      files.forEach((file) => formData.append('files', file));
      handlePost();
    } else {
      formData.append('title', title);
      formData.append('body', text);
      formData.append('tagIds', JSON.stringify(tagResult).slice(1, -1));
      files.forEach((file) => formData.append('files', file));
      handlePost();
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const selectTag = (tagId: number, event: { target: HTMLInputElement }) => {
    const isSelected =
      event.target.parentElement?.classList.contains('selected');
    if (!isSelected) {
      setTagResult((prev) => [...prev, tagId]);
      event.target.parentElement?.classList.add('selected');
    } else {
      setTagResult(tagResult.filter((item) => item !== tagId));
      event.target.parentElement?.classList.remove('selected');
    }
  };

  return (
    <Container>
      <Wrapper>
        {renderModal()}
        <Form onSubmit={onSubmitHandler}>
          <TextBoxS
            label="제목"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={({ currentTarget }) => setTitle(currentTarget.value)}
          />
          <TextBoxL
            label="내용"
            content={text}
            onChange={(e) => setText(e.target.value)}
          />
          <FileBoxS setter={setFiles} accept="image/*" multiple />
          <TagBoxLabel>태그</TagBoxLabel>
          <TagsContainer>
            {originalTags.map((tag) => {
              return (
                <TagLabel key={tag.id} htmlFor={tag.name}>
                  <TagInput
                    id={tag.name}
                    type="checkBox"
                    name={tag.name}
                    onChange={(event) => selectTag(tag.id, event)}
                    checked={false}
                  />
                  #{tag.name}
                </TagLabel>
              );
            })}
          </TagsContainer>
          <SubmitButtonM text="작성 완료" />
        </Form>
      </Wrapper>
    </Container>
  );
}

export default SuggestionEditor;
