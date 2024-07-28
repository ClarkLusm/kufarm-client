import { Button, Navbar, NavbarLink } from "flowbite-react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import router from "next/router";
import axios from "axios";
import { TbChartRadar } from "react-icons/tb";

import { Product } from "@/libs/types/product";
import { UserProfile } from "@/libs/types/user";
import { useEffect, useState } from "react";

type Resp = {
  products: Product[];
  userProducts: Product[];
  profile: UserProfile;
};

export const getServerSideProps = (async (ctx) => {
  const session = await getSession(ctx);
  const reqOptions = {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  };

  try {
    const [profileRes, productRes] = await Promise.all([
      axios.get(`${process.env.API_URL}/api/account/profile`, reqOptions),
      axios.get(`${process.env.API_URL}/api/account/my-products`, reqOptions),
    ]);
    return {
      props: {
        profile: profileRes.data,
        products: productRes.data.data,
        userProducts: productRes.data.userProducts,
      },
    };
  } catch (error) {
    return {
      props: {
        profile: {},
        userProducts: [],
        products: [],
      },
    };
  }
}) satisfies GetServerSideProps<Resp>;

export default function Dashboard({
  profile,
  products,
  userProducts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [userBalance, setUserBalance] = useState<number>(profile.balance);
  useEffect(() => {
    if (!profile) return;
    const timer = setInterval(() => {
      const balance = profile.dailyIncome / 24 / 3600;
      setUserBalance((prev) => prev + balance);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const statistic = [
    {
      id: "1",
      image: "https://kufarm.io/static/kufarm/user2.svg",
      properties: "Username:",
      value: profile.username,
    },
    {
      id: "2",
      image: "https://kufarm.io/static/kufarm/layers.svg",
      properties: "Mining power:",
      value: profile.hashPower,
    },
    {
      id: "3",
      image: "https://kufarm.io/static/kufarm/wallet3.svg",
      properties: "Your BTC wallet:",
      value: profile.walletAddress,
    },
    {
      id: "4",
      image: "https://kufarm.io/static/kufarm/btc2.svg",
      properties: "Your Balance:",
      value: profile.balance,
    },
    {
      id: "5",
      image: "https://kufarm.io/static/kufarm/btc2.svg",
      properties: "Your Referral Balance:",
      value: profile.referralCommission,
    },
  ];

  const mining_statistic = [
    {
      id: "1",
      image: "https://kufarm.io/static/kufarm/chart.svg",
      properties: "Main mining pool:",
      value: profile.pool,
    },
    {
      id: "2",
      image: "https://kufarm.io/static/kufarm/bril.svg",
      properties: "DAILY $:",
      value: profile.dailyIncome,
    },
    {
      id: "3",
      image: "https://kufarm.io/static/kufarm/time2.svg",
      properties: "MONTHLY $:",
      value: profile.monthlyIncome,
    },
    {
      id: "4",
      image: "https://kufarm.io/static/kufarm/time2.svg",
      properties: "Mining power:",
      value: profile.hashPower + " TH/s",
    },
  ];

  return (
    <div className="relative pb-24">
      <div className="mb-10 rounded-2xl shadow-2xl">
        <div className="mb-5 rounded-2xl bg-slate-100 p-10">
          <div className="mb-5 text-2xl font-semibold">Mining Statistic:</div>
          {mining_statistic.map((ms) => (
            <div className="mb-2 flex" key={ms.id}>
              <img className="size-6" src={ms.image} />
              <div className="ml-2 font-medium">
                {ms.properties}
                <span className="ml-2 text-gray-500">{ms.value}</span>
              </div>
            </div>
          ))}
          <div className="my-6 h-5 w-full rounded-xl bg-slate-300 text-transparent mining-line"></div>
          <div className="my-6 text-center">
            <span className="text-xl font-medium">{userBalance}</span>
          </div>
        </div>
      </div>
      <div className="rounded-3xl border mb-10">
        <iframe
          src="https://s.tradingview.com/widgetembed/?hideideas=1&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en#%7B%22symbol%22%3A%22BINANCE%3ABTCUSDT%22%2C%22frameElementId%22%3A%22tradingview_7763e%22%2C%22interval%22%3A%22240%22%2C%22hide_side_toolbar%22%3A%221%22%2C%22allow_symbol_change%22%3A%221%22%2C%22save_image%22%3A%221%22%2C%22watchlist%22%3A%22BINANCE%3ABTCUSDT%5Cu001fBINANCE%3AETHUSDT%22%2C%22details%22%3A%221%22%2C%22calendar%22%3A%221%22%2C%22hotlist%22%3A%221%22%2C%22studies%22%3A%22STD%3BSMA%22%2C%22theme%22%3A%22light%22%2C%22style%22%3A%221%22%2C%22timezone%22%3A%22Etc%2FUtc%22%2C%22show_popup_button%22%3A%221%22%2C%22studies_overrides%22%3A%22%7B%7D%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22chart%22%2C%22utm_term%22%3A%22BINANCE%3ABTCUSDT%22%2C%22page-uri%22%3A%22kufarm.com%2Faccounts%2Fmain%2F%22%7D"
          className="h-[400px] w-full rounded-3xl"
        />
      </div>
      <div className="flex justify-between">
        <div className="mr-7 w-8/12 rounded-2xl bg-slate-100 p-10">
          <div className="mb-5 text-2xl font-semibold">
            Dashboard Statistic:
          </div>
          {statistic.map((s) => (
            <div className="mb-5 flex" key={s.id}>
              <img className="size-6" src={s.image} alt="" />
              <div className="ml-2 font-medium">
                {s.properties}
                <span className="ml-2 text-gray-500">{s.value}</span>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-3 gap-4">
            <Button color="success" className="h-12 items-center" onClick={router.reload}>
              <img src="https://kufarm.io/static/kufarm/refresh.svg" alt="" />
              <div className="ml-2 font-medium text-white">Refresh balance</div>
            </Button>

            <Button color="success" className="h-12 items-center" onClick={() => router.push('/withdraw')}>
              <img
                src="https://kufarm.io/static/kufarm/credit-card.svg"
                alt=""
              />
              <div className="ml-2 font-medium text-white">Withdrawal</div>
            </Button>

            <Button color="warning" className="h-12 items-center">
              <img
                src="https://kufarm.io/static/kufarm/credit-card.svg"
                alt=""
              />
              <div className="ml-2 font-medium text-white">Referal</div>
            </Button>
          </div>
        </div>
        <div className="w-4/12 rounded-2xl bg-slate-100 p-10">
          <div className="mb-5 text-2xl font-semibold">Dashboard Miners:</div>
          {products.map((p: Product) => {
            const owner = userProducts.find((p1: Product) => p1.id === p.id);
            return (
              <div className="mb-5 flex items-center" key={p.id}>
                <TbChartRadar color="#e3a008" />
                <div className="ml-2 font-medium">
                  {p.name}
                  <span className="ml-2 text-gray-500">
                    {owner?.count || 0}
                  </span>
                </div>
              </div>
            );
          })}
          <Navbar className="-ml-4 flex w-4/6 list-none bg-transparent">
            <NavbarLink href="#">
              <Button color="success" className="h-12 w-44 items-center">
                <img
                  src="https://kufarm.io/static/kufarm/cart-icon.svg"
                  alt=""
                />
                <div className="ml-2 font-medium text-white">Buy more TH/S</div>
              </Button>
            </NavbarLink>
          </Navbar>
        </div>
      </div>

      <div className="w-[100vw] absolute left-[50%] bottom-0 translate-x-[-50%]">
        <iframe
          src="https://widget.coinlib.io/widget?type=horizontal_v2&amp;theme=light&amp;pref_coin_id=1505&amp;invert_hover="
          loading="lazy"
          width="100%"
          height="36px"
          style={{ border: 0, margin: 0, padding: 0 }}
        />
      </div>
    </div>
  );
}
