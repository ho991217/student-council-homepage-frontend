import React, { useState } from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'components/modal/Modal';
import SubmitButtonM from 'components/editor/button/SubmitButtonM';
import TextBoxS from 'components/editor/input/TextBoxS';
import DatePickerM from 'components/editor/DatePickerM';
import FileBoxS from 'components/editor/input/FileBoxS';
import NumBoxS from 'components/editor/input/NumBoxS';

function ConferenceEditor() {
  const [round, setRound] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]); // [File
  const [form, setForm] = useState<FormData>();
  const [cookies] = useCookies(['X-AUTH-TOKEN']);
  const navigate = useNavigate();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const formData = new FormData();
    formData.append('files', e.target.files[0]);
    formData.append('round', round);
    formData.append('date', date.toISOString().split('T')[0]);
    formData.append('title', title);
    files.forEach((f) => formData.append('files', f));
    setForm(formData);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (round === '') {
      setErrorMsg('회차를 입력해주세요');
      setIsOpen(true);
    } else if (title === '') {
      setErrorMsg('회의록명을 입력해주세요');
      setIsOpen(true);
    } else if (date === undefined) {
      setErrorMsg('날짜를 입력해주세요');
      setIsOpen(true);
    } else if (form === undefined) {
      setErrorMsg('파일을 선택해주세요');
      setIsOpen(true);
    } else {
      const config = {
        method: 'post',
        url: '/conference',
        data: form,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
        },
      };

      axios(config)
        .then(({ data }) => {
          if (data.successful) {
            navigate('/conference');
          } else {
            setErrorMsg(data.message);
            setIsOpen(true);
          }
        })
        .catch(({ response }) => {
          setErrorMsg(response.data.message);
          setIsOpen(true);
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
      {isOpen && (
        <Modal
          title="회의록 작성 실패"
          contents={errorMsg}
          onClose={() => setIsOpen(false)}
        />
      )}
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
