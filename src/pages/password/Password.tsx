import InputNewPassword from 'pages/password/components/InputNewPassword';
import StudentIdValidation from 'pages/sign-up/components/verification/StudentIdValidation';
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

  return <div />;
}

export default Password;
