import InputNewPassword from 'pages/password/components/InputNewPassword';
import StudentIdValidation from 'pages/sign-up/components/StudentIdValidation';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Password() {
  const [emailVerificationToken, setEmailVerificationToken] = useState<
    string | null
  >(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setEmailVerificationToken(searchParams.get('token'));
  }, []);

  return emailVerificationToken ? (
    <InputNewPassword
      studentId={searchParams.get('id')}
      token={emailVerificationToken}
    />
  ) : (
    <StudentIdValidation type="비밀번호 찾기" />
  );
}

export default Password;
