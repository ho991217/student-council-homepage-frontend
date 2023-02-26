import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CopyrightTerm from 'components/CopyrightTerm';
import { PropagateLoader } from 'react-spinners';
import Modal from 'components/modal/Modal';
import styled from 'styled-components';
import LogoSrc from 'static/images/logos/emb.png';
import { Info } from '../SignUp';

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img.attrs({ src: LogoSrc, alt: '로고 이미지' })`
  height: 150px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  max-width: 540px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 1.2rem;
  background-color: #f7f7f7;
  padding: 0 1.2rem;
  border-radius: 5px;
  :focus {
    outline: none;
    background-color: #eeeeee;
  }
  ::placeholder {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

const IdInput = styled(Input).attrs({
  type: 'number',
  maxLength: 8,
  placeholder: '학번(ID) 입력',
})`
  margin-bottom: 10px;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const PasswordInput = styled(Input).attrs({
  type: 'password',
  placeholder: '비밀번호 입력',
})``;

const ErrorMsg = styled.div`
  color: #ff6565;
  width: 100%;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  div {
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid #ff6565;
  }
`;

const SubmitButton = styled.input.attrs({ type: 'submit' })<{ valid: boolean }>`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 30px;
  margin-bottom: 80px;
  font-size: 1.2rem;
  background-color: ${({ valid, theme }) =>
    valid ? theme.colors.primary : theme.colors.gray200};
  color: ${({ theme }) => theme.colors.white};
  cursor: ${({ valid }) => (valid ? 'pointer' : '')};
`;

function StudentIdValidation({ setInfo }: { setInfo: (info: Info) => void }) {
  const [Error, setError] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (id.length === 8 && password.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [id, password]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: '/user/dku/verify',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        dkuStudentId: id,
        dkuPassword: password,
      },
    })
      .then(({ data }) => {
        setInfo(data);
      })
      .catch(({ response }) => {
        setError(response.data.message[0]);
      });
  };

  return (
    <Container>
      <Logo />
      <Form onSubmit={onSubmit}>
        <IdInput value={id} onChange={(e) => setId(e.currentTarget.value)} />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        {Error.length > 0 && (
          <ErrorMsg>
            <div>!</div>
            {Error}
          </ErrorMsg>
        )}
        <SubmitButton valid={isValid} value="인증" disabled={!isValid} />
      </Form>
    </Container>
  );
}

export default StudentIdValidation;
