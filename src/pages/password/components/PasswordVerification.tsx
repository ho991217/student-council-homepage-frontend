import axios from 'axios';
import Message from 'pages/sign-up/components/Message';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.media.mobile} {
    padding: 0 20px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  width: 100%;
  max-width: 540px;
  ${({ theme }) => theme.media.mobile} {
    box-sizing: border-box;
    padding: 0 15px;
  }
`;
const Title = styled.p`
  align-self: flex-start;
  font-size: 22px;
  margin-bottom: 30px;
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

const NumberInput = styled(Input).attrs({
  type: 'number',
})`
  margin-bottom: 10px;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
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
  margin-top: 15px;
  margin-bottom: 80px;
  font-size: 1.2rem;
  background-color: ${({ valid, theme }) =>
    valid ? theme.colors.primary : theme.colors.gray200};
  color: ${({ theme }) => theme.colors.white};
  cursor: ${({ valid }) => (valid ? 'pointer' : '')};
`;
export default function PasswordVerification() {
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [token, setToken] = useState('');
  const [Error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isVerified) {
      if (input.length === 11) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else if (isVerified) {
      if (input.length === 6) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  }, [input]);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isVerified) {
      axios({
        method: 'post',
        url: '/user/find/pwd',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          phoneNumber: input,
        },
      })
        .then(({ data }) => {
          setToken(data.token);
          setIsVerified(true);
          setInput('');
          setIsSend(true);
        })
        .catch(({ response }) => {
          //   setError(response.data.message[0]);
          //   setIsOpen(true);
        });
    } else {
      setIsSend(false);
      axios({
        method: 'post',
        url: '/user/find/pwd/verify',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          token,
          code: input,
        },
      })
        .then(({ data }) => {
          navigate('/password/info', { state: { token } });
        })
        .catch(({ response }) => {
          setError(response.data.message[0]);
          setIsOpen(true);
        });
    }
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Title>
          {!isVerified ? '가입시 입력한 휴대전화 번호 입력' : '인증번호 입력'}
        </Title>
        <Message
          margin={false}
          type="notice"
          message={<span>인증번호가 발송되었습니다.</span>}
          open={isSend}
        />
        <Message
          type="error"
          margin={false}
          message={Error}
          open={Error.length > 0}
        />
        <NumberInput
          value={input}
          onChange={({ currentTarget }) => setInput(currentTarget.value)}
          placeholder={!isVerified ? '휴대전화 번호 입력' : '인증번호 입력'}
          maxLength={!isVerified ? 11 : 6}
        />

        <SubmitButton
          valid={isValid}
          value={!isVerified ? '인증번호 발송' : '인증'}
          disabled={!isValid}
        />
      </Form>
    </Container>
  );
}
