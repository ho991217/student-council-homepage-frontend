import { userInfo } from 'atoms/UserInfo';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useRecoilState } from 'recoil';

/**
 *
 * @returns {object} user
 * @returns {function} setLogin
 * @returns {function} setAuthHeader
 * @returns {function} setLogout
 * @returns {function} setRefreshToken
 */
export const useLogin = () => {
  const cookies = new Cookies();
  const [user, setUser] = useRecoilState(userInfo);

  const setAuthHeader = (accessToken: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  const setLogin = async (studentId: string, password: string) => {
    try {
      const { data } = await axios({
        method: 'post',
        url: '/user/login',
        data: {
          studentId,
          password,
        },
      });

      const { accessToken, refreshToken } = data;
      cookies.set('access-token', accessToken);
      cookies.set('refresh-token', refreshToken);
      setAuthHeader(accessToken);
      // setUser(user);
      setUser(await getUserInfo());

      return { successful: true, message: '' };
    } catch (e) {
      const { response } = e as any;
      return { successful: false, message: response.data.message[0] };
    }
  };

  const setLogout = () => {
    cookies.remove('access-token');
    cookies.remove('refresh-token');
    setUser({
      username: '',
      nickname: '',
      studentId: '',
      major: '',
      department: '',
      admin: false,
    });
  };

  const isLogin = () => {
    return user.studentId.length !== 0;
  };

  const isAdmin = () => {
    return user.admin;
  };

  // eslint-disable-next-line consistent-return
  const reissueAccessToken = async () => {
    const refreshToken = cookies.get('refresh-token');

    if (!refreshToken) {
      return null;
    }

    const { data } = await axios({
      method: 'post',
      url: '/user/reissue',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      data: {
        refreshToken,
      },
    });

    cookies.set('access-token', data.accessToken);
    setAuthHeader(data.accessToken);
  };

  const getAccessToken = () => {
    const accessToken = cookies.get('access-token');

    if (!accessToken) {
      return null;
    }

    return accessToken;
  };

  const getUserInfo = async () => {
    const accessToken = cookies.get('access-token');

    if (!accessToken) {
      return null;
    }

    try {
      const { data } = await axios({
        method: 'get',
        url: '/user',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setAuthHeader(accessToken);

      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return {
    setLogin,
    setLogout,
    isLogin,
    isAdmin,
    getAccessToken,
    reissueAccessToken,
    getUserInfo,
  };
};
