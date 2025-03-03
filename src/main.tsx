import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import * as web3 from "@solana/web3.js";
import {
  WalletProvider,
  ConnectionProvider,
} from "@solana/wallet-adapter-react";
import '@solana/wallet-adapter-react-ui/styles.css';
const endpoint = web3.clusterApiUrl("devnet");
createRoot(document.getElementById("root")!).render(
  <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={[]} autoConnect>
      <StrictMode>
        <App />
      </StrictMode>
    </WalletProvider>
  </ConnectionProvider>
);
