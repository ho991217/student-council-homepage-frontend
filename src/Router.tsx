import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import Home from 'pages/Home';
import Greeting from 'pages/council-info/Greeting';
import Organization from 'pages/council-info/Organization';
import Location from 'pages/council-info/Location';
import Rules from 'pages/Rules';
import DetailRules from 'components/rules/detail/Detail';
import Conference from 'pages/Conference';
import PetitionBoard from 'pages/communication/PetitionBoard';
import InquiryBoard from 'pages/communication/InquiryBoard';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Pledge from 'pages/council/Pledge';
import Editor from 'pages/communication/Editor';
import News from 'pages/council/News';
import Admin from 'pages/Admin';

import NotFound from 'pages/NotFound';
import DetailNews from 'components/news/detail/Detail';
import GlobalBanner from 'components/global/banner/GlobalBanner';
import Post from 'components/boards/post/Post';
import Gnb from 'components/global/nav/Gnb';
import Footer from 'components/global/footer/Footer';
import Makers from 'components/global/footer/sub-routes/Makers';
import Term from 'components/global/footer/sub-routes/Term';
import PrivacyPolicy from 'components/global/footer/sub-routes/PrivacyPolicy';
import { LoginStateAtom } from 'atoms/LoginState';
import Success from 'components/sign-up/Succes';

function Router() {
  const [{ isLoggedIn, admin }, setLoginState] = useRecoilState(LoginStateAtom);
  const [cookies] = useCookies(['X-AUTH-TOKEN', 'isAdmin']);
  useEffect(() => {
    setLoginState({
      isLoggedIn: !!cookies['X-AUTH-TOKEN'],
      admin: cookies.isAdmin === 'true',
    });
  }, []);

  return (
    <BrowserRouter>
      <Gnb />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/sign-up"
          element={
            <>
              <GlobalBanner title="회원가입" detail="회원가입 입니다." />
              <SignUp />
            </>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <GlobalBanner title="회원가입" detail="회원가입 입니다." />
              <SignUp />
            </>
          }
        />
        <Route path="/sign-up/success" element={<Success />} />
        <Route path="/greeting" element={<Greeting />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/location" element={<Location />} />
        <Route path="/pledge" element={<Pledge />} />
        <Route
          path="/council-news"
          element={
            <>
              <GlobalBanner title="총학소식" detail="총학소식 입니다." />
              <News />
            </>
          }
        />
        <Route
          path="/news"
          element={
            <>
              <GlobalBanner title="총학소식" detail="총학소식 입니다." />
              <DetailNews />
            </>
          }
        />
        <Route
          path="/rules"
          element={isLoggedIn ? <Rules /> : <Navigate to="/login" />}
        />
        <Route
          path="/rule"
          element={
            isLoggedIn ? (
              <>
                <GlobalBanner
                  title="회칙 및 세칙"
                  detail="회칙 및 세칙 입니다."
                />
                <DetailRules />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/conference"
          element={
            isLoggedIn ? (
              <>
                <GlobalBanner title="회의록" detail="회의록 입니다." />
                <Conference />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/editor"
          element={
            isLoggedIn ? (
              <>
                <GlobalBanner title="청원게시판" detail="청원게시판 입니다." />
                <Editor />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/board-petition">
          <Route path="/board-petition" element={<NotFound />} />
          <Route
            path="boards"
            element={
              isLoggedIn ? (
                <>
                  <GlobalBanner
                    title="청원게시판"
                    detail="청원게시판 입니다."
                  />
                  <PetitionBoard />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="board"
            element={
              isLoggedIn ? (
                <>
                  <GlobalBanner
                    title="청원게시판"
                    detail="청원게시판 입니다."
                  />
                  <Post />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Route>
        <Route
          path="/board-inquiry"
          element={
            <>
              <GlobalBanner title="문의게시판" detail="문의게시판 입니다." />
              <InquiryBoard />
            </>
          }
        />
        <Route path="/who-made-this" element={<Makers />} />
        <Route path="/term" element={<Term />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/admin"
          element={admin ? <Admin /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
