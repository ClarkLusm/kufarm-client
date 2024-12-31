import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      // username: string;
      email: string;
      balance: number;
      referralCode: string;
      referralCommission: number;
    };
    accessToken: string;
    refreshToken: string;
    error?: any;
  }
}
