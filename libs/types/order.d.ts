export type Order = {
  id: string;
  coin: string;
  amount: number;
  txHash: string;
  status: number;
  createdAt: string;
  user: {
    walletAddress: string;
  },
  product: {
    name: string;
  }
};
