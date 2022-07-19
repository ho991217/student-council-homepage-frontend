import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Greeting from 'pages/council-info/Greeting';
import Home from 'pages/Home';
import Organization from 'pages/council-info/Organization';
import Rules from 'pages/Rules';
import Conference from 'pages/Conference';
import PetitionBoard from 'pages/communication/PetitionBoard';
import InquiryBoard from 'pages/communication/InquiryBoard';
import Location from 'pages/council-info/Location';
import Login from 'pages/Login';
import Pledge from 'pages/council-info/Pledge';
import Editor from 'pages/communication/Editor';

import GlobalBanner from 'components/global/banner/GlobalBanner';
import Post from 'components/boards/post/Post';
import Gnb from 'components/global/nav/Gnb';
import Footer from 'components/global/footer/Footer';
import Makers from 'components/global/footer/sub-routes/Makers';
import NotFound from 'pages/NotFound';

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
        <Route path="/editor" element={<Editor />} />

        <Route
          path="/conference"
          element={
            <>
              <GlobalBanner title="회의록" detail="회의록 입니다." />
              <Conference />
            </>
          }
        />
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
        <Route path="/who-made-this" element={<Makers />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
