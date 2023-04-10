import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Modal from 'components/modal/Modal';
import TextBoxS from 'components/editor/input/TextBoxS';
import TextBoxL from 'components/editor/input/TextBoxL';
import SubmitButtonM from 'components/editor/button/SubmitButtonM';
import { TagsInput } from 'react-tag-input-component';
import { faSmileWink } from '@fortawesome/free-regular-svg-icons';
import FileBoxS from 'components/editor/input/FileBoxS';

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

function Editor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [originalTags, setOriginalTags] = useState<Tags[]>([]);
  const [tagObjectResult, setTagObjectResult] = useState<any[]>([]);
  const [tagResult, setTagResult] = useState<number[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [cookies] = useCookies(['X-AUTH-TOKEN']);
  const navigate = useNavigate();
  const formData = new FormData();

  const onTitleHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTitle(value);
  };

  const preventEnterSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.code === 'Enter') {
      console.log('enter')
    }
  };

  const getTags = async () => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `/post/tag`,
        headers: {
          Authorization: `Bearer ${cookies['X-AUTH-TOKEN']}`,
        },
      });
      setOriginalTags(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  const findIndex = (data: string) => {
    return originalTags.findIndex((originTag) => originTag.name === data);
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    
    if (title.length === 0) {
      setErrorMsg('제목을 입력해주세요.');
      setIsOpen(true);
      return;
    }
    if (content.length < 9) {
      setErrorMsg('9자 이상의 내용을 입력해주세요.');
      setIsOpen(true);
      return;
    }

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
      formData.append('body', content);
      formData.delete('tagIds');
      handlePost();
    }
  };

  const registerTags = async (tag: object) => {
    try {
      const { data } = await axios({
        method: 'post',
        url: '/post/tag',
        headers: {
          Authorization: `Bearer ${cookies['X-AUTH-TOKEN']}`,
          'Content-Type': 'application/json',
        },
        data: tag,
      });
      getTags();
      setTagResult((prev) => [...prev, data.id]);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePost = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: '/post/petition',
        headers: {
          Authorization: `Bearer ${cookies['X-AUTH-TOKEN']}`,
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
        setErrorMsg(err.response.data.message);
        setIsOpen(true);
      }
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
      handlePost();
    }
  }, [tagResult]);

  return (
    <Container>
      <Wrapper>
        <Form onSubmit={onSubmitHandler} onKeyDown={(e) => preventEnterSubmit}>
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
        {isOpen && (
          <Modal
            title="청원 등록 실패"
            contents={errorMsg}
            onClose={() => {
              setIsOpen(false);
              setErrorMsg('');
            }}
          />
        )}
      </Wrapper>
    </Container>
  );
}

export default Editor;
 