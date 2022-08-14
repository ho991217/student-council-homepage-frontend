import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
