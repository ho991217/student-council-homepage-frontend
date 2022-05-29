import Footer from 'components/global/footer/Footer';
import Home from 'pages/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Gnb from './components/global/nav/Gnb';

function Router() {
  return (
    <BrowserRouter>
      <Gnb />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
