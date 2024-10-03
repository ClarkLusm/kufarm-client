import { Flowbite } from "flowbite-react";

import Footer from "./footer";
import Header from "./header";
import { NotifyModal } from "../notify-modal";

export default function Layout({ children }: any) {
  return (
    <Flowbite>
      <Header />
      <main className="bg-white dark:bg-gray-900 dark:text-white">
        <div className="main container max-w-[1100px] mx-auto h-max pt-24">{children}</div>
      </main>
      <Footer />
      <NotifyModal />
    </Flowbite>
  );
}
