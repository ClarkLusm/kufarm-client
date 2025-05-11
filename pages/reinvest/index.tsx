import {
  Alert,
  Badge,
  Button,
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

import BtcIcon from "@/icons/btc.svg";
import UsdIcon from "@/icons/usd.svg";
import WalletIcon from "@/icons/wallet.svg";

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
    console.log(settingRes);
    
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
  const [amount, setAmount] = useState(settings.amount);
  const [errorMsg, setErrorMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [usdReferralCommission, setUsdReferralCommission] = useState(0);
  const [usdtPrice, setUsdtPrice] = useState(0);
  const [priceFetching, setPriceFetching] = useState(false);

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
      setErrorMsg("Withdrawal amount is less than the minimum!");
    } else {
      setOpenModal(true);
    }
  };

  const onChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, "");
    setAmount(value);
    if (errorMsg) setErrorMsg("");
  };

  return (
    <div className="p-4 sm:flex">
      <div className="mb-4 sm:mb-0 sm:mr-9 sm:w-1/3 rounded-2xl bg-slate-100 dark:bg-slate-800 p-7">
        <div className="mb-5 text-2xl font-semibold">Reinvest</div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <UsdIcon width={22} />
            <div className="ml-2 font-semibold">Your USD balance: </div>
          </div>
          <div className="ml-2 text-gray-600 dark:text-gray-200">
            {profile.balance.toLocaleString("en-EN")}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BtcIcon width={24} />
            <div className="ml-2 font-semibold">Referral commission: </div>
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
        <div className="mb-5">
          <div className="mb-2 flex items-center">
            <BtcIcon width={24} />
            <div className="ml-2 font-semibold">Invest amount:</div>
          </div>
          <TextInput value={amount} onChange={onChange} />
        </div>
        <div className="mb-4">
          <p className="mb-2 font-semibold">You will receive:</p>
          <p className="text-gray-400">Hash power: {(amount * settings.hashPower) / 100} TH/s</p>
          <p className="text-gray-400">Daily income: {(amount * settings.dailyIncome) / 100} $</p>
          <p className="text-gray-400">Monthly income: {(amount * settings.monthlyIncome) / 100} $</p>
        </div>
        <div className="flex justify-center mb-4">
          <Button
            className="text-medium min-w-[120px] text-white"
            color="success"
            onClick={onSubmit}
            disabled={priceFetching}
          >
            <WalletIcon width={20} className="mr-2" />
            Auto Reinvest
          </Button>
        </div>
        <div className="text-center font-semibold">
          Minimal invest: {settings.amount} $
        </div>
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
              <TableHeadCell>Amount</TableHeadCell>
              <TableHeadCell>Date</TableHeadCell>
            </TableHead>
            <TableBody className="w-screen divide-y">
              {iItems.map((t: Transaction, index: number) => (
                <ReinvestItem key={index} data={t} index={index + 1} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

type TransactionProps = {
  index: number;
  data?: Transaction;
};
const ReinvestItem = ({ index, data }: TransactionProps) => {
  return (
    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {index}
      </TableCell>
      <TableCell>
        
      </TableCell>
      <TableCell>{data?.coin ?? "..."}</TableCell>
      <TableCell>
        
      </TableCell>
    </TableRow>
  );
};
