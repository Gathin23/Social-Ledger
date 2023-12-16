import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { init } from "@airstack/airstack-react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ConnectButton from './component/ConnectButton';

init(process.env.REACT_APP_AIRSTACK_API_KEY);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/" element={<ConnectButton />} />
        {/* Dynamic Component */}
        <Route path="sl">
          <Route path=":id" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
