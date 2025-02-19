import React from 'react';
import { createRoot } from 'react-dom/client';

import { ConfigProvider } from './context/ConfigContext';
//import {GetToken} from './context/Auth/GetToken';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
 import axios from 'axios';
//const token = GetToken();
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.headers.post['Accept'] = 'application/json';
//axios.defaults.headers.post['token'] = token; 

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ConfigProvider>
    <App />
  </ConfigProvider>
);

reportWebVitals();
