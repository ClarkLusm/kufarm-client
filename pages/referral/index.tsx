import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Clipboard,
} from "flowbite-react";
import { InferGetServerSidePropsType } from "next";
import { getSession, useSession } from "next-auth/react";
import { ethers } from "ethers";
import axios from "axios";

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);
  try {
    const resp = await axios.get(
      `${process.env.API_URL}/api/account/referrals`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return {
      props: {
        users: resp?.data?.data,
        total: resp?.data?.total,
      },
    };
  } catch (error: any) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export default function ReferralPage({
  users,
  total,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = useSession();
  const usersFormatted =
    users.length >= 7
      ? users
      : [...users, ...new Array(7 - users.length).fill(null)];

  return (
    <div className="">
      <div className="rounded-2xl bg-slate-100 dark:bg-slate-900 p-4">
        <div className="mb-5 text-2xl font-semibold">Referral</div>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div className="grid-item p-4 border rounded-xl bg-white dark:bg-gray-900">
            <h4 className="text-gray-400">Number of Friends Signed Up</h4>
            <span className="text-md">{total}</span>
          </div>
          <div className="grid-item p-4 border rounded-xl bg-white dark:bg-gray-900">
            <h4 className="text-gray-400">Total Earnings BTCO2</h4>
            <span className="text-md">{data?.user.referralCommission}</span>
          </div>
          <div className="relative grid-item p-4 border rounded-xl bg-white dark:bg-gray-900">
            <h4 className="text-gray-400">Referral link</h4>
            <span className="text-md flex items-center overflow-hidden">
              <span>
                {process.env.NEXTAUTH_URL}/referral/
                {data?.user.referralCode ?? ""}
              </span>
              <Clipboard.WithIcon
                className="top-12 mt-1 bg-white dark:bg-slate-900"
                valueToCopy={`${process.env.NEXTAUTH_URL}/referral/${
                  data?.user.referralCode ?? ""
                }`}
              />
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableHeadCell>№</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Fn</TableHeadCell>
              <TableHeadCell>Amount</TableHeadCell>
              <TableHeadCell>Coin</TableHeadCell>
            </TableHead>
            <TableBody className="w-screen divide-y">
              {usersFormatted.map((t: ReferralUser, index: number) => (
                <UserItem key={index} data={t} index={index + 1} />
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
  data?: ReferralUser;
};
const UserItem = ({ index, data }: TransactionProps) => {
  return (
    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {index}
      </TableCell>
      <TableCell>{data?.email || "..."}</TableCell>
      <TableCell>{data?.level || "..."}</TableCell>
      <TableCell>
        {data
          ? data.btco2Value
            ? ethers.formatUnits(data.btco2Value.toString(), 18)
            : 0
          : "..."}
      </TableCell>
      <TableCell>{data ? "BTCO2" : "..."}</TableCell>
    </TableRow>
  );
};
