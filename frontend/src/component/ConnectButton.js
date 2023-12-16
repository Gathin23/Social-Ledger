import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";

import { createWalletClient, custom } from "viem";
import { polygonMumbai } from "viem/chains";

export default function ConnectButton() {
  const [signedMessage, setSignedMessage] = useState("");
  const navigate = useNavigate();

  const { primaryWallet } = useDynamicContext();
  const { walletConnector } = useDynamicContext();

  const signMessage = async () => {
    if (!primaryWallet) return;
    const primaryWalletAddress = await primaryWallet?.address;
    const web3Provider = walletConnector.getWalletClient();
    const walletClient = createWalletClient({
      chain: polygonMumbai,
      transport: custom(web3Provider),
    });

    if (!walletClient) return;
    const messageToSign = "SiginingMessage";
    const signature = await walletClient.signMessage({
      account: primaryWalletAddress,
      message: messageToSign,
    });
    setSignedMessage(signature);

    await sendToBackend({ signedMessage, message: messageToSign });
    console.log("signature", signature);
  };

  const sendToBackend = async (data) => {
    try {
      const response = await fetch("https://backend.susanoox.in/addAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      // console.log('Backend response:', responseData);
      if (responseData.id !== "") {
        navigate(`/sl/${responseData.id}`);
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen">
        <DynamicWidget />
        {primaryWallet && (
          <div className="m-5">
            <button
              onClick={signMessage}
              className="text-2xl p-2 bg-blue-500 text-white rounded"
            >
              Sign Message
            </button>
          </div>
        )}
      </div>
    </>
  );
}
