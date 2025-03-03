import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import "./wallet.css";

function PHWallet() {
  const wallet = useWallet();
  return (
    <>
      <WalletModalProvider>
        <WalletMultiButton
          className="bg-violet-600 hover:bg-violet-700"
            // style={{
            //   backgroundColor: "#fff",
            //   color: "#000",
            //   fontWeight: "bold",
            //   borderRadius: "9999px",
            //   border: "1px solid #fff",
            //   fontSize: "15px"
            // }}
        >
          {!wallet?.connected && "Connect Wallet"}
        </WalletMultiButton>
      </WalletModalProvider>
    </>
  );
}
export default PHWallet;
