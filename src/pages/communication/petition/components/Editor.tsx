import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import TextBoxS from 'components/editor/input/TextBoxS';
import TextBoxL from 'components/editor/input/TextBoxL';
import SubmitButtonM from 'components/editor/button/SubmitButtonM';
import { TagsInput } from 'react-tag-input-component';
import FileBoxS from 'components/editor/input/FileBoxS';
import { useErrorModal } from 'hooks/UseErrorModal';

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
interface ErrorProps {
  response: {
    data: {
      message: '1일 1회만 청원 등록이 가능합니다.';
      successful: boolean;
    };
  };
}

interface Tags {
  id: number;
  name: string;
}

interface TagObject {
  name: string;
}

function Editor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [originalTags, setOriginalTags] = useState<Tags[]>([]);
  const [tagObjectResult, setTagObjectResult] = useState<TagObject[]>([]);
  const [tagResult, setTagResult] = useState<number[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const { renderModal, setErrorMessage, open, setErrorTitle } = useErrorModal();
  const navigate = useNavigate();
  const formData = new FormData();

  const onTitleHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTitle(value);
  };

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
        url: '/post/petition',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });
      console.log(res);
      navigate(`/board-petition/board?id=${res.data.id}`);
    } catch (e) {
      console.log(e);
      const err = e as ErrorProps;
      if (err.response.data.message === '1일 1회만 청원 등록이 가능합니다.') {
        setErrorTitle('청원 등록 실패');
        setErrorMessage(err.response.data.message);
        open();
      }
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
      console.log(e)
    }
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setErrorTitle('게시글 등록 실패');
    if (title.length === 0) {
      setErrorMessage('제목을 입력해주세요.');
      open();
      return;
    }
    if (content.length < 9) {
      setErrorMessage('9자 이상의 내용을 입력해주세요.');
      open();
      return;
    }

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

    tagObjectResult.forEach((tag) => {
      registerTags(tag);
    });

    if (tagList.length === 0) {
      formData.append('title', title);
      formData.append('body', content);
      formData.delete('tagIds');
      files.forEach((file) => formData.append('files', file));
      handlePost();
    }
  };

  useEffect(() => {
    tagObjectResult.forEach((tag) => {
      registerTags(tag);
    });
  }, [tagObjectResult]);
  
  useEffect(() => {
    if (tagList.length > 0) {
      formData.append('title', title);
      formData.append('body', content);
      formData.append('tagIds', JSON.stringify(tagResult).slice(1, -1));
      files.forEach((file) => formData.append('files', file));
      console.log(JSON.stringify(tagResult).slice(1, -1))
      handlePost();
    }
  }, [tagResult]);

  return (
    <Container>
      {renderModal()}
      <Wrapper>
        <Form onSubmit={onSubmitHandler}>
          <TextBoxS
            label="청원 제목"
            value={title}
            onChange={onTitleHandler}
            placeholder="청원 제목을 입력해주세요."
          />
          <TextBoxL
            label="청원 내용"
            content={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <TagBoxLabel>태그</TagBoxLabel>
          <TagsInput
            value={tagList}
            onChange={setTagList}
            name="tagListInput"
            placeHolder="태그들을 입력해주세요"
          />
          <FileBoxS setter={setFiles} multiple />
          <SubmitButtonM text="작성 완료" />
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Editor;
