import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Modal from 'components/modal/Modal';
import TextBoxS from 'components/editor/input/TextBoxS';
import TextBoxL from 'components/editor/input/TextBoxL';
import SelectBoxS from 'components/editor/input/SelectBoxS';
import SubmitButtonM from 'components/editor/button/SubmitButtonM';
import { getCategories } from '../functions/GetCategories';

interface ErrorProps {
  response: {
    data: {
      message: '1일 1회만 청원 등록이 가능합니다.';
      successful: boolean;
    };
  };
}

function Editor(): JSX.Element {
  const [categoryList, setCategoryList] = useState<string[]>(['category']);
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [cookies] = useCookies(['X-AUTH-TOKEN']);
  const navigate = useNavigate();

  const onCategoryHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value);
  };

  const onTitleHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTitle(value);
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (category === '') {
      setErrorMsg('카테고리를 선택해주세요.');
      setIsOpen(true);
      return;
    }
    if (title === '') {
      setErrorMsg('제목을 입력해주세요.');
      setIsOpen(true);
      return;
    }
    if (content === '') {
      setErrorMsg('내용을 입력해주세요.');
      setIsOpen(true);
      return;
    }

    const data = JSON.stringify({
      category,
      title,
      body: content,
    });

    try {
      const res = await axios({
        method: 'post',
        url: '/api/post/petition',
        headers: {
          'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
          'Content-Type': 'application/json',
        },
        data,
      });
      navigate(`/board-petition/board?id=${res.data.data.id}`);
    } catch (e) {
      const err = e as ErrorProps;
      if (err.response.data.message === '1일 1회만 청원 등록이 가능합니다.') {
        setErrorMsg(err.response.data.message);
        setIsOpen(true);
      }
    }
  };

  useEffect(() => {
    getCategories(cookies['X-AUTH-TOKEN']).then((res) => {
      setCategoryList(res);
    });
  }, []);

  return (
    <Container>
      <Wrapper>
        <Form onSubmit={onSubmitHandler}>
          <SelectBoxS
            label="카테고리"
            defaultMsg="카테고리를 선택해주세요."
            value={category}
            onChange={onCategoryHandler}
            options={categoryList}
          />
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
