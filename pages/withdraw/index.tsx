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
import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

import { Transaction } from "@/libs/types/transaction";
import { shortAddress } from "@/utils";
import { WithdrawConfirmDialog } from "@/components/ui/withdraw-dialog";
import EmailIcon from "@/icons/email.svg";
import BtcIcon from "@/icons/btc.svg";
import WalletIcon from "@/icons/wallet.svg";

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);
  const reqOptions = {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  };

  try {
    const [profileRes, withdrawRes, settingRes] = await Promise.all([
      axios.get(`${process.env.API_URL}/api/account/profile`, reqOptions),
      axios.get(`${process.env.API_URL}/api/account/withdraws`, reqOptions),
      axios.get(`${process.env.API_URL}/api/app-settings`, reqOptions),
    ]);
    return {
      props: {
        profile: profileRes.data,
        transactions: withdrawRes.data.data,
        total: withdrawRes.data.total,
        settings: settingRes.data,
      },
    };
  } catch (error: any) {
    return {
      notFound: true,
    };
  }
};

export default function WithdrawPage({
  profile,
  transactions,
  total,
  settings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [amount, setAmount] = useState(settings.withdrawMin);
  const [errorMsg, setErrorMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const balanceFormatted = ethers.formatUnits(
    (profile.balanceToken || 0).toString(),
    18
  );
  const transItems =
    transactions.length >= 7
      ? transactions
      : [...transactions, ...new Array(7 - transactions.length).fill(null)];

  const onSubmit = async () => {
    if (Number.isNaN(Number(amount))) {
      setErrorMsg("Invalid amount!");
    } else if (amount > balanceFormatted) {
      setErrorMsg("Your balance is not enough to withdraw!");
    } else if (amount < settings.withdrawMin) {
      setErrorMsg("Withdrawal amount is less than the minimum!");
    } else {
      setOpenModal(true);
    }
  };

  const onChange = (e: any) => {
    setAmount(e.target.value);
    if (errorMsg) setErrorMsg("");
  };

  return (
    <div className="p-4 sm:flex">
      <div className="mb-4 sm:mb-0 sm:mr-9 sm:w-1/3 rounded-2xl bg-slate-100 dark:bg-slate-800 p-7">
        <div className="mb-5 text-2xl font-semibold">Withdraw Panel</div>
        <div className="mb-5 flex items-center">
          <EmailIcon width={20} />
          <div className="ml-2 font-semibold">Email:</div>
          <div className="ml-2 text-gray-600 dark:text-gray-200">
            {profile.email}
          </div>
        </div>
        <div className="flex items-center">
          <BtcIcon width={24} />
          <div className="ml-2 font-semibold">Your Balance: </div>
          <div className="ml-2 text-gray-600 dark:text-gray-200">
            {Number(balanceFormatted).toLocaleString("en-EN", {
              maximumFractionDigits: 5,
            })}{" "}
            BTCO2
          </div>
        </div>
        <div className="pl-6 mb-5">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            (~USD Balance:{" "}
            {profile.balance.toLocaleString("en-EN", {
              maximumFractionDigits: 5,
            })}
            )
          </span>
        </div>
        <div className="mb-5">
          <div className="mb-5 flex items-center">
            <WalletIcon width={24} />
            <div className="ml-2 font-semibold">Wallet address:</div>
          </div>
          <TextInput disabled value={profile.walletAddress} />
        </div>
        <div className="mb-5">
          <div className="mb-5 flex items-center">
            <BtcIcon width={24} />
            <div className="ml-2 font-semibold">Withdraw amount:</div>
          </div>
          <TextInput value={amount} onChange={onChange} />
        </div>
        <div className="flex justify-center mb-4">
          <Button className="text-medium min-w-[120px] text-white" color="success" onClick={onSubmit}>
            <WalletIcon width={20} className="mr-2" />
            Withdraw
          </Button>
        </div>
        <div className="text-center font-semibold">
          Minimal withdraw: {settings.withdrawMin} BTCO2
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
        <div className="mb-5 text-2xl font-semibold">Withdraw history:</div>
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableHeadCell>№</TableHeadCell>
              <TableHeadCell>Wallet</TableHeadCell>
              <TableHeadCell>Coin</TableHeadCell>
              <TableHeadCell>Amount</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
            </TableHead>
            <TableBody className="w-screen divide-y">
              {transItems.map((t: Transaction, index: number) => (
                <TransactionItem key={index} data={t} index={index + 1} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <WithdrawConfirmDialog
        show={openModal}
        data={{
          withdrawTo: profile.walletAddress,
          amount,
          transactionFee: (amount * settings.withdrawFeePercent) / 100,
        }}
        onClose={(status: boolean) => setOpenModal(status)}
      />
    </div>
  );
}

type TransactionStatus = {
  [key: number]: string;
};

const status: TransactionStatus = {
  0: "Pending",
  1: "Error",
  2: "Success",
};

type TransactionProps = {
  index: number;
  data?: Transaction;
};
const TransactionItem = ({ index, data }: TransactionProps) => {
  return (
    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {index}
      </TableCell>
      <TableCell>
        {data?.userAddress ? shortAddress(data.userAddress) : "..."}
      </TableCell>
      <TableCell>{data?.coin ?? "..."}</TableCell>
      <TableCell>
        {data?.amount
          ? data?.coin !== "USD"
            ? (data.amount / 1e18).toLocaleString("en-EN", {
                maximumFractionDigits: 5,
              })
            : data.amount.toLocaleString("en-EN")
          : "..."}
      </TableCell>
      <TableCell>
        {data?.status ? (
          <Badge
            className="inline-flex"
            color={
              data?.status == 2
                ? "success"
                : data?.status == 1
                ? "failure"
                : "warning"
            }
          >
            {status?.[data?.status]}
          </Badge>
        ) : (
          "..."
        )}
      </TableCell>
    </TableRow>
  );
};
