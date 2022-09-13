import InputStudentInfos from 'components/sign-up/InputStudentInfos';
import StudentIdValidation from 'components/sign-up/StudentIdValidation';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function SignUp() {
  const [emailVerificationToken, setEmailVerificationToken] = useState<
    string | null
  >(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setEmailVerificationToken(searchParams.get('token'));
  }, []);

  return emailVerificationToken ? (
    <InputStudentInfos
      studentId={searchParams.get('id')}
      token={emailVerificationToken}
    />
  ) : (
    <StudentIdValidation type="회원가입" />
  );
}

export default SignUp;
