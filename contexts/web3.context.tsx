'use client'

import { NETWORKS } from '@/libs/constants'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = '109f6a4d1721bc23b8b24fd19dffadb6'

// 2. Set chains

// 3. Create a metadata object
const metadata = {
  name: 'Kufarm',
  description: 'Kufarm description',
  url: 'http://localhost:3000', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}
// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  // enableEIP6963: true, // true by default
  // enableInjected: true, // true by default
  // enableCoinbase: true, // true by default
  // rpcUrl: '...', // used for the Coinbase SDK
  // defaultChainId: 1 // used for the Coinbase SDK
})

// 5. Create a AppKit instance
createWeb3Modal({
  ethersConfig,
  chains: Object.values(NETWORKS),
  projectId,
  // enableAnalytics: true // Optional - defaults to your Cloud configuration
  allowUnsupportedChain: false,
})

export function AppKit({ children }) {
  return children
}