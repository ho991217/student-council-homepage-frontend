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
import GlobalBanner from 'components/global/banner/GlobalBanner';
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
        <Route
          path="/board-petition"
          element={
            <>
              <GlobalBanner title="청원게시판" detail="청원게시판 입니다." />
              <PetitionBoard />
            </>
          }
        />
        <Route
          path="/board-inquiry"
          element={
            <>
              <GlobalBanner title="문의게시판" detail="문의게시판 입니다." />
              <InquiryBoard />
            </>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
