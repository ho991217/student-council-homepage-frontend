import { useLogin } from 'hooks/UseLogin';
import { ReactComponentElement } from 'react';
import { Navigate } from 'react-router-dom';

function AuthRoute(Component: any) {
  const { isLogin } = useLogin();

  return isLogin() ? <Component /> : <Navigate to="/login" />;
}

export default AuthRoute;
