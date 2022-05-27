import Home from 'pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserMenu from './components/nav/UserMenu';
import Gnb from './components/nav/Gnb';

function Router() {
  return (
    <BrowserRouter>
      <UserMenu />
      <Gnb />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
