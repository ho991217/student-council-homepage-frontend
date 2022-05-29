import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from 'components/global/footer/Footer';
import Hello from 'pages/council-info/Hello';
import Home from 'pages/home/Home';
import Organization from 'pages/council-info/Organization';
import Gnb from './components/global/nav/Gnb';


function Router() {
  return (
    <BrowserRouter>
      <Gnb />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/organization" element={<Organization />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
