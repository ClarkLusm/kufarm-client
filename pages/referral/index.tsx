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
import { getSession } from "next-auth/react";
import axios from "axios";
import moment from "moment";

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);
  const reqOptions = {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  };
  try {
    const [profileRes, referralRes] = await Promise.all([
      axios.get(`${process.env.API_URL}/api/account/profile`, reqOptions),
      axios.get(`${process.env.API_URL}/api/account/referrals`, reqOptions),
    ]);
    return {
      props: {
        profile: profileRes.data,
        users: referralRes.data.data,
        total: referralRes.data.total,
        withdrawTotal: referralRes.data.withdrawTotal,
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
  profile,
  users,
  total,
  withdrawTotal,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
            <h4 className="text-gray-400">Total Earnings / Total Investment</h4>
            <span className="text-md">
              {profile?.referralCommission} / {withdrawTotal}
            </span>
          </div>
          <div className="relative grid-item p-4 border rounded-xl bg-white dark:bg-gray-900">
            <h4 className="text-gray-400">Referral link</h4>
            <span className="text-md flex items-center overflow-hidden">
              <span>
                {process.env.NEXTAUTH_URL}/referral/
                {profile?.referralCode ?? ""}
              </span>
              <Clipboard.WithIcon
                className="top-12 mt-1 bg-white dark:bg-slate-900"
                valueToCopy={`${process.env.NEXTAUTH_URL}/referral/${
                  profile?.referralCode ?? ""
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
              <TableHeadCell>Withdraw Amount</TableHeadCell>
              <TableHeadCell>Commission Amount</TableHeadCell>
              <TableHeadCell>Coin</TableHeadCell>
              <TableHeadCell>Latest withdraw</TableHeadCell>
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
      <TableCell align="center">{data?.level || "..."}</TableCell>
      <TableCell align="right">
        {data ? data.withdrawValue || 0 : "..."}
      </TableCell>
      <TableCell align="right">{data ? data.btco2Value || 0 : "..."}</TableCell>
      <TableCell align="center">{data ? "BTCO2" : "..."}</TableCell>
      <TableCell align="center">
        {data
          ? data.updatedAt
            ? moment(data.updatedAt).format("YYYY/MM/DD HH:mm")
            : "-"
          : "..."}
      </TableCell>
    </TableRow>
  );
};
