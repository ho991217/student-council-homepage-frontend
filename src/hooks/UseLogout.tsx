import { useCookies } from 'react-cookie';

export const useLogOut = () => {
  const [, , removeCookie] = useCookies(['X-AUTH-TOKEN']);
  const logOut = () => {
    removeCookie('X-AUTH-TOKEN');
  };
  return { logOut };
};
