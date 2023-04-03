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

function Editor() {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [originalTags, setOriginalTags] = useState<any[]>([]);
  const [check, setCheckTag] = useState<any[]>([]);
  const [tagObject, setTagObject] = useState<any[]>([]);
  const [tagObjectResult, setTagObjectResult] = useState<any[]>([]);
  const [tagListToObject, setTagListToObject] = useState<any[]>([]);
  const [isTagFind, setIsTagFind] = useState<boolean>();
  const [tagNameResult, setTagNameResult] = useState<any[]>([]);
  const [tagResult, setTagResult] = useState<any[]>([]);
  const [tagIntersect, setTagIntersect] = useState(['']);
  const [tagList, setTagList] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [cookies] = useCookies(['X-AUTH-TOKEN']);
  const navigate = useNavigate();
  const formData = new FormData();

  const getTags = async () => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `/post/tag`,
        headers: {
          Authorization: `Bearer ${cookies['X-AUTH-TOKEN']}`,
        },
      });
      console.log(data);
      setOriginalTags(data);
    } catch (e) {
      console.log(e);
    }
  };

  const onTitleHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTitle(value);
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
      setTagResult((prev) => [...prev, data.id]);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (title.length === 0) {
      setErrorMsg('제목을 입력해주세요.');
      setIsOpen(true);
      return;
    }
    if (content.length === 0) {
      setErrorMsg('내용을 입력해주세요.');
      setIsOpen(true);
      return;
    }

    tagObjectResult.forEach((tag) => {
      registerTags(tag);
    });

    formData.append('title', title);
    formData.append('body', content);
    tagResult.forEach((tag) => formData.append('tagIds', tag));

    // try {
    //   const res = await axios({
    //     method: 'post',
    //     url: '/post/petition',
    //     headers: {
    //       Authorization: `Bearer ${cookies['X-AUTH-TOKEN']}`,
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     data: formData,
    //   });
    //   console.log(res);
    //   navigate(`/board-petition/board?id=${res.data.id}`);
    // } catch (e) {
    //   console.log(e);
    //   const err = e as ErrorProps;
    //   if (err.response.data.message === '1일 1회만 청원 등록이 가능합니다.') {
    //     setErrorMsg(err.response.data.message);
    //     setIsOpen(true);
    //   }
    // }
  };
  const handleEnterTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const tag = tagList[tagList.length - 1];
    const findIndex = (data: string) =>
      originalTags.findIndex((originTag) => originTag.name === data);
    if (e.key === 'Enter' || e.key === 'Backspace') {
      console.log(findIndex(tag));
      setTagNameResult((prev) => [...prev, tagList[tagList.length - 1]]);
    }

    return true;
  };

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    setTagObjectResult([]);
    const allObjectTags = new Set(tagObject);

    const allTags = new Set(tagNameResult);
    const realTags = new Set(tagList);
    const tagsIntersect = [...allTags].filter((data) => realTags.has(data));
    const objectIntersect = [...allObjectTags].filter((data) =>
      realTags.has(data),
    );
    objectIntersect.forEach((tag) => {
      setTagObjectResult((prev) => [...prev, { name: tag }]);
    });
  }, [tagObject, tagList]);
  useEffect(() => {
    // console.log(`------------------`)
    console.log(`tagList : ${tagList}`);
    console.log(`tagNameResult : ${tagNameResult}`);
    console.log(`tagObject : ${JSON.stringify(tagObject)}`);
    console.log(`tagResult : ${tagResult}`);
    console.log(`tagObjectResult : ${JSON.stringify(tagObjectResult)}`);
    console.log(`originTags: ${JSON.stringify(originalTags)}`);
    console.log(`tagResult: ${JSON.stringify(tagResult)}`);

    // console.log(`${tagList.length} !== ${tagNameResult.length}`)
  }, [tagList, tagNameResult, onSubmitHandler, getTags, registerTags]);

  useEffect(() => {
    const tag = tagList[tagList.length - 1];
    const findIndex = (data: string) =>
      originalTags.findIndex((originTag) => originTag.name === data);

    if (findIndex(tag) === -1) {
      setTagObject((prev) => [...prev, tag]);
    } else {
      setTagResult((prev) => [...prev, originalTags[findIndex(tag)].id]);
    }
  }, [tagIntersect]);

  // useEffect(()=>{

  // },[])
  return (
    <Container>
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
            htmlStr={content}
            setHtmlStr={setContent}
          />
          <TagBoxLabel>태그</TagBoxLabel>
          <TagsInput
            value={tagList}
            onChange={setTagList}
            name="tagListInput"
            placeHolder="태그들을 입력해주세요"
            onKeyUp={handleEnterTag}
          />
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

export default Editor;
