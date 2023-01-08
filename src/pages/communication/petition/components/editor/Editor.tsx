import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Modal from 'components/modal/Modal';
import TextBoxS from 'components/editor/input/TextBoxS';
import { getCategories } from '../../functions/GetCategories';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.size.md};
  user-select: none;
`;

const Select = styled.select`
  font-size: ${({ theme }) => theme.fonts.size.base};
  color: black;
  width: 400px;
  height: 40px;
  margin-top: 15px;
  padding-left: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray400};
  ${({ theme }) => theme.media.tablet} {
    width: 300px;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 180px;
  }
`;

const Content = css`
  margin-top: 15px;
  padding-left: 12px;
  background-color: ${({ theme }) => theme.colors.gray040};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray200};
  }
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  font-size: ${({ theme }) => theme.fonts.size.base};
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;


const Textarea = styled.textarea`
  ${Content}
  width: 100%;
  height: 450px;
  padding-top: 10px;
  resize: none;
`;

const ButtonDiv = styled.div`
  margin: auto;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

const Button = styled.button`
  width: 260px;
  height: 50px;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fonts.size.base};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
  border-radius: 5px;
`;

interface ErrorProps {
  response: {
    data: {
      message: '1일 1회만 청원 등록이 가능합니다.';
      successful: boolean;
    };
  };
}

function Editor(): JSX.Element {
  const [categoryList, setCategoryList] = useState<[]>();
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

  const onContentHandler = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setContent(value);
  };

  const onSubmitHandler = async () => {
    if (category === '') {
      setErrorMsg('카테고리를 선택해주세요.');
      setIsOpen(true);
    } else if (title === '') {
      setErrorMsg('제목을 입력해주세요.');
      setIsOpen(true);
    } else if (content === '') {
      setErrorMsg('내용을 입력해주세요.');
      setIsOpen(true);
    } else {
      setIsOpen(true);
    }
    const data = JSON.stringify({
      category,
      title,
      text: content,
    });
    try {
      const res = await axios({
        method: 'post',
        url: '/api/petition',
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
          <Label htmlFor="category">
            카테고리
            <Select
              name="category"
              id="category"
              value={category}
              onChange={onCategoryHandler}
              defaultValue=""
            >
              <option value="" disabled>
                카테고리를 선택해주세요.
              </option>
              {categoryList?.map((category) => (
                <option key={categoryList.indexOf(category)} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </Label>
          <TextBoxS
            label="청원 제목"
            value={title}
            onChange={onTitleHandler}
            placeholder="청원 제목을 입력해주세요."
          />
          <Label htmlFor="content">
            청원 내용
            <Textarea
              id="content"
              value={content}
              onChange={onContentHandler}
            />
          </Label>
          <ButtonDiv>
            <Button type="button" onClick={onSubmitHandler}>
              작성완료
            </Button>
          </ButtonDiv>
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
