import { Inter } from "next/font/google";
import { Button, Carousel, Navbar, NavbarLink } from "flowbite-react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import Faq from "@/components/ui/faq";
import { Product } from "@/libs/types/product";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(props: { params: { locale: string } }) {
  return {
    title: "meta_title",
    description: "meta_description",
  };
}

type Resp = {
  data: Product[];
  total: number;
};

export const getServerSideProps = (async () => {
  const res = await fetch(`${process.env.API_URL}/api/products`);
  const resp: Resp = await res.json();
  return { props: { resp } };
}) satisfies GetServerSideProps<{ resp: Resp }>;

export default function Home({
  resp,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const describe = [
    {
      id: "Stable income",
      image: "https://kufarm.io/static/kufarm/adv-img1.png",
      title: "Stable income",
      content: "Our powerful mining pool guarantees a stable income",
    },
    {
      id: "Reliable security system",
      image: "https://kufarm.io/static/kufarm/adv-img2.png",
      title: "Reliable security system",
      content:
        "A thoughtful and reliable security system that protects the assets and privacy of users",
    },
    {
      id: "Multiple tokens",
      image: "https://kufarm.io/static/kufarm/adv-img3.png",
      title: "Multiple tokens",
      content:
        "Currently, the Kucoin pool supports Bitcoin (BTC), Ethereum (ETH) and Bitcoin Cash (BACK)",
    },
  ];

  const parameters = [
    {
      id: "users",
      image: "https://kufarm.io/static/kufarm/adv2-img1.png",
      title: "users",
      count: 23827,
    },
    {
      id: "Bitcoin mined",
      image: "https://kufarm.io/static/kufarm/adv2-img2.png",
      title: "Bitcoin mined",
      count: 1310.8879,
    },
    {
      id: "Bitcoin miner purchased",
      image: "https://kufarm.io/static/kufarm/adv2-img3.png",
      title: "Bitcoin miner purchased",
      count: 30207,
    },
  ];

  return (
    <Navbar className="container m-auto p-2 pt-24">
      <>
        <div className="mb-10 flex w-screen justify-evenly rounded-3xl border bg-gray-100">
          <div className="w-7/12 list-none p-7">
            <div className="mb-5 flex gap-2">
              <NavbarLink href="/auth/login">
                <Button color="gray" pill>
                  Cloud mining
                </Button>
              </NavbarLink>
              <NavbarLink href="#">
                <Button color="gray" pill>
                  FREE 1 TH/S on first sign up!
                </Button>
              </NavbarLink>
            </div>
            <div className="text-6xl font-semibold">
              Start your Bitcoin mining journey today.
            </div>
            <div className="my-6 text-base font-semibold text-slate-400">
              Get your first payout today
            </div>
            <NavbarLink href="/auth/register">
              <Button className="mb-3" color="blue" pill>
                Try it out now
              </Button>
            </NavbarLink>
          </div>
          <div className="m-5 h-96 w-5/12 rounded-3xl bg-white p-3">
            <Carousel slide indicators={false}>
              {resp.data.map((p) => (
                <div key={p.id} className="list-none text-center">
                  <img className="m-auto w-6/12" src={p.image} />
                  <NavbarLink className="text-lg font-bold" href={p.alias}>
                    {p.name}
                  </NavbarLink>
                  <div className="text-lg font-bold text-slate-500">
                    {p.hashPower}
                  </div>
                  <span className="font-medium text-slate-500">
                    {p.dailyIncome}
                  </span>
                  <br />
                  <span className="font-medium text-slate-500">
                    {p.monthlyIncome}
                  </span>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="mb-10 flex justify-between">
          {describe.map((d) => (
            <div
              className="relative mx-4 h-64 w-2/6 rounded-3xl border bg-gray-100"
              key={d.id}
            >
              <div className="absolute -top-7 right-0 w-52">
                <img src={d.image} alt="" />
              </div>
              <div className="w-3/4 pl-6 pt-16">
                <h2 className="pb-4 text-3xl font-semibold">{d.title}</h2>
                <div className="text-lg/5 font-semibold text-slate-600">
                  {d.content}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-10 flex w-screen justify-between">
          {parameters.map((p) => (
            <div className="mx-4 h-64 w-2/6 text-center" key={p.id}>
              <div className="h-24 w-full">
                <img className="m-auto" src={p.image} alt="" />
              </div>
              <div className="">
                <h2 className="pb-4 text-3xl font-semibold">{p.count}</h2>
                <div className="text-lg/5 font-semibold text-slate-600">
                  {p.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
      <div className="mb-20 flex justify-between">
        <div className="  mt-4 w-3/6 list-none pr-16">
          <div className="mb-8 text-3xl font-semibold">What is Kufarm?</div>
          <span className="text-lg/5 font-semibold text-slate-500">
            Kufarm is a simple and affordable cloud mining service, the main
            purpose of which is to introduce a wider audience to the world of
            bitcoin and other cryptocurrencies. Kufarm has a huge number of ASIC
            miners who mine Bitcoin daily on the Kucoin pool
          </span>
          <NavbarLink href="/auth/register">
            <Button className="mb-3 mt-8" color="blue" pill>
              Try it out now
            </Button>
          </NavbarLink>
        </div>
        <div className="w-3/6">
          <img
            className="rounded-lg border-4"
            src="	https://kufarm.io/static/kufarm/info-block-img.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="mb-20 flex justify-between">
        <div className="w-3/6">
          <video
            className="w-11/12 rounded-lg border-4"
            controls
            autoPlay
            muted
          >
            <source src="https://kufarm.io/static/kufarm/pr.mp4" />
          </video>
        </div>
        <div className="mt-4 w-3/6 list-none">
          <div className="mb-8 text-3xl font-semibold">
            Earn Money with Kufarm
          </div>
          <span className="text-lg/5 font-semibold text-slate-500">
            To start mining bitcoins, just select a miner equipment from your
            personal Kufarm account, each miner has a different cost and rental
            period, each equipment generates a unique amount of bitcoin daily.
            these coins are deposited to your personal account. you just have
            collect your coins everyday without any cost
          </span>
        </div>
      </div>
      <div className="w-screen">
        <div className="relative mb-24 w-2/4">
          <div className="absolute -left-6 -top-14 text-9xl font-semibold text-slate-200">
            1
          </div>
          <div className="relative mb-2.5 text-3xl font-semibold">
            Extensive range of services
          </div>
          <span className="relative font-semibold text-slate-500">
            The KuCoin pool is an important part of the global KuCoin ecosystem,
            uses the same accounting system as our cloud mining service to
            ensure security. The KuCoin and Kufarm pool aims to erase the line
            between mining and trading by providing users with a wide range of
            mining solutions.
          </span>
          <img
            className="absolute -left-20 top-0 h-60 w-full"
            src="https://kufarm.io/static/kufarm/ls-arr1.png"
            alt=""
          />
        </div>
        <div className="relative float-end w-2/4">
          <div className="absolute -left-6 -top-14 text-9xl font-semibold text-slate-200">
            2
          </div>
          <div className="relative mb-2.5 text-3xl font-semibold">
            Reliable mining solutions
          </div>
          <span className="relative font-semibold text-slate-500">
            KuFarm provides a comprehensive mining platform with extensive
            experience working with mining pools and competitive mining
            technologies. We strive to provide high-quality and innovative cloud
            mining service for users who need comprehensive mining services.
          </span>
          <img
            className="absolute -left-80 top-20 h-48 w-64"
            src="https://kufarm.io/static/kufarm/ls-arr2.png"
            alt=""
          />
        </div>
        <div className="w-full pt-44">
          <div className="relative m-auto mt-36 w-2/4 ">
            <div className="absolute -left-6 -top-14 mb-2.5 text-9xl font-semibold text-slate-200">
              3
            </div>
            <div className="relative text-3xl font-semibold">
              Guarantee of services
            </div>
            <span className="relative font-semibold text-slate-500">
              Guarantee of servicesKuCoin strives to provide qualified projects
              with opportunities and improve industry standard practices to
              achieve consensus in the community. We strive to introduce more
              people around the world to blockchain technology and outstanding
              projects, as well as contribute towards the sustainable and stable
              development of our ecosystem.
            </span>
          </div>
        </div>
      </div>
      <Faq />
      <div className="w-full list-none text-center">
        <div className="text-3xl font-semibold">
          Start your bitcoin mining
          <br /> journey today!
        </div>
        <div className="my-10 flex justify-center">
          <NavbarLink href="/auth/register">
            <Button color="blue" pill>
              Register now
            </Button>
          </NavbarLink>
        </div>
      </div>
    </Navbar>
  );
}
