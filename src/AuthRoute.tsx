import { useLogin } from 'hooks/UseLogin';
import { Navigate } from 'react-router-dom';

function AuthRoute({ children }: { children: JSX.Element }) {
  const { isLogin } = useLogin();

  return isLogin() ? children : <div>로그인해주세요</div>;
}

export default AuthRoute;
