import "./App.css";
import { useWeb3Modal, createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import { useParams } from "react-router-dom";
import Page from "./page";

function App() {
  const {id} = useParams();
  const { web3Modal, provider, connect } = useWeb3Modal();

  return (
    <div >
      <Page slug={id}/>
    </div>
  );
}

export default App;
