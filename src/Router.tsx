import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Greeting from 'pages/council-info/Greeting';
import Home from 'pages/Home';
import Organization from 'pages/council-info/Organization';
import Rules from 'pages/Rules';
import Conference from 'pages/Conference';
import PetitionBoard from 'pages/communication/PetitionBoard';
import InquiryBoard from 'pages/communication/InquiryBoard';
import Location from 'pages/council-info/Location';
import Pledge from 'pages/council-info/pledge';

import GlobalBanner from 'components/global/banner/GlobalBanner';
import Post from 'components/boards/post/Post';
import Gnb from 'components/global/nav/Gnb';
import Footer from 'components/global/footer/Footer';
import Login from 'pages/Login';

function Router() {
  return (
    <BrowserRouter>
      <Gnb />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/greeting" element={<Greeting />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/location" element={<Location />} />
        <Route path="/pledge" element={<Pledge />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/conference" element={<Conference />} />
        <Route path="/board-petition">
          <Route
            path="boards"
            element={
              <>
                <GlobalBanner title="청원게시판" detail="청원게시판 입니다." />
                <PetitionBoard />
              </>
            }
          />
          <Route
            path="board"
            element={
              <>
                <GlobalBanner title="청원게시판" detail="청원게시판 입니다." />
                <Post />
              </>
            }
          />
        </Route>
        <Route path="/board-inquiry">
          <Route
            path="boards/:page"
            element={
              <>
                <GlobalBanner title="문의게시판" detail="문의게시판 입니다." />
                <InquiryBoard />
              </>
            }
          />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
