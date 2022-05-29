// 스타일링 관련 import
import { GlobalStyles } from 'styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/Theme';

// 라우팅 관련 import
import Router from './Router';

import Footer from "./components/footer/Footer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
