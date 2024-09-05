'use client'

import { NETWORKS } from '@/libs/constants'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = process.env.WALLET_CONNECT_PROJECT_ID || ''

// 2. Set chains
const chains = Object.values(NETWORKS)

// 3. Create a metadata object
const metadata = {
  name: 'Bitcoino2fi',
  description: 'Bitcoino2fi description',
  url: process.env.NEXTAUTH_URL ?? '', // origin must match your domain & subdomain
  icons: ['http://bitcoino2fi.com/']
}
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
})

// 5. Create a AppKit instance
createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  // enableAnalytics: true // Optional - defaults to your Cloud configuration
  allowUnsupportedChain: false,
})

export function AppKit({ children }: any) {
  return children
}