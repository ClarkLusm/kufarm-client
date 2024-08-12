import { EOrderStatus } from "../enums/order.enum";

type Order = {
  id: string;
  coin: string;
  amount: number;
  txHash: string;
  status: EOrderStatus;
  createdAt: string;
  user: {
    walletAddress: string;
  };
  product: {
    name: string;
  };
};
