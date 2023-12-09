import "./App.css";
import { useWeb3Modal, createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import { useParams } from "react-router-dom";
import Page from "./page";

// const projectId = "3c73a77b6b4f6e3b4550743cc4a863ae";

// // 2. Set chains
// const mumbai = {
//   chainId: 80001,
//   name: "Mumbai",
//   currency: "MATIC",
//   explorerUrl: "https://mumbai.polygonscan.com",
//   rpcUrl: "https://rpc-mumbai.maticvigil.com",
// };

// // 3. Create modal
// const metadata = {
//   name: "Link In Bio",
//   description:
//     " Building a link-in-bio solution that cuts across Lens, Farcaster, XMTP and other onchain and offchain activities and accounts of the user.",
//   url: "",
//   icons: [""],
// };

// createWeb3Modal({
//   ethersConfig: defaultConfig({ metadata }),
//   chains: [mumbai],
//   projectId,
// });

function App() {
  const {id} = useParams();
  const { web3Modal, provider, connect } = useWeb3Modal();

  // const signAndPostMessage = async (message) => {
  //   if (!provider) {
  //     console.log('No provider available');
  //     return;
  //   }

  //   const signer = provider.getSigner();
  //   const signedMessage = await signer.signMessage(message);

  //   const response = await fetch('https://dollie.ngrok.app/addAddress', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       signature: signedMessage,
  //       message: message,
  //     }),
  //   });
  // };

  // const handleConnect = async () => {
  //   await connect();
  //   const message = 'Your custom message';
  //   signAndPostMessage(message);
  // };


  return (
    <div >
      <Page slug={id}/>
    </div>
  );
}

export default App;
