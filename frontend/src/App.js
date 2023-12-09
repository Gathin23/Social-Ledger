import "./App.css";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import ConnectButton from "./component/ConnectButton";
import Card from "./component/Card";

const projectId = "3c73a77b6b4f6e3b4550743cc4a863ae";

// 2. Set chains
const mumbai = {
  chainId: 80001,
  name: "Mumbai",
  currency: "MATIC",
  explorerUrl: "https://mumbai.polygonscan.com",
  rpcUrl: "https://rpc-mumbai.maticvigil.com",
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

function App() {
  return (
    <div >
      <ConnectButton />
      <Card />
    </div>
  );
}

export default App;
