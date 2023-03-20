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
import ConferenceEditor from 'pages/conference/components/ConferenceEditor';
import RuleEditor from 'pages/rules/components/RuleEditor';
import NewsEditor from 'pages/council/news/components/NewsEditor';
import PetitionBoard from 'pages/communication/petition/components/PetitionBoard';
import PetitionPost from 'pages/communication/petition/components/Post';
import PetitionEditor from 'pages/communication/petition/components/Editor';
import News from 'pages/council/news/News';
import Admin from 'pages/Admin';
import SuggestionBoard from 'pages/communication/suggestion/SuggestionBoard';
import SuggestionPost from 'pages/communication/suggestion/components/post/Post';
import SuggestionEditor from 'pages/communication/suggestion/SuggestionEditor';

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
import Agreements from 'pages/sign-up/components/agreements/Agreements';
import Header from 'pages/sign-up/components/Header';
import StudentIdValidation from 'pages/sign-up/components/verification/StudentIdValidation';
import InputStudentInfos from 'pages/sign-up/components/info/InputStudentInfos';
import RentalLists from 'pages/rental/RentalLists';
import RentalInfo from 'pages/rental/RentalInfo';
import RentalNew from 'pages/rental/RentalNew';

function Router() {
  const [{ isLoggedIn }, setLoginState] = useRecoilState(LoginStateAtom);
  const [cookies] = useCookies(['X-AUTH-TOKEN', 'isAdmin']);
  useEffect(() => {
    setLoginState({
      isLoggedIn: !!cookies['X-AUTH-TOKEN'],
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
              <GlobalBanner title="회원가입" detail="" />
              <SignUp />
            </>
          }
        >
          <Route path="agreements" element={<Agreements />} />
          <Route path="verification" element={<StudentIdValidation />} />
          <Route path="info" element={<InputStudentInfos />} />
          <Route path="success" element={<Success />} />
        </Route>
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
        <Route
          path="/greeting"
          element={
            <>
              <GlobalBanner
                title="인사말"
                detail="안녕하세요 제 55대 담다 총학생회입니다."
              />
              <Greeting />
            </>
          }
        />
        <Route
          path="/organization"
          element={
            <>
              <GlobalBanner
                title="조직도"
                detail="제 55대 담다 총학생회 조직도입니다."
              />
              <Organization />
            </>
          }
        />
        <Route
          path="/location"
          element={
            <>
              <GlobalBanner
                title="오시는길"
                detail="총학생회실로 오시는 길입니다."
              />
              <Location />
            </>
          }
        />
        <Route
          path="/pledge"
          element={
            <>
              <GlobalBanner
                title="공약"
                detail="제 55대 총학생회 담다 공약입니다."
              />
              <Pledge />
            </>
          }
        />
        <Route
          path="/council-news"
          element={
            <>
              <GlobalBanner title="총학소식" detail="" />
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
          path="/conference"
          element={
            isLoggedIn ? (
              <>
                <GlobalBanner title="회의록" detail="" />
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
              <GlobalBanner title="청원게시판" detail="" />
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
                  <GlobalBanner title="청원게시판" detail="" />
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
                  <GlobalBanner title="청원게시판" detail="" />
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
                  <GlobalBanner title="청원게시판" detail="" />
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
                  <GlobalBanner title="자유게시판" detail="" />
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
                  <GlobalBanner title="자유게시판" detail="" />
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
                  <GlobalBanner title="자유게시판" detail="" />
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
        <Route path="/admin" element={<Navigate to="/" />} />
        <Route path="/event" element={<Event />} />
        <Route path="/rental">
          <Route path="lists" element={<RentalLists />} />
          <Route path="lists/:id" element={<RentalInfo />} />
          <Route path="new" element={<RentalNew />} />
        </Route>
        <Route path="/voc">
          <Route path="qna">
            <Route path="boards" element={<div>qna</div>} />
            <Route path="board" element={<div>qna-detail</div>} />
            <Route path="editor" element={<div>qna-editor</div>} />
          </Route>
          <Route path="my-voice">
            <Route path="boards" element={<div>my-voice</div>} />
            <Route path="board" element={<div>my-voice-board</div>} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
