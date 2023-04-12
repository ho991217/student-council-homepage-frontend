import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import SubmitButtonM from 'components/editor/button/SubmitButtonM';
import TextBoxS from 'components/editor/input/TextBoxS';
import DatePickerM from 'components/editor/DatePickerM';
import FileBoxS from 'components/editor/input/FileBoxS';
import NumBoxS from 'components/editor/input/NumBoxS';
import { useErrorModal } from 'hooks/UseErrorModal';

function ConferenceEditor() {
  const [round, setRound] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]); // [File
  const [form, setForm] = useState<FormData>();
  const navigate = useNavigate();
  const { renderModal, setErrorMessage, setErrorTitle, open } = useErrorModal();

  const onRoundHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setRound(value);
  };

  const onTitleHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTitle(value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorTitle('회의록 등록 실패');
    if (round === '') {
      setErrorMessage('회차를 입력해주세요');
      open();
    } else if (title === '') {
      setErrorMessage('회의록명을 입력해주세요');
      open();
    } else if (date === undefined) {
      setErrorMessage('날짜를 입력해주세요');
      open();
    } else if (form === undefined) {
      setErrorMessage('파일을 선택해주세요');
      open();
    } else {
      const config = {
        method: 'post',
        url: '/conference',
        data: form,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      axios(config)
        .then(({ data }) => {
          if (data.successful) {
            navigate('/conference');
          } else {
            setErrorMessage(data.message);
            open();
          }
        })
        .catch(({ response }) => {
          setErrorMessage(response.data.message);
          open();
        });
    }
  };

  return (
    <Container>
      <InnerContainer>
        <Wrapper>
          <Form onSubmit={onSubmitHandler}>
            <NumBoxS
              label="회차"
              value={round}
              onChange={onRoundHandler}
              placeholder="회차를 입력해주세요."
            />
            <DatePickerM label="개최 일자" date={date} onChange={setDate} />
            <TextBoxS
              label="회의록명"
              value={title}
              onChange={onTitleHandler}
              placeholder="회의록명을 입력해주세요."
            />
            <FileBoxS setter={setFiles} />
            <SubmitButtonM text="작성 완료" />
          </Form>
        </Wrapper>
      </InnerContainer>
      {renderModal()}
    </Container>
  );
}

const Container = styled.div`
  margin: 40px 0;
  ${({ theme }) => theme.media.mobile} {
    margin: 0;
  }
`;

const InnerContainer = styled.div`
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

export default ConferenceEditor;
