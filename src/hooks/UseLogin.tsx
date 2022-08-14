import { useCookies } from 'react-cookie';

export const useLogin = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['X-AUTH-TOKEN']);
  const isLoggedIn = !!cookies['X-AUTH-TOKEN'];
  const logOut = () => {
    removeCookie('X-AUTH-TOKEN');
  };
  return { isLoggedIn, logOut };
};
