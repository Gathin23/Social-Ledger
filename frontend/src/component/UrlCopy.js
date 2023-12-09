import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const UrlCopy = () => {
  const [copied, setCopied] = useState(false);
  const currentURL = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentURL);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-10">
      <div className="border border-gray-300 p-4 rounded-md shadow-md bg-white bg-opacity-60 p-6 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg">
        <p className="mb-4 font-bold">Here is your personal link: </p>
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={currentURL}
            readOnly
            className="flex-1 bg-gray-100 px-2 py-1 rounded-md"
          />
          <button
            onClick={copyToClipboard}
            className="ml-4 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className='mt-2 flex items-center justify-center'>
        <QRCode value={currentURL} size={100} />
        </div>
      </div>
    </div>
  );
};

export default UrlCopy;