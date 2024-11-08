import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Button, useThemeMode } from "flowbite-react";
import { TbChartRadar } from "react-icons/tb";
import { getSession } from "next-auth/react";
import { TickerTape } from "react-ts-tradingview-widgets";
import router from "next/router";
import axios from "axios";

import { Product } from "@/libs/types/product";
import { UserProfile } from "@/libs/types/user";
import UserIcon from "@/icons/user.svg";
import UsdIcon from "@/icons/usd.svg";
import BtcIcon from "@/icons/btc.svg";
import CpuIcon from "@/icons/cpu.svg";
import GpuIcon from "@/icons/gpu.svg";
import WalletIcon from "@/icons/wallet.svg";
import DayIcon from "@/icons/24h.svg";
import MonthIcon from "@/icons/time-is-money.svg";
import BitClouldIcon from "@/icons/bit_cloud.svg";
import CartIcon from "@/icons/cart.svg";
import CreditCardIcon from "@/icons/credit-card.svg";
import RefreshIcon from "@/icons/refresh.svg";
import ReferralIcon from "@/icons/referral.svg";

const symbols = [
  {
    proName: "BINANCE:BTCUSD",
    title: "BTC",
  },
  {
    proName: "BINANCE:ETHUSD",
    title: "ETH",
  },
  {
    title: "BNB",
    proName: "BINANCE:BNBUSD",
  },
  {
    title: "CAKE",
    proName: "BINANCE:CAKEUSD",
  },
  {
    proName: "BINANCEUS:USDTUSD",
    title: "USDT",
  },
];

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
  const { mode } = useThemeMode();
  const [userBalance, setUserBalance] = useState<number>(profile?.balance);
  const [chartUrl, setChartUrl] = useState("");

  useEffect(() => {
    if (!profile) return;
    const timer = setInterval(() => {
      if (!profile.maxOut || profile.income >= profile.maxOut) {
        clearInterval(timer);
      }
      const balance = profile?.dailyIncome / 24 / 3600;
      setUserBalance((prev) => prev + balance);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    setChartUrl(
      `https://s.tradingview.com/widgetembed/?hideideas=1&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en#%7B%22symbol%22%3A%22BINANCE%3ABTCUSDT%22%2C%22frameElementId%22%3A%22tradingview_7763e%22%2C%22interval%22%3A%22240%22%2C%22hide_side_toolbar%22%3A%221%22%2C%22allow_symbol_change%22%3A%221%22%2C%22save_image%22%3A%221%22%2C%22watchlist%22%3A%22BINANCE%3ABTCUSDT%5Cu001fBINANCE%3AETHUSDT%22%2C%22details%22%3A%221%22%2C%22calendar%22%3A%221%22%2C%22hotlist%22%3A%221%22%2C%22studies%22%3A%22STD%3BSMA%22%2C%22theme%22%3A%22${mode}%22%2C%22style%22%3A%221%22%2C%22timezone%22%3A%22Etc%2FUtc%22%2C%22show_popup_button%22%3A%221%22%2C%22studies_overrides%22%3A%22%7B%7D%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22chart%22%2C%22utm_term%22%3A%22BINANCE%3ABTCUSDT%22%2C%22page-uri%22%3A%22kufarm.com%2Faccounts%2Fmain%2F%22%7D`
    );
  }, [mode]);

  const statistic = [
    {
      id: "1",
      image: <UserIcon width={24} className="dark:color-white" />,
      properties: "Username:",
      value: profile?.username,
    },
    {
      id: "2",
      image: <CpuIcon width={24} className="dark:color-white" />,
      properties: "Mining power:",
      value: profile?.hashPower?.toLocaleString("en-EN"),
    },
    {
      id: "3",
      image: <WalletIcon width={24} className="dark:color-white" />,
      properties: "Your wallet:",
      value: profile?.walletAddress,
    },
    {
      id: "4",
      image: <UsdIcon width={24} className="dark:color-white" />,
      properties: "Your Balance:",
      value: userBalance?.toLocaleString("en-EN", {
        maximumFractionDigits: 5,
      }),
    },
    {
      id: "5",
      image: <BtcIcon width={24} className="dark:color-white" />,
      properties: "Your Referral Balance:",
      value: profile?.referralCommission?.toLocaleString("en-EN", {
        maximumFractionDigits: 5,
      }),
    },
  ];

  const mining_statistic = [
    {
      id: "1",
      image: <BitClouldIcon width={24} className="fill-yellow-400" />,
      properties: "Main mining pool:",
      value: profile?.pool,
    },
    {
      id: "2",
      image: <DayIcon width={24} className="fill-yellow-400" />,
      properties: "DAILY:",
      value: profile?.dailyIncome + "$",
    },
    {
      id: "3",
      image: <MonthIcon width={24} className="fill-yellow-400" />,
      properties: "MONTHLY:",
      value: profile?.monthlyIncome?.toLocaleString("en-EN") + "$",
    },
    {
      id: "4",
      image: <GpuIcon width={24} className="fill-yellow-400" />,
      properties: "Mining power:",
      value: profile?.hashPower?.toLocaleString("en-EN") + " TH/s",
    },
  ];

  return (
    <div className="relative md:py-24 md:px-4">
      <div className="mb-10 rounded-2xl shadow-2xl">
        <div className="mb-5 rounded-2xl bg-slate-100 dark:bg-gray-800 p-4 sm:p-10">
          <div className="mb-5 text-2xl font-semibold">Mining Statistic:</div>
          {mining_statistic.map((ms) => (
            <div className="mb-2 flex items-center overflow-hidden" key={ms.id}>
              {ms.image}
              <div className="ml-2 ">
                {ms.properties}
                <span className="ml-2 text-gray-500">{ms.value}</span>
              </div>
            </div>
          ))}
          <div className="my-6 h-5 w-full rounded-xl bg-slate-300 dark:bg-gray-800 text-transparent mining-line"></div>
          <div className="my-6 text-center">
            <span className="text-xl ">
              {userBalance?.toLocaleString("en-EN", {
                maximumFractionDigits: 9,
              })}
            </span>
          </div>
        </div>
      </div>
      <div className="rounded-3xl border mb-10">
        <iframe
          key={mode}
          src={chartUrl}
          className="h-[400px] w-full rounded-3xl"
        />
      </div>
      <div className="sm:flex justify-between mb-6">
        <div className="mb-4 sm:mr-7 sm:mb-0 sm:w-8/12 rounded-2xl bg-slate-100 dark:bg-gray-800 p-4 sm:p-10">
          <div className="mb-5 text-2xl font-semibold">
            Dashboard Statistic:
          </div>
          {statistic.map((s) => (
            <div className="mb-5 flex overflow-hidden" key={s.id}>
              {s.image}
              <div className="ml-2 ">
                {s.properties}
                <span className="ml-2 text-gray-500">{s.value}</span>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-3 gap-4">
            <Button
              color="success"
              className="h-12 items-center"
              onClick={router.reload}
            >
              <RefreshIcon width={24} className="hidden sm:block mr-2" />
              <span className="text-white">Refresh balance</span>
            </Button>

            <Button
              color="success"
              className="h-12 items-center"
              onClick={() => router.push("/withdraw")}
            >
              <CreditCardIcon width={24} className="hidden sm:block mr-2" />
              <span className="text-white">Withdrawal</span>
            </Button>

            <Button
              color="warning"
              className="h-12 items-center"
              onClick={() => router.push("/referral")}
            >
              <ReferralIcon width={24} className="hidden sm:block mr-2" />
              <span className="text-white">Referal</span>
            </Button>
          </div>
        </div>
        <div className="sm:w-4/12 rounded-2xl bg-slate-100 dark:bg-gray-800 p-4 sm:p-10">
          <div className="mb-5 text-2xl font-semibold">Dashboard Miners:</div>
          {products.map((p: Product) => {
            const owner = userProducts.find((p1: any) => p1.productId === p.id);
            return (
              <div className="mb-5 flex items-center" key={p.id}>
                <TbChartRadar color="#e3a008" />
                <div className="ml-2 ">
                  {p.name}
                  <span className="ml-2 text-gray-500">
                    {owner?.count || 0}
                  </span>
                </div>
              </div>
            );
          })}
          <Button
            color="success"
            className="h-12 w-44 items-center"
            onClick={() => router.push("/buy")}
          >
            <CartIcon width={24} />
            <div className="ml-2  text-white">Buy more TH/S</div>
          </Button>
        </div>
      </div>

      <TickerTape
        colorTheme={mode === "dark" ? "dark" : "light"}
        symbols={symbols}
      ></TickerTape>
    </div>
  );
}
