import axios from 'axios';
import Message from 'pages/sign-up/components/Message';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
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

const PhoneNumberInput = styled(Input).attrs({
  type: 'password',
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
  margin-top: 30px;
  margin-bottom: 80px;
  font-size: 1.2rem;
  background-color: ${({ valid, theme }) =>
    valid ? theme.colors.primary : theme.colors.gray200};
  color: ${({ theme }) => theme.colors.white};
  cursor: ${({ valid }) => (valid ? 'pointer' : '')};
`;
export default function PasswordInfo() {
  const [password, setPassword] = useState({
    content: '',
    msg: '',
    valid: false,
  });
  const [passwordCheck, setPasswordCheck] = useState({
    content: '',
    msg: '',
    valid: false,
  });
  const [isValid, setIsValid] = useState(false);
  const location = useLocation();
  const [Error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { token } = location.state;
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (password.content === passwordCheck.content) {
  //     setIsValid(true);
  //   } else {
  //     setIsValid(false);
  //   }
  // }, [password, passwordCheck]);

  useEffect(() => {
    const reg =
      /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*+=\-_(){}[\]:;<>,.?~]{8,16}$/;
    if (!reg.test(password.content)) {
      setPassword((prev) => ({
        content: prev.content,
        msg: '비밀번호는 영문과 숫자를 1자 이상 포함하는 8-16 자리여야 합니다.',
        valid: false,
      }));
      setIsValid(false);
    } else {
      setPassword((prev) => ({
        content: prev.content,
        msg: '',
        valid: true,
      }));
      if (password.content === passwordCheck.content) {
        setPasswordCheck((prev) => ({
          content: prev.content,
          msg: '',
          valid: true,
        }));
        setIsValid(true);
      } else {
        setPasswordCheck((prev) => ({
          content: prev.content,
          msg: '비밀번호가 일치하지 않습니다.',
          valid: false,
        }));
      }
    }
  }, [password.content, passwordCheck.content]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios({
      method: 'patch',
      url: '/user/find/pwd/reset',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        token,
        password: password.content,
      },
    })
      .then(({ data }) => {
        navigate('/password/success');
      })
      .catch(({ response }) => {
        setError(response.data.message[0]);
        setIsOpen(true);
      });
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Title>비밀번호 재설정</Title>
        <PhoneNumberInput
          value={password.content}
          placeholder="비밀번호 입력"
          onChange={({ currentTarget }) =>
            setPassword((prev) => ({
              content: currentTarget.value,
              msg: prev.msg,
              valid: prev.valid,
            }))
          }
        />
        <PhoneNumberInput
          value={passwordCheck.content}
          placeholder="비밀번호 다시 입력"
          onChange={({ currentTarget }) =>
            setPasswordCheck((prev) => ({
              content: currentTarget.value,
              msg: prev.msg,
              valid: prev.valid,
            }))
          }
        />
        <Message
          type="notice"
          message={password.msg}
          open={!password.valid && !!password.msg}
        />
        <Message
          type="error"
          message={passwordCheck.msg}
          open={!passwordCheck.valid && !!passwordCheck.msg}
        />
        <Message type="error" message={Error} open={Error.length > 0} />
        <SubmitButton valid={isValid} value="변경" disabled={!isValid} />
      </Form>
    </Container>
  );
}
