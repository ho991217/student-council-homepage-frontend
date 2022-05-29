// 스타일링 관련 import
import { GlobalStyles } from 'styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/Theme';

// 라우팅 관련 import
import Router from './Router';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
}

export default App;
