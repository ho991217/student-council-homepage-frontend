import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { RecoilRoot } from 'recoil';
import App from './App';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.withCredentials = true;

ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById('root'),
);
