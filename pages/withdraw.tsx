import { Transaction } from "@/libs/types/transaction";
import { UserProfile } from "@/libs/types/user";
import {
  Button,
  Navbar,
  NavbarLink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import axios from "axios";

type Resp = {
  profile?: UserProfile;
  transactions?: Transaction[];
  total: number;
};

export const getServerSideProps = (async (ctx) => {
  const session = await getSession(ctx);
  const reqOptions = {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  };

  try {
    const [profileRes, withdrawRes] = await Promise.all([
      axios.get(`${process.env.API_URL}/api/account/profile`, reqOptions),
      axios.get(`${process.env.API_URL}/api/account/withdraws`, reqOptions),
    ]);
    return {
      props: {
        profile: profileRes.data,
        transactions: withdrawRes.data.data,
        total: withdrawRes.data.total,
      },
    };
  } catch (error) {
    return {
      props: {
        profile: {},
        transactions: [],
        total: [],
      },
    };
  }
}) satisfies GetServerSideProps<Resp>;

export default function Withdraw({
  profile,
  transactions,
  total,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const transItems =
    transactions.length >= 7
      ? transactions
      : [...transactions, ...new Array(7 - transactions.length).fill(null)];

  return (
    <div className="my-10 flex">
      <div className="mr-9 w-1/3 rounded-2xl bg-slate-100 p-7">
        <div className="mb-5 text-2xl font-semibold">Withdraw Panel</div>
        <div className="mb-5 flex items-center">
          <img src="https://kufarm.io/static/kufarm/email2.svg" alt="" />
          <div className="ml-2 font-semibold">Email:</div>
          <div className="ml-2 text-gray-400">{profile.email}</div>
        </div>
        <div className="mb-5 flex items-center">
          <img src="https://kufarm.io/static/kufarm/btc.svg" alt="" />
          <div className="ml-2 font-semibold">Your Balance: </div>
          <div className="ml-2 text-gray-400">{profile.balance} USD</div>
        </div>
        <div className="mb-5">
          <div className="mb-5 flex items-center">
            <img src="https://kufarm.io/static/kufarm/wallet.svg" alt="" />
            <div className="ml-2 font-semibold">Bitcoin wallet address:</div>
          </div>
          <TextInput disabled value={profile.walletAddress} />
        </div>
        <div className="mb-5">
          <div className="mb-5 flex items-center">
            <img src="https://kufarm.io/static/kufarm/btc.svg" alt="" />
            <div className="ml-2 font-semibold">Withdraw amount:</div>
          </div>
          <TextInput defaultValue="0.0001" />
        </div>
        <Navbar className="ml-36 list-none bg-transparent">
          <NavbarLink href="#">
            <Button color="success" className="flex items-center">
              <img src="https://kufarm.io/static/kufarm/wallet2.svg" alt="" />
              <div className="ml-2">Withdraw</div>
            </Button>
          </NavbarLink>
        </Navbar>
        <div className="text-center font-semibold">
          Minimal withdraw: 0.0001 BTC
        </div>
      </div>
      <div className="w-2/3 rounded-2xl bg-slate-100 p-7">
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
                <TransactionItem data={t} index={index + 1} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
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
      <TableCell>{data?.walletAddress ?? "..."}</TableCell>
      <TableCell>{data?.coin ?? "..."}</TableCell>
      <TableCell>{data?.amount ?? "..."}</TableCell>
      <TableCell>{data?.status ? status?.[data?.status] : "..."}</TableCell>
    </TableRow>
  );
};
