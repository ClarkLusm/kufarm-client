type PaymentWallet = {
  id: string;
  name: string;
  coin: string;
  chainId: number;
  image: string;
};

type TokenInfo = {
  decimals: number;
  symbol: string;
};

type NetworkInfo = {
  chainId: number;
  name: string;
  currency: string;
  explorerUrl: string;
  rpcUrl: string;
};
