import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { PropagateLoader } from 'react-spinners';
import Modal from 'components/modal/Modal';

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

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.size.md};
  user-select: none;
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

const TitleInput = styled.input.attrs({ type: 'text' })`
  ${Content}
  width: 100%;
  height: 40px;
`;

const RoundInput = styled.input.attrs({ type: 'number' })`
  ${Content}
  width: 100%;
  height: 40px;
`;

const ButtonDiv = styled.div`
  margin: auto;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

const Button = styled.input.attrs({ type: 'submit' })`
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

const MyDatePicker = styled(DatePicker)`
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.gray040};
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray200};
  font-size: ${({ theme }) => theme.fonts.size.base};
  padding: 10px;
  margin-top: 10px;
`;

const Text = styled.span`
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-bottom: 20px;
`;

function ConferenceEditor() {
  const [round, setRound] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [date, settDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>('');
  const [form, setForm] = useState<FormData>();
  const [postState, setPostState] = useState({
    sent: false,
    success: false,
  });
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
      setPostState((prev) => ({
        ...prev,
        sent: true,
      }));
      const config = {
        method: 'post',
        url: '/api/conference',
        data: form,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
        },
      };

      axios(config)
        .then(({ data }) => {
          if (data.successful) {
            setPostState((prev) => ({
              ...prev,
              success: data.successful,
            }));
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
    <>
      {isOpen && (
        <Modal
          title="회의록 작성 실패"
          contents={errorMsg}
          onClose={() => setIsOpen(false)}
        />
      )}
      <Container>
        <InnerContainer>
          <Wrapper>
            <Form onSubmit={onSubmitHandler}>
              <Label htmlFor="round">
                회차
                <RoundInput
                  id="round"
                  value={round}
                  onChange={onRoundHandler}
                  placeholder="회차를 입력해주세요."
                />
              </Label>
              <Label htmlFor="date">
                개최일자
                <MyDatePicker
                  selected={date}
                  dateFormat="yyyy-MM-dd"
                  onChange={(selectDate: Date) => settDate(selectDate)}
                />
              </Label>
              <Label htmlFor="title">
                회의록명
                <TitleInput
                  id="title"
                  value={title}
                  onChange={onTitleHandler}
                  placeholder="회의록명을 입력해주세요."
                />
              </Label>
              <Label htmlFor="file">
                첨부파일
                <input
                  type="file"
                  onChange={handleChange}
                  style={{ marginTop: 10 }}
                />
              </Label>
              <ButtonDiv>
                <Button value="작성완료" />
              </ButtonDiv>
            </Form>
          </Wrapper>
        </InnerContainer>
      </Container>
    </>
  );
}

export default ConferenceEditor;
