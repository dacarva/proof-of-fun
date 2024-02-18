import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ScrollSepoliaTestnet } from "@thirdweb-dev/chains";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      activeChain={ScrollSepoliaTestnet}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
