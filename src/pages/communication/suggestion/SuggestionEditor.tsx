import axios from 'axios';
import SubmitButtonM from 'components/editor/button/SubmitButtonM';
import TextBoxS from 'components/editor/input/TextBoxS';
import TextBoxL from 'components/editor/input/TextBoxL';
import FileBoxS from 'components/editor/input/FileBoxS';
import { useEffect, useState } from 'react';
import { useErrorModal } from 'hooks/UseErrorModal';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TagsInput } from 'react-tag-input-component';

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

interface Tags {
  id: number;
  name: string;
}

interface TagObject {
  name: string;
}

function SuggestionEditor() {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [originalTags, setOriginalTags] = useState<Tags[]>([]);
  const [tagObjectResult, setTagObjectResult] = useState<TagObject[]>([]);
  const [tagResult, setTagResult] = useState<number[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);
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

  const findIndex = (data: string) => {
    return originalTags.findIndex((originTag) => originTag.name === data);
  };

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

  const registerTags = async (tag: object) => {
    try {
      const { data } = await axios({
        method: 'post',
        url: '/post/tag',
        headers: {
          'Content-Type': 'application/json',
        },
        data: tag,
      });
      getTags();
      setTagResult((prev) => [...prev, data.id]);
    } catch (e) {
      const error = e as any;
      setErrorMessage(error.response.data.message[0]);
      open();
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
    } else {
      formData.append('title', title);
      formData.append('body', text);
      files.forEach((file) => formData.append('files', file));

      tagObjectResult.forEach((tag) => {
        registerTags(tag);
      });

      const tagNameList = originalTags.map((item) => {
        return item.name;
      });
      const originalSet = new Set(tagNameList);
      const tagListSet = new Set(tagList);
      const tagsIntersect = [...tagListSet].filter((data) =>
        originalSet.has(data),
      );
      const newTags = [...tagListSet].filter((data) => !originalSet.has(data));
      tagsIntersect.forEach((tag) => {
        setTagResult((prev) => [...prev, originalTags[findIndex(tag)].id]);
      });
      newTags.forEach((tag) => {
        setTagObjectResult((prev) => [...prev, { name: tag }]);
      });

      if (tagList.length === 0) {
        formData.append('title', title);
        formData.append('body', text);
        formData.delete('tagIds');
        files.forEach((file) => formData.append('files', file));
        handlePost();
      }
    }
  };

  useEffect(() => {
    if (tagList.length > 0) {
      formData.append('title', title);
      formData.append('body', text);
      formData.append('tagIds', JSON.stringify(tagResult).slice(1, -1));
      files.forEach((file) => formData.append('files', file));
      handlePost();
    }
  }, [tagResult]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
          <TagBoxLabel>태그</TagBoxLabel>
          <TagsInput
            value={tagList}
            onChange={setTagList}
            name="tagListInput"
            placeHolder="태그들을 입력해주세요"
          />
          <FileBoxS setter={setFiles} accept="image/*" multiple />
          <SubmitButtonM text="작성 완료" />
        </Form>
      </Wrapper>
    </Container>
  );
}

export default SuggestionEditor;
