import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from 'pages/home/Home';
import Greeting from 'pages/council-info/Greeting';
import Organization from 'pages/council-info/Organization';
import Location from 'pages/council-info/location/Location';
import Rules from 'pages/rules/Rules';
import Conference from 'pages/conference/Conference';
import InquiryBoard from 'pages/communication/InquiryBoard';
import Login from 'pages/Login';
import SignUp from 'pages/sign-up/SignUp';
import Password from 'pages/password/Password';
import Pledge from 'pages/council/Pledge';
import ConferenceEditor from 'pages/conference/components/ConferenceEditor';
import NewsEditor from 'pages/council/news/components/NewsEditor';
import PetitionBoard from 'pages/communication/petition/components/PetitionBoard';
import PetitionPost from 'pages/communication/petition/components/Post';
import PetitionEditor from 'pages/communication/petition/components/Editor';
import News from 'pages/council/news/News';
import SuggestionBoard from 'pages/communication/suggestion/SuggestionBoard';
import SuggestionPost from 'pages/communication/suggestion/components/post/Post';
import SuggestionEditor from 'pages/communication/suggestion/SuggestionEditor';
import NotFound from 'pages/NotFound';
import GlobalBanner from 'components/banner/GlobalBanner';
import Gnb from 'components/nav/Gnb';
import Footer from 'components/footer/Footer';
import Makers from 'components/footer/sub-routes/Makers';
import Term from 'components/footer/sub-routes/Term';
import PrivacyPolicy from 'components/footer/sub-routes/PrivacyPolicy';
import Success from 'pages/sign-up/components/Succes';
import PasswordSuccess from 'pages/password/components/Succes';
import Agreements from 'pages/sign-up/components/agreements/Agreements';
import StudentIdValidation from 'pages/sign-up/components/verification/StudentIdValidation';
import InputStudentInfos from 'pages/sign-up/components/info/InputStudentInfos';
import QnA from 'pages/voc/qna/QnA';
import MyVoice from 'pages/voc/my-voice/MyVoice';
import QnAEditor from 'pages/voc/qna/QnAEditor';
import QnADetail from 'pages/voc/qna/QnADetail';
import MyVoiceDetail from 'pages/voc/my-voice/MyVoiceDetail';
import RentalLists from 'pages/rental/RentalLists';
import RentalInfo from 'pages/rental/RentalInfo';
import RentalNew from 'pages/rental/RentalNew';
import Post from 'pages/council/news/components/post/Post';

import { useLogin } from 'hooks/UseLogin';
import AuthRoute from 'AuthRoute';
import Admin from 'pages/Admin';
import RuleEditor from 'pages/rules/components/RuleEditor';
import RulePost from 'pages/rules/components/post/Post';

function Router() {
  const { isLogin, isAdmin } = useLogin();

  return (
    <BrowserRouter>
      <Gnb />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isLogin() ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/sign-up" element={<GlobalBanner title="회원가입" />}>
          <Route path="" element={<SignUp />}>
            <Route path="agreements" element={<Agreements />} />
            <Route path="verification" element={<StudentIdValidation />} />
            <Route path="info" element={<InputStudentInfos />} />
            <Route path="success" element={<Success />} />
          </Route>
        </Route>
        <Route path="/password" element={<GlobalBanner title="비밀번호찾기" />}>
          <Route index element={<Password />} />
          <Route path="success" element={<PasswordSuccess />} />
        </Route>
        <Route
          path="/greeting"
          element={
            <>
              <GlobalBanner title="인사말" />
              <Greeting />
            </>
          }
        />
        <Route
          path="/organization"
          element={
            <>
              <GlobalBanner title="조직도" />
              <Organization />
            </>
          }
        />
        <Route
          path="/location"
          element={
            <>
              <GlobalBanner title="오시는길" />
              <Location />
            </>
          }
        />
        <Route
          path="/pledge"
          element={
            <>
              <GlobalBanner title="공약" />
              <Pledge />
            </>
          }
        />
        <Route path="/council-news" element={<GlobalBanner title="총학소식" />}>
          <Route index element={<News />} />
          <Route path="post" element={<Post />} />
          <Route
            path="editor"
            element={
              <AuthRoute>
                <NewsEditor />
              </AuthRoute>
            }
          />
        </Route>
        <Route
          path="/rules"
          element={
            <AuthRoute>
              <GlobalBanner title="회칙" />
            </AuthRoute>
          }
        >
          <Route path="" element={<Rules />} />
          <Route path="editor" element={<RuleEditor />} />
          <Route path="detail" element={<RulePost />} />
        </Route>

        <Route
          path="/conference"
          element={
            <AuthRoute>
              <GlobalBanner title="회의록" />
            </AuthRoute>
          }
        >
          <Route index element={<Conference />} />
          <Route path="editor" element={<ConferenceEditor />} />
        </Route>

        <Route
          path="/board-petition"
          element={
            <AuthRoute>
              <GlobalBanner title="청원게시판" />
            </AuthRoute>
          }
        >
          <Route path="boards" element={<PetitionBoard />} />
          <Route path="board" element={<PetitionPost />} />
          <Route path="editor" element={<PetitionEditor />} />
        </Route>

        <Route
          path="/board-suggestion"
          element={
            <AuthRoute>
              <GlobalBanner title="자유게시판" />
            </AuthRoute>
          }
        >
          <Route path="boards" element={<SuggestionBoard />} />
          <Route path="board" element={<SuggestionPost />} />
          <Route path="editor" element={<SuggestionEditor />} />
        </Route>
        <Route
          path="/board-inquiry"
          element={
            <>
              <GlobalBanner title="소통 창구" />
              <InquiryBoard />
            </>
          }
        />
        <Route path="/who-made-this" element={<Makers />} />
        <Route path="/term" element={<Term />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/admin"
          element={isAdmin() ? <Admin /> : <Navigate to="/" />}
        />
        <Route path="/rental" element={<GlobalBanner title="대여물품" />}>
          <Route index element={<Navigate to="/rental/lists?page=1" />} />
          <Route path="lists" element={<RentalLists />} />
          <Route path="info" element={<RentalInfo />} />
          <Route path="new" element={<RentalNew />} />
        </Route>
        <Route path="/voc">
          <Route path="qna">
            <Route path="boards" element={<QnA />} />
            <Route path="board" element={<QnADetail />} />
            <Route path="editor" element={<QnAEditor />} />
          </Route>
          <Route path="my-voice">
            <Route path="boards" element={<MyVoice />} />
            <Route path="board" element={<MyVoiceDetail />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
