import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from 'components/global/footer/Footer';
import Greeting from 'pages/council-info/Greeting';
import Home from 'pages/Home';
import Organization from 'pages/council-info/Organization';
import Gnb from './components/global/nav/Gnb';

function Router() {
  return (
    <BrowserRouter>
      <Gnb />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/greeting" element={<Greeting />} />
        <Route path="/organization" element={<Organization />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
