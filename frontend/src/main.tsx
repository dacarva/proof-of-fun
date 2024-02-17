import { ThirdwebProvider } from "@thirdweb-dev/react";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const activeChain = "mumbai";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThirdwebProvider
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>,
)
