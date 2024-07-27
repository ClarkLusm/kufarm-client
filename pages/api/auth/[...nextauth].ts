import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await axios.post(
            `${process.env.API_URL}/api/auth/signin`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );
          return res.data;
        } catch (error: any) {
          throw new Error(error?.response?.data?.message);
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  jwt: {
    secret: "secretCode",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        var tokenParsed = JSON.parse(
          Buffer.from(user?.accessToken?.split(".")?.[1], "base64").toString()
        );
        const dateNowInSeconds = new Date().getTime() / 1000;
        if (dateNowInSeconds > tokenParsed.exp) {
          token.error = 'AccessTokenExpired'
        }
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user;
      session.error = token.error;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin'
  }
} satisfies AuthOptions;

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}
