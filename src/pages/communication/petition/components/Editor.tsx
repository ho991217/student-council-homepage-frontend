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
  const [isTagFind, setIsTagFind] = useState<boolean>();
  const [tagNameResult, setTagNameResult] = useState<any[]>([]);
  const [tagResult, setTagResult] = useState<any[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [cookies] = useCookies(['X-AUTH-TOKEN']);
  const navigate = useNavigate();
  const formData = new FormData();

  const getTags = async () => {
    try {
      const {data} = await axios({
        method: 'get',
        url: `/post/tag`,
        headers: {
          Authorization: `Bearer ${cookies['X-AUTH-TOKEN']}`,
        },
      })
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
      setTagResult( prev => [...prev, data.id] )
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

    tagObject.forEach((tag) => {
      registerTags(tag)
    })
    
    
  

    formData.append('title', title);
    formData.append('body', content);
    tagResult.forEach((tag) => formData.append('tagIds', tag));

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
      // navigate(`/board-petition/board?id=${res.data.id}`);
    } catch (e) {
      console.log(e);
      const err = e as ErrorProps;
      if (err.response.data.message === '1일 1회만 청원 등록이 가능합니다.') {
        setErrorMsg(err.response.data.message);
        setIsOpen(true);
      }
    }
  };
  const handleEnterTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // const tag = tagList[tagList.length - 1]
    // const previousTagInTagList = tagList[tagList.length - 2]
    // const resultIndex = (data:string) => originalTags.findIndex((originTag) => originTag.name === data);
    // if (e.key === 'Enter') {
    //   setTagNameResult(prev => [...prev, tagList[tagList.length - 1]])
    //   let i = 1;
    //   console.log(i)
    //   const previousTagInTagNameResult = tagNameResult[tagNameResult.length - 1]
    //   console.log(`previousTagInTagList: ${previousTagInTagList}`)
    //   console.log(`previousTagInTagNameResult: ${previousTagInTagNameResult}`)
    //   if (previousTagInTagList !== previousTagInTagNameResult) {
    //     if (resultIndex(tagNameResult[tagNameResult.length - 1]) >= 0) {
    //       tagResult.pop()
    //     } else {
    //       tagObject.pop()
    //     }
    //     tagNameResult.pop()
    //     i += 1
    //     return false
    //   }   
    // }  
    // return true
  }



  useEffect(()=>{
    getTags()
  },[])


  useEffect(()=> {
    console.log(`------------------`)
    console.log(`tagList : ${tagList}`)
    console.log(`tagNameResult : ${tagNameResult}`)
    console.log(`tagObject : ${tagObject}`)
    console.log(`tagResult : ${tagResult}`)
    console.log(`${tagList.length} !== ${tagNameResult.length}`)
    if (tagList.length !== tagNameResult.length) {
      // tagNameResult.pop([tagNameResult.length - 2])
    } 
  },[tagList, tagNameResult])
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
          <TagBoxLabel>태그
          <TagsInput
            value={tagList}
            onChange={setTagList}
            name="tagListInput"
            placeHolder="태그들을 입력해주세요"
            onKeyUp={handleEnterTag}
          /></TagBoxLabel>
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
