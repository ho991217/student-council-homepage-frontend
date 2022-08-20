import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

import { majorList } from 'components/user/Major';
import { createBigIntLiteral } from 'typescript';

const Wrapper = styled.div`
  width: 100%;
  height: 850px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 2rem;
`;

const Header = styled.div`
  margin: 40px 0 15px 0;
  max-width: 1400px;
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
`;

const HeaderPoint = styled.div`
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.secondary};
`;

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

const InnerContainerByStudentNum = styled.div`
  max-width: 1400px;
  width: 100%;
  height: 270px;
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

const InputContainer = styled.form`
  display: flex;
  height: 60px;
  width: 540px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-bottom: 15px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    height: 40px;
  }

  ${({ theme }) => theme.media.tablet} {
    margin-right: 5px;
  }
  ${({ theme }) => theme.media.desktop} {
    margin-right: 15px;
  }
`;

const StudentNumInput = styled.input.attrs({
  type: 'form',
  required: true,
})`
  all: unset;
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
  width: 540px;
  padding: 0 10px;
`;

const PasswordInput = styled.input.attrs({
  type: 'password',
  required: true,
  maxLength: 20
})`
  all: unset;
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
  width: 640px;
  padding: 0 10px;
`;

const WarningDiv = styled.div`
  color: ${({ theme }) => theme.colors.red};
  margin-bottom: 15px;
`;

const PhoneNumInput = styled.input.attrs({
  type: 'phoneNum',
  required: true,
})`
  all: unset;
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
  width: 640px;
  padding: 0 10px;
`;

const VerifyStduentButton = styled.button`
  all: unset;
  width: 100px;
  height: 80%;
  background-color: ${(props) =>
    props.value === 'active'
      ? ({ theme }) => theme.colors.secondary
      : ({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: ${(props) => (props.value === 'active' ? 'pointer' : 'default')};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
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

const CodeButton = styled.button`
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

const SendButton = styled.button`
  all: unset;
  width: 200px;
  height: 80%;
  background-color: ${(props) =>
    props.value === 'active'
      ? ({ theme }) => theme.colors.secondary
      : ({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: ${(props) => (props.value === 'active' ? 'pointer' : 'default')};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const SignUpButton = styled.button`
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
  cursor: ${(props) => (props.value === 'active' ? 'pointer' : 'default')};
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

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
  font-size: ${({ theme }) => theme.fonts.size.xs};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};

  span:first-child {
    margin-bottom: 5px;
    color: ${({ theme }) => theme.colors.gray400};
  }
  span:last-child {
    color: ${({ theme }) => theme.colors.gray200};
  }
`;

function SignUp(): JSX.Element {
  const [studentNum, setStudentNum] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [major, setMajor] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [code, setCode] = useState('');
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [isVerifiedActive, setIsVerifiedActive] = useState(false);
  const [isVerifiedStudentNum, setIsVerifiedStudentNum] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isCodeActive, setIsCodeActive] = useState(false);

  const validateStudentNum = (studentNum: string) => {
    const regex = /^[0-9]{8}$/;
    return regex.test(studentNum);
  };

  const handleSignUp = useCallback(() => {
    // TODO: validation
    console.log(studentNum, password, major, phoneNum);
  }, [studentNum, password, passwordConfirm, major, phoneNum]);

  const handleVerifyStudent = useCallback(
    (e: any) => {
      e.preventDefault();
      console.log(studentNum);
      setIsVerifiedStudentNum(true);
    },
    [studentNum],
  );

  const hadleSelectMajor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setMajor(value);
  };

  const handleCodeCheck = useCallback(
    (e: any) => {
      e.preventDefault();
      console.log('code check');
      setIsVerified(true);
    },
    [code],
  );

  const handleCodeSend = useCallback(
    (e: any) => {
      e.preventDefault();
      console.log('code send');
      setIsCodeActive(true);
    },
    [code],
  );

  useEffect(() => {
    if (
      studentNum &&
      password &&
      passwordConfirm &&
      isPassword &&
      isPasswordConfirm &&
      major &&
      phoneNum &&
      isVerifiedStudentNum &&
      isVerified
    ) {
      setIsSignUpActive(true);
    } else {
      setIsSignUpActive(false);
    }
  }, [
    studentNum,
    password,
    passwordConfirm,
    isPassword,
    isPasswordConfirm,
    major,
    phoneNum,
    isVerifiedStudentNum,
    isVerified,
  ]);

  useEffect(() => {
    if (phoneNum.length === 10) {
      setPhoneNum(phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (phoneNum.length === 13) {
      setPhoneNum(
        phoneNum.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      );
    }
  }, [phoneNum]);

  useEffect(() => {
    if (validateStudentNum(studentNum)) {
      setIsVerifiedActive(true);
    } else {
      setIsVerifiedActive(false);
    }
  }, [studentNum]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8}$/;

    

    if (password === '' || passwordRegex.test(password)) {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
  }, [password]);

  // 비밀번호 같은지 검사
  useEffect(() => {
    if (passwordConfirm === '' || password === passwordConfirm) {
      setIsPasswordConfirm(true);
    } else {
      setIsPasswordConfirm(false);
    }
  }, [password, passwordConfirm]);


  if (!isVerifiedStudentNum) {
    return (
      <Wrapper>
        <Header>
          단국대학교 총학생회 <HeaderPoint>회원가입</HeaderPoint>
        </Header>
        <InnerContainerByStudentNum>
          <InputContainer>
            <StudentNumInput
              placeholder="학번(ID) 입력"
              value={studentNum}
              onChange={(e) => setStudentNum(e.currentTarget.value)}
            />
            <VerifyStduentButton
              value={isVerifiedActive ? 'active' : 'inactive'}
              disabled={!isVerifiedActive}
              onClick={handleVerifyStudent}
            >
              인증
            </VerifyStduentButton>
          </InputContainer>
        </InnerContainerByStudentNum>
        <Detail>
          <span>
            경기도 용인시 수지구 죽전동 1491 단국대학교 혜당관 406호 총학생회실
          </span>
          <span>COPYRIGHT(C)2022 DANKOOK UNIVERSITY ALL RIGHTS RESERVERD</span>
        </Detail>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header>
        단국대학교 총학생회 <HeaderPoint>회원가입</HeaderPoint>
      </Header>
      <InnerContainer>
        <InputContainer>
          <div>{studentNum}@dankook.ac.kr</div>
        </InputContainer>
        <InputContainer>
          <PasswordInput
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </InputContainer>
        {!isPassword ? (
          <WarningDiv>
            비밀번호 형식: 숫자, 영문자, 특수문자 조합으로 8자리 이상
          </WarningDiv>
        ) : null}
        <InputContainer>
          <PasswordInput
            placeholder="비밀번호 재입력"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.currentTarget.value)}
          />
        </InputContainer>
        {!isPasswordConfirm ? (
          <WarningDiv>비밀번호가 일치하지 않습니다.</WarningDiv>
        ) : null}
        <InputContainer>
          <Select name="major" value={major} onChange={hadleSelectMajor}>
            <option value="" disabled selected>
              학과 선택
            </option>
            {Object.entries(majorList).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </Select>
        </InputContainer>
        <InputContainer>
          <PhoneNumInput
            placeholder="휴대폰 번호 입력"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.currentTarget.value)}
          />
          {isCodeActive && (
            <SendButton
              value={phoneNum.length > 10 ? 'active' : 'inactive'}
              onClick={handleCodeSend}
              disabled={phoneNum.length > 10}
            >
              인증번호 발송
            </SendButton>
          )}
          {!isCodeActive && (
            <SendButton
              value={phoneNum.length > 10 ? 'active' : 'inactive'}
              onClick={handleCodeSend}
            >
              인증번호 발송
            </SendButton>
          )}
        </InputContainer>
        <span>
          명확히 표기하지않을 시, 향후 이벤트 당첨시 불이익이 있을 수 있습니다.
        </span>

        {isCodeActive && !isSignUpActive && (
          <InputContainer>
            <CodeInput
              placeholder="인증번호 입력"
              value={code}
              onChange={(e) => setCode(e.currentTarget.value)}
            />
            <CodeButton onClick={handleCodeCheck}>확인</CodeButton>
          </InputContainer>
        )}
        {isSignUpActive && <span>휴대폰 인증이 완료되었습니다.</span>}
        <SignUpButton
          disabled={!isSignUpActive}
          value={isSignUpActive ? 'active' : 'inactive'}
          onClick={handleSignUp}
        >
          가입하기
        </SignUpButton>
      </InnerContainer>
      <Detail>
        <span>
          경기도 용인시 수지구 죽전동 1491 단국대학교 혜당관 406호 총학생회실
        </span>
        <span>COPYRIGHT(C)2022 DANKOOK UNIVERSITY ALL RIGHTS RESERVERD</span>
      </Detail>
    </Wrapper>
  );
}

export default SignUp;
