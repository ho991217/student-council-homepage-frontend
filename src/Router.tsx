import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import Home from 'pages/home/Home';
import Greeting from 'pages/council-info/Greeting';
import Organization from 'pages/council-info/Organization';
import Location from 'pages/council-info/location/Location';
import Rules from 'pages/rules/Rules';
import RulesPost from 'pages/rules/components/post/Post';
import Conference from 'pages/conference/Conference';
import InquiryBoard from 'pages/communication/InquiryBoard';
import Login from 'pages/Login';
import SignUp from 'pages/sign-up/SignUp';
import Password from 'pages/password/Password';
import Pledge from 'pages/council/Pledge';
// import Editor from 'pages/communication/Editor';
import ConferenceEditor from 'pages/conference/components/ConferenceEditor';
import RuleEditor from 'pages/rules/components/RuleEditor';
import NewsEditor from 'pages/council/news/components/NewsEditor';
import PetitionBoard from 'pages/communication/petition/components/PetitionBoard';
import PetitionPost from 'pages/communication/petition/components/post/Post';
import PetitionEditor from 'pages/communication/petition/components/Editor';
import News from 'pages/council/news/News';
import Admin from 'pages/Admin';
import SuggestionBoard from 'pages/communication/suggestion/SuggestionBoard';
import SuggestionPost from 'pages/communication/suggestion/components/post/Post';
import SuggestionEditor from 'pages/communication/suggestion/Editor';

import NotFound from 'pages/NotFound';
import NewsPost from 'pages/council/news/components/post/Post';
import GlobalBanner from 'components/banner/GlobalBanner';
import Gnb from 'components/nav/Gnb';
import Footer from 'components/footer/Footer';
import Makers from 'components/footer/sub-routes/Makers';
import Term from 'components/footer/sub-routes/Term';
import PrivacyPolicy from 'components/footer/sub-routes/PrivacyPolicy';
import { LoginStateAtom } from 'atoms/LoginState';
import Success from 'pages/sign-up/components/Succes';
import PasswordSuccess from 'pages/password/components/Succes';
import Event from 'pages/event/Event';

function Router() {
  const [{ isLoggedIn, admin }, setLoginState] = useRecoilState(LoginStateAtom);
  const [cookies] = useCookies(['X-AUTH-TOKEN', 'isAdmin']);
  useEffect(() => {
    setLoginState({
      isLoggedIn: !!cookies['X-AUTH-TOKEN'],
      admin: cookies.isAdmin === 'true',
    });
  }, []);
  if (isLoggedIn === undefined) return <div>로딩중...</div>;
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
          path="/password"
          element={
            <>
              <GlobalBanner
                title="비밀번호찾기"
                detail="비밀번호찾기 입니다."
              />
              <Password />
            </>
          }
        />
        <Route path="/sign-up/success" element={<Success />} />
        <Route path="/password/success" element={<PasswordSuccess />} />
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
              <NewsPost />
            </>
          }
        />
        <Route
          path="/news/editor"
          element={
            isLoggedIn ? (
              <>
                <GlobalBanner
                  title="총학소식 작성"
                  detail="총학소식 작성 입니다."
                />
                <NewsEditor />
              </>
            ) : (
              <Navigate to="/" />
            )
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
                <RulesPost />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/rule/editor"
          element={
            isLoggedIn ? (
              <>
                <GlobalBanner title="회칙작성" detail="회칙작성 입니다." />
                <RuleEditor />
              </>
            ) : (
              <Navigate to="/" />
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
          path="/conference/editor"
          element={
            isLoggedIn ? (
              <>
                <GlobalBanner title="회의록작성" detail="회의록작성 입니다." />
                <ConferenceEditor />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/editor"
          element={
            isLoggedIn ? (
              <GlobalBanner title="청원게시판" detail="청원게시판 입니다." />
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
                  <PetitionPost />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="editor"
            element={
              isLoggedIn ? (
                <>
                  <GlobalBanner
                    title="청원게시판"
                    detail="청원게시판 입니다."
                  />
                  <PetitionEditor />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Route>
        <Route path="/board-suggestion">
          <Route path="/board-suggestion" element={<NotFound />} />
          <Route
            path="boards"
            element={
              isLoggedIn ? (
                <>
                  <GlobalBanner
                    title="자유게시판"
                    detail="자유게시판 입니다."
                  />
                  <SuggestionBoard />
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
                    title="자유게시판"
                    detail="자유게시판 입니다."
                  />
                  <SuggestionPost />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="editor"
            element={
              isLoggedIn ? (
                <>
                  <GlobalBanner
                    title="자유게시판"
                    detail="자유게시판 입니다."
                  />
                  <SuggestionEditor />
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
              <GlobalBanner title="소통 창구" detail="소통 창구 입니다." />
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
        <Route path="/event" element={<Event />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
