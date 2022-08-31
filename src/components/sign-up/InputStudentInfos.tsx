import axios from 'axios';
import styled from 'styled-components';
import { majorList } from 'components/user/Major';
import {
  Header,
  HeaderPoint,
  InputContainer,
  Wrapper,
} from 'components/sign-up/SignUpComponents';
import React, { useCallback, useRef, useState } from 'react';
import CopyrightTerm from 'components/global/CopyrightTerm';
import CheckPasswordSecurity from './CheckPasswordSecurity';

const InnerContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  height: 620px;
  ${({ theme }) => theme.media.mobile} {
    height: 350px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 5px;
    span {
      font-size: ${({ theme }) => theme.fonts.size.sm};
    }
  }
  background-color: ${({ theme }) => theme.colors.gray040};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;

  span {
    margin-bottom: 15px;
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

const PasswordInput = styled.input.attrs({
  type: 'password',
  required: true,
})`
  all: unset;
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
  width: 640px;
  padding: 0 10px;
`;

const PhoneNumInput = styled.input.attrs({
  type: 'text',
  required: true,
})`
  all: unset;
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
  width: 640px;
  padding: 0 10px;
`;

const CodeInput = styled.input.attrs({
  type: 'code',
  required: true,
})`
  all: unset;
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
  width: 540px;
  padding: 0 10px;
`;

const CodeButton = styled.input.attrs({ type: 'submit' })`
  all: unset;
  width: 100px;
  height: 80%;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const SendButton = styled.input.attrs({ type: 'submit' })<{ active: boolean }>`
  all: unset;
  width: 200px;
  height: 80%;
  background-color: ${({ active }) =>
    active
      ? ({ theme }) => theme.colors.secondary
      : ({ theme }) => theme.colors.gray200};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const SignUpButton = styled.button<{ active: boolean }>`
  all: unset;
  width: 450px;
  height: 50px;
  margin-top: 40px;
  background-color: ${(props) =>
    props.value === 'active'
      ? ({ theme }) => theme.colors.secondary
      : ({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  ${({ theme }) => theme.media.mobile} {
    width: 70%;
    height: 40px;
    margin-top: 20px;
  }
`;

const Select = styled.select`
  all: unset;
  height: 100%;
  width: 640px;
  padding: 0 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.base};
  color: ${(props) =>
    props.value ? 'black' : ({ theme }) => theme.colors.gray500};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PasswordSecurityLevel = styled.meter`
  width: 500px;
  height: 30px;
`;

function InputStudentInfos({
  studentId,
  token,
}: {
  studentId: string | null;
  token: string | null;
}): JSX.Element {
  const [signUpForm, setSignUpForm] = useState({
    password: '',
    major: '',
    phoneNum: '',
    isVerifiedStudentNum: false,
  });

  const [phoneCodeState, setPhoneCodeState] = useState({
    sent: false,
    success: false,
    token: '',
    code: '',
    verified: false,
  });

  const [passwordState, setPasswordState] = useState({
    securityLevel: 0,
    verified: false,
  });

  const codeInputRef = useRef<HTMLInputElement>(null);

  const handlePasswordChange = ({ currentTarget }: any) => {
    const password = currentTarget.value;
    setSignUpForm((prev) => ({
      ...prev,
      password,
    }));
    setPasswordState((prev) => ({
      ...prev,
      securityLevel: CheckPasswordSecurity(password),
    }));
  };

  const handleSignUp = useCallback(() => {
    // TODO: validation
    console.log(signUpForm);
  }, [signUpForm]);

  /** 인증문자를 보내는 함수 */
  const handlePhoneCodeSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPhoneCodeState((prev) => ({ ...prev, sent: true }));
    try {
      const { data } = await axios({
        method: 'get',
        url: `/api/auth/sms-code?phone=${signUpForm.phoneNum}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (data.token) {
        setPhoneCodeState((prev) => ({
          ...prev,
          success: true,
          token: data.token,
        }));
        if (codeInputRef.current !== null) {
          codeInputRef.current.focus();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  /** 인증코드를 입력해 핸드폰 번호를 인증받는 함수 */
  const submitPhoneCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = JSON.stringify({
      token: phoneCodeState.token,
      code: phoneCodeState.code,
    });
    try {
      const res = await axios({
        method: 'post',
        url: '/api/auth/sms-code',
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      });
      if (res.data.successful) {
        // 인증 성공
      }
    } catch (e) {
      //
    }
  };

  return (
    <Wrapper>
      <Header>
        단국대학교 총학생회 <HeaderPoint>회원가입</HeaderPoint>
      </Header>
      <InnerContainer>
        <InputContainer>
          <div>{studentId}@dankook.ac.kr</div>
        </InputContainer>
        <InputContainer>
          <PasswordInput
            placeholder="비밀번호 입력"
            value={signUpForm.password}
            onChange={handlePasswordChange}
          />
        </InputContainer>
        <PasswordSecurityLevel
          max={5}
          min={0}
          value={passwordState.securityLevel}
          defaultValue={0}
          optimum={5}
        />
        <InputContainer>
          <Select
            name="major"
            value={signUpForm.major}
            onChange={({ currentTarget }) =>
              setSignUpForm((prev) => ({ ...prev, major: currentTarget.value }))
            }
          >
            <option disabled value="" defaultValue="">
              학과 선택
            </option>
            {Object.entries(majorList).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </Select>
        </InputContainer>
        <InputContainer onSubmit={handlePhoneCodeSend}>
          <PhoneNumInput
            placeholder="휴대폰 번호 입력"
            maxLength={13}
            minLength={13}
            value={signUpForm.phoneNum.replace(
              /(\d{3})(\d{4})(\d{4})/,
              '$1-$2-$3',
            )}
            onChange={({ currentTarget }) =>
              setSignUpForm((prev) => ({
                ...prev,
                phoneNum: currentTarget.value,
              }))
            }
          />
          <SendButton
            active={signUpForm.phoneNum.length >= 10}
            value="인증번호 발송"
            disabled={signUpForm.phoneNum.length < 10}
          />
        </InputContainer>
        <span>
          명확히 표기하지않을 시, 향후 이벤트 당첨시 불이익이 있을 수 있습니다.
        </span>

        {phoneCodeState.sent && (
          <InputContainer onSubmit={submitPhoneCode}>
            <CodeInput
              ref={codeInputRef}
              placeholder="인증번호 입력"
              value={phoneCodeState.code}
              onChange={({ currentTarget }) =>
                setPhoneCodeState((prev) => ({
                  ...prev,
                  code: currentTarget.value,
                }))
              }
            />
            <CodeButton value="확인" />
          </InputContainer>
        )}
        {phoneCodeState.verified && <span>휴대폰 인증이 완료되었습니다.</span>}
        <SignUpButton
          active={false} // TODO:모두 완료 됐을 때
          disabled={Object.values(signUpForm).some((el) => !el)}
          onClick={handleSignUp}
        >
          가입하기
        </SignUpButton>
      </InnerContainer>
      <CopyrightTerm />
    </Wrapper>
  );
}

export default InputStudentInfos;
