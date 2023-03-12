import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoSrc from 'static/images/logos/emb.png';
import { StudentInfoAtom } from './StudentInfoAtom';
import Message from '../Message';

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

function StudentIdValidation() {
  const [Error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [info, setInfo] = useRecoilState(StudentInfoAtom);
  const navigate = useNavigate();

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
        navigate('/sign-up/info');
      })
      .catch(({ response }) => {
        setError(response.data.message[0]);
        setIsOpen(true);
      });
  };

  return (
    <Container>
      <Logo />
      <Form onSubmit={onSubmit}>
        <IdInput
          value={id}
          onChange={({ currentTarget }) => setId(currentTarget.value)}
        />
        <PasswordInput
          value={password}
          onChange={({ currentTarget }) => setPassword(currentTarget.value)}
        />
        <Message type="에러" message={Error} open={Error.length > 0} />
        <Message
          type="알림"
          message={
            <span>
              단국대학교 웹정보 로그인 시 사용하는 ID, PW를 통해 학생인증이
              진행됩니다.
              <br /> (입력한 정보는 인증 후 즉시 폐기됩니다.)
            </span>
          }
          open
        />

        <SubmitButton valid={isValid} value="인증" disabled={!isValid} />
      </Form>
    </Container>
  );
}

export default StudentIdValidation;
