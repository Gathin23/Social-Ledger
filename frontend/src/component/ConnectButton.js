import React, { useState, useEffect } from 'react';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

export default function ConnectButton() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [signedMessage, setSignedMessage] = useState('');
  const [provider, setProvider] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (walletProvider) {
      setProvider(new ethers.providers.Web3Provider(walletProvider));
    }
  }, [walletProvider]);

  useEffect(() => {
    console.log('Provider:', provider);
  }, [provider]);

  // Function to handle signing the message
  const signMessage = async () => {
    if (!provider) {
      console.error('Provider not available');
      return;
    }

    try {
      // Get the signer from the provider
      const signer = provider.getSigner();

      // Message to sign
      const messageToSign = 'hi';

      // Sign the message
      const signature = await signer.signMessage(messageToSign);
      setSignedMessage(signature);
      console.log('Signed message:', signature);

      // Send the signature and message to the backend
      // Replace this with your backend endpoint
      await sendToBackend({ signature, message: messageToSign });
    } catch (error) {
      console.error('Error signing message:', error);
    }
  };

  // Function to send data to backend
  const sendToBackend = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/addAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      // console.log('Backend response:', responseData);
      if (responseData.id !== "") {
        navigate(`/sl/${responseData.id}`);
      }
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <div className="mt-5 flex justify-end mr-10">
      <w3m-button />
      {isConnected && (
        <div>
          <button onClick={signMessage}>Sign Message</button>
          
        </div>
      )}
    </div>
  );
}
