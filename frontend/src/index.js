import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { init } from "@airstack/airstack-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ConnectButton from "./component/ConnectButton";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

init(process.env.REACT_APP_AIRSTACK_API_KEY);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DynamicContextProvider
      settings={{
        environmentId: "e0b9edb7-9fe3-44ce-829d-053ef5a1b469",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConnectButton />} />
          <Route path="sl">
            <Route path=":id" element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DynamicContextProvider>
  </React.StrictMode>
);
