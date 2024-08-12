export const NETWORKS: { [key: number]: NetworkInfo } = {
  1: {
    chainId: 1,
    name: "Ethereum",
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
  },
  56: {
    chainId: 56,
    name: "Binance",
    currency: 'BNB',
    explorerUrl: "https://bscscan.com",
    rpcUrl: "https://bsc-dataseed.binance.org/"
  },
  97: {
    chainId: 97,
    name: "Binance Smart Testnet",
    currency: 'tBNB',
    explorerUrl: "https://testnet.bscscan.com",
    rpcUrl: "https://bsc-testnet-dataseed.bnbchain.org"
  },
  11155111: {
    chainId: 11155111,
    name: "Sepolia",
    currency: 'SepoliaETH',
    explorerUrl: "https://sepolia.etherscan.io/",
    rpcUrl: "https://arbitrum-sepolia.infura.io/v3/3eb224aebf5b48639d4f180681e2b917"
  }
};

export const TOKENS: { [key: string]: TokenInfo } = {
  BTCO2: {
    decimals: 18,
    symbol: "BTCO2",
  },
  USDT: {
    decimals: 6,
    symbol: "USDT",
  },
};
