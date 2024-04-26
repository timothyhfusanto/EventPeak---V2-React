import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from 'react-router-dom';
import './global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HashRouter>
);


reportWebVitals();
