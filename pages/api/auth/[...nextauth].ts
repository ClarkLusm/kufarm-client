import axios from "axios";
import { jwtDecode } from "jwt-decode";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(token: any) {
  try {
    const resp = await axios.post(
      `${process.env.API_URL}/api/auth/refresh-token/`,
      {
        token: token.refreshToken,
      }
    );
    const accessToken = resp.data.access;
    return {
      ...token,
      accessToken,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

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
    CredentialsProvider({
      id: "otp-credentials",
      name: "OTP Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        code: { label: "OTP code", type: "text" },
      },
      async authorize(credentials, req) {
        try {
          const res = await axios.post(
            `${process.env.API_URL}/api/auth/otp-signin`,
            {
              email: credentials?.email,
              code: credentials?.code,
            }
          );
          return res.data;
        } catch (error: any) {
          throw new Error(error?.response?.data?.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = user.user;
      }
      try {
        const tokenParsed = jwtDecode(token.accessToken);
        const dateNowInSeconds = new Date().getTime() / 1000;
        if (dateNowInSeconds > tokenParsed.exp!) {
          return refreshAccessToken(token);
        }
      } catch (error) {
        token.error = "AccessTokenExpired";
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
    signIn: "/auth/signin",
  },
} satisfies AuthOptions;

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}
