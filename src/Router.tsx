import Footer from 'components/global/footer/Footer';
import Hello from 'pages/hello/Hello';
import Home from 'pages/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Gnb from './components/global/nav/Gnb';

function Router() {
  return (
    <BrowserRouter>
      <Gnb />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hello" element={<Hello />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
