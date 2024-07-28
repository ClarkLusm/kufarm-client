export type UserProfile = {
  id: string;
  username: string;
  email: string;
  walletAddress: string;
  balance: number;
  referralBalance: number;
  maxOut: number;
  income: number;
  hashPower: number;
  dailyIncome: number;
  monthlyIncome: number;
  pool: string;
};
