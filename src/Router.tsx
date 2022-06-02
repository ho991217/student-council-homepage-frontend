import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from 'components/global/footer/Footer';
import Greeting from 'pages/council-info/Greeting';
import Home from 'pages/Home';
import Organization from 'pages/council-info/Organization';
import Rules from 'pages/Rules';
import Conference from 'pages/Conference';
import PetitionBoard from 'pages/communication/PetitionBoard';
import InquiryBoard from 'pages/communication/InquiryBoard';
import Location from 'pages/council-info/Location';
import Gnb from './components/global/nav/Gnb';

function Router() {
  return (
    <BrowserRouter>
      <Gnb />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/greeting" element={<Greeting />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="location" element={<Location />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/conference" element={<Conference />} />
        <Route path="/board-petition" element={<PetitionBoard />} />
        <Route path="/board-inquiry" element={<InquiryBoard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
