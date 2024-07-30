import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="container max-w-[1100px] mx-auto pt-24">{children}</main>
      <Footer />
    </>
  );
}
