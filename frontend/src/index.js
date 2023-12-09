import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { init } from "@airstack/airstack-react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page from './page';
import App from './App';

init(process.env.REACT_APP_AIRSTACK_API_KEY);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/" element={<p>hello world</p>} />
        {/* Dynamic Component */}
        <Route path="sl">
          <Route path=":id" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
