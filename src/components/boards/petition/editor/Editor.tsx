import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import ReactModal from 'react-modal';
import { Desktop, Tablet, Mobile } from 'hooks/MediaQueries';
import Modal from './Modal';
import { getCategories } from '../functions/GetCategories';

const customStylesDesktop = {
  content: {
    top: '25%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginTop: '290px',
    transform: 'translate(-50%, -50%)',
    padding: 0,
  },
};

const customStylesMobile = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginTop: '80px',
    transform: 'translate(-50%, -50%)',
    padding: 0,
  },
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-divs: center;
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

const TitleInput = styled.input`
  ${Content}
  width: 100%;
  height: 40px;
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

function Editor(): JSX.Element {
  const [categoryList, setCategoryList] = useState<[]>();
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  const onOpenModalHandler = () => {
    if (category === '') {
      alert('카테고리를 선택해주세요.');
    } else if (title === '') {
      alert('청원 제목을 입력해주세요');
    } else if (content === '') {
      alert('청원 내용을 입력해주세요');
    } else {
      setIsOpen(true);
    }
  };

  const onCloseModalHandler = () => {
    setIsOpen(false);
  };

  const onSubmitHandler = async () => {
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
      console.log(res.data.data.id);
      navigate(`/board-petition/board?id=${res.data.data.id}`);
    } catch (e) {
      // TODO:등록 실패
      // 하루 여러개 등의 이유
      console.log(e);
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
          <Label htmlFor="title">
            청원 제목
            <TitleInput
              type="text"
              id="title"
              value={title}
              onChange={onTitleHandler}
              placeholder="청원 제목을 입력해주세요."
            />
          </Label>
          <Label htmlFor="content">
            청원 내용
            <Textarea
              id="content"
              value={content}
              onChange={onContentHandler}
            />
          </Label>
          <ButtonDiv>
            <Button type="button" onClick={onOpenModalHandler}>
              작성완료
            </Button>
          </ButtonDiv>
        </Form>
        <Desktop>
          <ReactModal
            isOpen={isOpen}
            style={customStylesDesktop}
            ariaHideApp={false}
            contentLabel="개인정보 수집 및 이용 동의"
            onRequestClose={() => setIsOpen(false)}
          >
            <Modal
              onCloseModalHandler={onCloseModalHandler}
              onSubmitHandler={onSubmitHandler}
            />
          </ReactModal>
        </Desktop>
        <Tablet>
          <ReactModal
            isOpen={isOpen}
            style={customStylesMobile}
            ariaHideApp={false}
            contentLabel="개인정보 수집 및 이용 동의"
            onRequestClose={() => setIsOpen(false)}
          >
            <Modal
              onCloseModalHandler={onCloseModalHandler}
              onSubmitHandler={onSubmitHandler}
            />
          </ReactModal>
        </Tablet>
        <Mobile>
          <ReactModal
            isOpen={isOpen}
            style={customStylesMobile}
            ariaHideApp={false}
            contentLabel="개인정보 수집 및 이용 동의"
            onRequestClose={() => setIsOpen(false)}
          >
            <Modal
              onCloseModalHandler={onCloseModalHandler}
              onSubmitHandler={onSubmitHandler}
            />
          </ReactModal>
        </Mobile>
      </Wrapper>
    </Container>
  );
}

export default Editor;
