import { Flowbite } from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

import Footer from "./footer";
import Header from "./header";
import { NotifyModal } from "../notify-modal";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionData?.error) {
      signOut();
    }
  }, [sessionData?.error, router]);

  return (
    <Flowbite>
      <Header />
      <main className="bg-white dark:bg-gray-900 dark:text-white">
        <div className="main container max-w-[1100px] mx-auto h-max pt-16 md:pt-24">
          {children}
        </div>
      </main>
      <Footer />
      <NotifyModal />
    </Flowbite>
  );
}
