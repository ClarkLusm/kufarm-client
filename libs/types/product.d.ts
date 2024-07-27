export type Product = {
  id: string;
  name: string;
  alias: string;
  image?: string;
  price: number;
  salePrice?: number | null;
  maxOut: number;
  hashPower: number;
  dailyIncome: number;
  monthlyIncome: number;
  count?: number;
};
