import { useLogin } from 'hooks/UseLogin';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthRoute({ children }: { children: JSX.Element }) {
  const { isLogin } = useLogin();
  const navigate = useNavigate();
  useEffect(()=>{
    navigate('/login')
  },[])

  return isLogin() ? children : <div>로그인해주세요</div>;
}

export default AuthRoute;
