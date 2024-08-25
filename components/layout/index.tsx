import { Flowbite } from "flowbite-react";

import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }: any) {
  return (
    <Flowbite>
      <Header />
      <main className="bg-white dark:bg-gray-900">
        <div className="main container max-w-[1100px] mx-auto h-max pt-24">{children}</div>
      </main>
      <Footer />
    </Flowbite>
  );
}
