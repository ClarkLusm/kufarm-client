import { Carousel, Button, Clipboard } from "flowbite-react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import router from "next/router";
import Link from "next/link";
import axios from "axios";

import Faq from "@/components/ui/faq";
import { Product } from "@/libs/types/product";

export async function generateMetadata(props: { params: { locale: string } }) {
  return {
    title: "meta_title",
    description: "meta_description",
  };
}

type Resp = {
  setting: any;
  product: {
    data: Product[];
    total: number;
  };
};

export const getServerSideProps = (async (ctx) => {
  const session = await getSession(ctx);
  if (session)
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };

  try {
    const [productRes, settingRes] = await Promise.all([
      axios.get(`${process.env.API_URL}/api/products`),
      axios.get(`${process.env.API_URL}/api/app-settings`),
    ]);
    return {
      props: {
        setting: settingRes.data,
        product: {
          data: productRes.data.data,
          total: productRes.data.data,
        },
      },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
}) satisfies GetServerSideProps<Resp>;

export default function Home({
  product,
  setting,
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
      content: "Currently, the Kaspa pool supports KAS",
    },
  ];

  const parameters = [
    {
      id: "1",
      image: "images/users.png",
      title: "Users",
      count: 23827,
    },
    {
      id: "2",
      image: "images/money.png",
      title: "Kaspa mined",
      count: 1310.8879,
    },
    {
      id: "3",
      image: "images/purchase.png",
      title: "Kaspa miner purchased",
      count: 30207,
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-4 sm:mb-10 sm:flex justify-evenly rounded-3xl border bg-gray-100 dark:bg-gray-900 dark:border-gray-700">
        <div className="sm:w-7/12 list-none p-7">
          <div className="mb-5 flex gap-2">
            <Button
              color="gray"
              pill
              onClick={() => router.push("/auth/signin")}
            >
              Cloud mining
            </Button>
            <Button color="gray" pill>
              FREE {setting.maxOutNewUser}$ on first sign up!
            </Button>
          </div>
          <div className="text-2xl sm:text-5xl font-semibold dark:text-white leading-7">
            Start your <span className="font-bold">KASPA</span> mining
            journey today.
          </div>
          <div className="mt-4 text-base font-semibold text-slate-400">
            <p>Overview</p>
            <p>
              Max Total Supply{" "}
              <span className="font-bold text-slate-500">
                12,234,751.749732 KAS
              </span>
            </p>
            <br />
            <p>Other Info</p>
            <p>Token Contract (WITH 8 Decimals)</p>
            <p className="relative inline-block pr-10 max-w-full break-all">
              <a
                href="https://bscscan.com/token/0x51e72dd1f2628295cc2ef931cb64fdbdc3a0c599#balances"
                target="_blank"
                className="font-bold text-slate-500"
              >
                0x51e72dd1f2628295cc2ef931cb64fdbdc3a0c599
              </a>
              <Clipboard.WithIcon
                className="right-0 w-auto p-3"
                valueToCopy="0x51e72dd1f2628295cc2ef931cb64fdbdc3a0c599"
              />
            </p>
            <br />
            <p className="mt-2">
              <a href="https://pancakeswap.finance/?outputCurrency=0x51E72dd1F2628295cC2ef931cB64fDbDc3a0c599" target="_blank">
                TOKEN SWAP (KAS)
              </a>
            </p>
          </div>
          <div className="my-6 text-base font-semibold text-slate-400">
            Get your first payout today
          </div>
          <Button
            className="mb-3"
            color="blue"
            pill
            onClick={() => router.push("/auth/signup")}
          >
            Try it out now
          </Button>
        </div>
        <div className="m-5 h-96 sm:w-5/12 rounded-3xl bg-white dark:bg-gray-900 p-3">
          <Carousel slide indicators={false}>
            {product.data.map((p: Product) => (
              <div key={p.id} className="list-none text-center">
                <img className="m-auto w-6/12" src={p.image} />
                <Link
                  className="text-lg font-bold dark:text-white"
                  href={p.alias}
                >
                  {p.name}
                </Link>
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
      <div className="mb-4 sm:mb-10 grid sm:grid-cols-3 gap-6">
        {describe.map((d) => (
          <div
            key={d.id}
            className="relative rounded-3xl border bg-gray-100 dark:bg-gray-900 dark:border-gray-700"
          >
            {/* <div className="absolute -top-7 right-0 w-52">
              <img src={d.image} alt="" />
            </div> */}
            <div className="w-3/4 pl-6 pb-6 pt-16">
              <h2 className="pb-4 text-3xl font-semibold dark:text-white">
                {d.title}
              </h2>
              <div className="text-lg/5 font-semibold text-slate-600">
                {d.content}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-4 sm:mb-10 grid grid-cols-3 gap-8">
        {parameters.map((p) => (
          <div className="mx-4 h-64 grid-item text-center" key={p.id}>
            <img className="m-auto w-24" src={p.image} alt="" />
            <div className="">
              <h2 className="pb-4 text-xl sm:text-3xl font-semibold dark:text-white">
                {p.count}
              </h2>
              <div className="sm:text-xl font-semibold text-slate-600">
                {p.title}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-20 sm:flex justify-between">
        <div className="mt-4 sm:w-3/6 list-none pr-16">
          <div className="mb-8 text-3xl font-semibold dark:text-white">
            What is Kaspa?
          </div>
          <span className="text-lg/5 font-semibold text-slate-500">
            Kaspa is a simple and affordable cloud mining service, the main
            purpose of which is to introduce a wider audience to the world of
            bitcoino2 and other cryptocurrencies. KAS has a huge number of
            ASIC miners who mine KAS daily on the Kaspa pool
          </span>
          <Button
            className="mb-3 mt-8"
            color="blue"
            pill
            onClick={() => router.push("/auth/signup")}
          >
            Try it out now
          </Button>
        </div>
        <div className="sm:w-3/6">
          <img className="rounded-lg" src="images/mining.jpeg" alt="" />
        </div>
      </div>
      <div className="mb-20 sm:flex justify-between">
        <div className="sm:w-3/6">
          <video className="w-11/12 rounded-lg" controls autoPlay muted>
            <source src="media/pr.mp4" />
          </video>
        </div>
        <div className="mt-4 sm:w-3/6 list-none">
          <div className="mb-8 text-3xl font-semibold dark:text-white">
            Earn Money with Kaspa
          </div>
          <span className="text-lg/5 font-semibold text-slate-500">
            To start mining bitcoins, just select a miner equipment from your
            personal Kaspa account, each miner has a different cost and
            rental period, each equipment generates a unique amount of bitcoino2
            daily. these coins are deposited to your personal account. you just
            have collect your coins everyday without any cost
          </span>
        </div>
      </div>
      <div className="">
        <div className="relative mb-24 sm:w-2/4 px-2">
          <div className="absolute -left-6 -top-14 text-9xl font-semibold text-slate-200 dark:text-gray-600">
            1
          </div>
          <div className="relative mb-2.5 text-3xl font-semibold dark:text-white">
            Extensive range of services
          </div>
          <span className="relative font-semibold text-slate-500">
            The Kaspa pool is an important part of the global Kaspa
            ecosystem, uses the same accounting system as our cloud mining
            service to ensure security. The Kaspa and Kaspa pool aims to
            erase the line between mining and trading by providing users with a
            wide range of mining solutions.
          </span>
        </div>
        <div className="relative float-end sm:w-2/4">
          <div className="absolute -left-6 -top-14 text-9xl font-semibold text-slate-200 dark:text-gray-600">
            2
          </div>
          <div className="relative mb-2.5 text-3xl font-semibold dark:text-white">
            Reliable mining solutions
          </div>
          <span className="relative font-semibold text-slate-500">
            Kaspa provides a comprehensive mining platform with extensive
            experience working with mining pools and competitive mining
            technologies. We strive to provide high-quality and innovative cloud
            mining service for users who need comprehensive mining services.
          </span>
        </div>
        <div className="w-full pt-44">
          <div className="relative m-auto mt-36 sm:w-2/4 ">
            <div className="absolute -left-6 -top-14 mb-2.5 text-9xl font-semibold text-slate-200 dark:text-gray-600">
              3
            </div>
            <div className="relative text-3xl font-semibold dark:text-white">
              Guarantee of services
            </div>
            <span className="relative font-semibold text-slate-500">
              Guarantee of services Kaspa strives to provide qualified
              projects with opportunities and improve industry standard
              practices to achieve consensus in the community. We strive to
              introduce more people around the world to blockchain technology
              and outstanding projects, as well as contribute towards the
              sustainable and stable development of our ecosystem.
            </span>
          </div>
        </div>
      </div>
      <Faq setting={setting} />
      <div className="w-full list-none text-center">
        <p className="text-3xl font-semibold dark:text-white">
          Start your bitcoino2 mining
          <br /> journey today!
        </p>
        <div className="my-10 flex justify-center">
          <Button color="blue" pill onClick={() => router.push("/auth/signup")}>
            Register now
          </Button>
        </div>
      </div>
    </div>
  );
}
