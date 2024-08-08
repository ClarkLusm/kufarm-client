import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

import { AppKit } from "@/contexts/web3.context";
import Layout from "@/components/layout";
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}
    >
      <AppKit>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppKit>
    </SessionProvider>
  );
}
