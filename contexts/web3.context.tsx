"use client";

import { NETWORKS } from "@/libs/constants";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = process.env.WALLET_CONNECT_PROJECT_ID || "";

// 2. Set chains
const chains = Object.values(NETWORKS);

// 3. Create a metadata object
const metadata = {
  name: "Miner86",
  description: "Miner86 mining CAKE token",
  url: process.env.NEXTAUTH_URL ?? "", // origin must match your domain & subdomain
  icons: ["https://miner86.com/"],
};
// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: false, // true by default
  enableCoinbase: false, // true by default
  // rpcUrl: '...', // used for the Coinbase SDK
  // defaultChainId: 1 // used for the Coinbase SDK
});

// 5. Create a AppKit instance
createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  // enableAnalytics: true // Optional - defaults to your Cloud configuration
  allowUnsupportedChain: false,
  includeWalletIds: [
    "0b415a746fb9ee99cce155c2ceca0c6f6061b1dbca2d722b3ba16381d0562150", // Safepal
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // Metamask
  ],
});

export function AppKit({ children }: any) {
  return children;
}
