import { useLogin } from 'hooks/UseLogin';
import { Navigate } from 'react-router-dom';

function AuthRoute({ children }: { children: JSX.Element }) {
  const { isLogin } = useLogin();

  return isLogin() ? children : <Navigate to="/login" />;
}

export default AuthRoute;
