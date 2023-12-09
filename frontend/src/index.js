import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { init } from "@airstack/airstack-react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ConnectButton from './component/ConnectButton';
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";


const projectId = "3c73a77b6b4f6e3b4550743cc4a863ae";

// 2. Set chains
const mumbai = {
  chainId: 80001,
  name: "Mumbai",
  currency: "MATIC",
  explorerUrl: "https://mumbai.polygonscan.com",
  rpcUrl: "https://polygon-testnet.public.blastapi.io",
};

// 3. Create modal
const metadata = {
  name: "Link In Bio",
  description:
    " Building a link-in-bio solution that cuts across Lens, Farcaster, XMTP and other onchain and offchain activities and accounts of the user.",
  url: "",
  icons: [""],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mumbai],
  projectId,
});

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
