import React, { useEffect, useState } from 'react';
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
  const formData = new FormData();
  const navigate = useNavigate();
  const { renderModal, setErrorMessage, setErrorTitle, open } = useErrorModal();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    formData.append('title', title);
    formData.append('body', 'body');
    formData.append('round', round);
    formData.append('date', date.toISOString().split('T')[0]);
    files.forEach((item) => {
      formData.append('files', item);
    });

    setForm(formData);
    console.log(formData?.get('title'));

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
    } else if (files.length === 0) {
      setErrorMessage('파일을 선택해주세요');
      open();
    } else {
      const config = {
        method: 'post',
        url: '/post/conference',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      axios(config)
        .then(({ data }) => {
          navigate('/conference');
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
              onChange={(e) => {
                setRound(e.currentTarget.value);
              }}
              placeholder="회차를 입력해주세요."
            />
            <DatePickerM label="개최 일자" date={date} onChange={setDate} />
            <TextBoxS
              label="회의록명"
              value={title}
              onChange={(e) => {
                setTitle(e.currentTarget.value);
              }}
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
