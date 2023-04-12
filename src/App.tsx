import { useEffect } from 'react';
// 스타일링 관련 import

import { GlobalStyles } from 'styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/Theme';

import { useSetRecoilState } from 'recoil';
import { userInfo } from 'atoms/UserInfo';
import { useLogin } from 'hooks/UseLogin';

// 라우팅 관련 import
import Router from './Router';

function App() {
  const setUser = useSetRecoilState(userInfo);
  const { getAccessToken, getUserInfo } = useLogin();

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      getUserInfo().then((user) => {
        setUser(user);
      });
    }
  }, []);

  /**  모바일 브라우저 전체화면 resize 대응 */
  const setVh = () => {
    document.documentElement.style.setProperty(
      '--vh',
      `${window.innerHeight}px`,
    );
  };

  useEffect(() => {
    window.addEventListener('resize', setVh);
    setVh();
    return () => {
      document.documentElement.style.removeProperty('--vh');
      window.removeEventListener('resize', setVh);
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
}

export default App;
