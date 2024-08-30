import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { ethers } from "ethers";
import axios from "axios";

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);
  try {
    const resp = await axios.get(
      `${process.env.API_URL}/api/account/my-referrals`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    console.log(resp.data.data);

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
  const usersFormatted =
    users.length >= 7
      ? users
      : [...users, ...new Array(7 - users.length).fill(null)];

  return (
    <div className="sm:my-10">
      <div className="rounded-2xl bg-slate-100 dark:bg-slate-900 p-7">
        <div className="mb-5 text-2xl font-semibold">Referral:</div>
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableHeadCell>№</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
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
      <TableCell>{data?.user?.email || "..."}</TableCell>
      <TableCell>
        {data?.btco2Value
          ? ethers.formatUnits(data?.btco2Value.toString(), 18)
          : "..."}
      </TableCell>
      <TableCell>{data ? "BTCO2" : "..."}</TableCell>
    </TableRow>
  );
};
