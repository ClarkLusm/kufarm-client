import {
  Alert,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import { InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import router from "next/router";
import Image from "next/image";

import UsdIcon from "@/icons/usd.svg";
import ReinvestIcon from "@/icons/investment.svg";
import SaveIcon from "@/icons/save.svg";
import { Product } from "@/libs/types/product";
import { sendReinvest } from "../api/reinvest";

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);
  const reqOptions = {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  };

  try {
    const [profileRes, reinvestRes, settingRes] = await Promise.all([
      axios.get(`${process.env.API_URL}/api/account/profile`, reqOptions),
      axios.get(`${process.env.API_URL}/api/account/reinvests`, reqOptions),
      axios.get(`${process.env.API_URL}/api/reinvest-settings`, reqOptions),
    ]);

    return {
      props: {
        profile: profileRes.data,
        reinvests: reinvestRes.data.data,
        total: reinvestRes.data.total,
        settings: settingRes.data,
      },
    };
  } catch (error: any) {
    return {
      notFound: true,
    };
  }
};

export default function ReinvestPage({
  profile,
  reinvests,
  total,
  settings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [amount, setAmount] = useState<number>(
    profile.autoReinvestAmount || settings.minAmount || 0
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [usdReferralCommission, setUsdReferralCommission] = useState<number>(0);
  const [usdtPrice, setUsdtPrice] = useState<number>(0);
  const [priceFetching, setPriceFetching] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(
    !!profile.autoReinvestEnabled
  );

  useEffect(() => {
    if (profile.balance) {
      setPriceFetching(true);
      axios
        .get("https://api.binance.com/api/v3/ticker/price?symbol=CAKEUSDT")
        .then((res) => res.data)
        .then(({ price }) => {
          setUsdtPrice(price);
          setUsdReferralCommission(
            Number(profile.referralCommission || 0) * price
          );
          setPriceFetching(false);
        })
        .catch((error) => console.error(error));
    }
  }, [profile]);

  const iItems =
    reinvests.length >= 7
      ? reinvests
      : [...reinvests, ...new Array(7 - reinvests.length).fill(null)];

  const onSubmit = async () => {
    if (Number.isNaN(Number(amount))) {
      setErrorMsg("Invalid amount!");
    } else if (amount > profile.balance + usdReferralCommission) {
      setErrorMsg("Your balance is not enough to invest!");
    } else if (amount < settings.minAmount) {
      setErrorMsg("The reinvestment amount is less than the minimum!");
    } else {
      sendRequest();
    }
  };

  const sendRequest = () => {
    sendReinvest(enabled, amount)
      .then((res) => res.data)
      .then((data) => {
        router.reload();
      })
      .catch((err) => {
        setErrorMsg(
          err?.response?.data?.message ??
            err?.message ??
            "Có lỗi xảy ra. Vui lòng thử lại sau!"
        );
      });
  };

  const onChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, "");
    setAmount(value);
    if (errorMsg) setErrorMsg("");
  };

  const calcHashPower = () => {
    const product = settings.products
      .sort((a: Product, b: Product) => a.price - b.price)
      .find((p: Product) => p.price >= amount);
    if (product) {
      return (amount / product.price) * product.hashPower;
    }
    return 0;
  };

  return (
    <div className="pb-8">
      <div className="mb-4 p-4">
        <div className="flex">
          <Image
            src="/images/investment.svg"
            alt="reinvestment"
            width={140}
            height={140}
            className="hidden sm:block sm:mb-0"
          />
          <div className="sm:ml-4 text-justify">
            <p className="mb-2">
              <strong>Auto Reinvestment</strong> is a feature that allows the
              system to automatically use Minted USD balance (including Referral
              commissions — referred to as Total balance) to purchase additional
              mining power. When you enter the amount you want to reinvest, the
              system will use that amount to buy mining power repeatedly until
              your total balance is fully used.
            </p>
            <p className="text-sm dark:text-gray-300 text-gray-700">
              Example: If your Total balance is $101 and you enter $10, the
              system will make 10 purchases (each for $10), leaving $1 remaining
              in your account. However, if you enter the full $101 from the
              start, the system will make a single purchase with higher mining
              power, helping you maximize investment efficiency.
            </p>
          </div>
        </div>
      </div>
      <div className="sm:flex">
        <div className="mb-4 sm:mb-0 sm:mr-9 sm:w-1/3 rounded-2xl bg-slate-100 dark:bg-slate-800 p-7">
          <div className="mb-5 text-2xl font-semibold">Reinvest</div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
              <UsdIcon width={22} />
              <div className="font-semibold">Minted USD balance: </div>
            </div>
            <div className="ml-2 text-gray-600 dark:text-gray-200">
              {profile.balance.toLocaleString("en-EN")}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <UsdIcon width={22} />
              <div className="font-semibold">Referral commissions: </div>
            </div>
            <div className="ml-2 text-gray-600 dark:text-gray-200">
              {priceFetching
                ? "..."
                : usdReferralCommission.toLocaleString("en-EN")}
            </div>
          </div>
          <div className="pl-6 mb-2 text-gray-600 dark:text-gray-200">
            <span className="text-sm text-gray-400">
              1 CAKE ~ {usdtPrice ? Number(usdtPrice) : "..."} USDT
            </span>
          </div>
          <hr className="border-gray-700 mt-2 mb-4" />
          <div className="flex items-center mb-4">
            <Checkbox
              checked={enabled}
              onChange={() => setEnabled((prev) => !prev)}
            />
            <span className="ml-2">Enable automation reinvest</span>
          </div>
          {enabled && (
            <div>
              <div className="mb-5">
                <div className="mb-1 flex items-center">
                  <div className="font-semibold">Invest amount:</div>
                </div>
                <TextInput value={amount} onChange={onChange} />
              </div>
              <div className="mb-4">
                <p className="mb-1 text-gray-400">You will receive:</p>
                <p className="text-gray-500 text-sm flex justify-between max-w-[160px]">
                  <span>Hash power:</span>
                  <span className="dark:text-gray-400 text-gray-600 font-bold">
                    {calcHashPower()} TH/s
                  </span>
                </p>
                <p className="text-gray-500 text-sm flex justify-between max-w-[160px]">
                  <span>Daily income:</span>
                  <span className="dark:text-gray-400 text-gray-600 font-bold">
                    {Number(
                      (amount * settings.dailyIncomePercent) / 100
                    ).toLocaleString("en-EN", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    $
                  </span>
                </p>
                <p className="text-gray-500 text-sm flex justify-between max-w-[160px]">
                  <span>Monthly income:</span>
                  <span className="dark:text-gray-400 text-gray-600 font-bold">
                    {Number(
                      (amount * settings.monthlyIncomePercent) / 100
                    ).toLocaleString("en-EN", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    $
                  </span>
                </p>
              </div>
              <div className="flex flex-col justify-center mb-4">
                <Button
                  className="text-medium min-w-[120px] text-white"
                  color="success"
                  onClick={onSubmit}
                  disabled={priceFetching || !enabled}
                >
                  <ReinvestIcon width={20} className="mr-2 text-white" />
                  Submit
                </Button>
              </div>
              <div className="text-center font-semibold">
                Minimal invest: {settings.minAmount}$
              </div>
            </div>
          )}
          {!enabled && (
            <div className="flex flex-col justify-center mb-4">
              <Button
                className="text-medium min-w-[120px] text-white"
                color="success"
                onClick={onSubmit}
                disabled={!profile.autoReinvestEnabled}
              >
                <SaveIcon width={20} className="mr-2 text-white" />
                Save
              </Button>
            </div>
          )}
          {errorMsg && (
            <Alert
              color="failure"
              className="mt-4 font-medium"
              onDismiss={() => setErrorMsg("")}
            >
              {errorMsg}
            </Alert>
          )}
        </div>
        <div className="sm:w-2/3 rounded-2xl bg-slate-100 dark:bg-slate-800 p-7">
          <div className="mb-5 text-2xl font-semibold">Reinvest history:</div>
          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableHeadCell>№</TableHeadCell>
                <TableHeadCell>USD</TableHeadCell>
                <TableHeadCell>Quantity</TableHeadCell>
                <TableHeadCell>Amount</TableHeadCell>
                <TableHeadCell>Date</TableHeadCell>
              </TableHead>
              <TableBody className="w-screen divide-y">
                {iItems.map((t: InvestHisstory, index: number) => (
                  <ReinvestItem key={index} data={t} index={index + 1} />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

type InvestHisstoryProps = {
  index: number;
  data?: InvestHisstory;
};
const ReinvestItem = ({ index, data }: InvestHisstoryProps) => {
  return (
    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {index}
      </TableCell>
      <TableCell>
        {data
          ? Number(data.amount / data.quantity).toLocaleString("vi", {
              maximumFractionDigits: 2,
            })
          : "..."}
      </TableCell>
      <TableCell>{data?.quantity ?? "..."}</TableCell>
      <TableCell>{data?.amount ?? "..."}</TableCell>
      <TableCell>
        {data ? moment(data.createdAt).format("HH:mm DD/MM/YYYY") : "..."}
      </TableCell>
    </TableRow>
  );
};
