import Home from 'pages/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Gnb from './components/nav/Gnb';

function Router() {
  return (
    <BrowserRouter>
      <Gnb />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
