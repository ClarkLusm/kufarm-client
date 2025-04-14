import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Clipboard,
  Pagination,
} from "flowbite-react";
import { useState } from "react";
import { InferGetServerSidePropsType } from "next";
import { getSession, useSession } from "next-auth/react";
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
        totalPage: referralRes.data.totalPage,
        investTotal: referralRes.data.investTotal,
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
  totalPage,
  investTotal,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();
  const [usersFormatted, setUsersFormatted] = useState(
    users.length >= 7
      ? users
      : [...users, ...new Array(7 - users.length).fill(null)]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
    axios
      .get(`${process.env.API_URL}/api/account/referrals?page=${page}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setUsersFormatted(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
            <h4 className="text-gray-400">Total Investment USDT</h4>
            <span className="text-md">
              {Number(investTotal).toLocaleString("en-EN")}
            </span>
          </div>
          <div className="relative grid-item p-4 border rounded-xl bg-white dark:bg-gray-900">
            <h4 className="text-gray-400">Referral link</h4>
            {profile.referralCode ? (
              <span className="text-md flex items-center overflow-hidden">
                <span>
                  {process.env.NEXTAUTH_URL}/referral/
                  {profile.referralCode}
                </span>
                <Clipboard.WithIcon
                  className="top-12 mt-1 bg-white dark:bg-slate-900"
                  valueToCopy={`${process.env.NEXTAUTH_URL}/referral/${profile.referralCode}`}
                />
              </span>
            ) : (
              <span className="text-md text-gray-400 italic text-sm overflow-hidden">
                {"You haven't bought TH/S yet"}
              </span>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableHeadCell>№</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Fn</TableHeadCell>
              <TableHeadCell>Commission Amount</TableHeadCell>
              <TableHeadCell>Coin</TableHeadCell>
              <TableHeadCell>Latest withdraw</TableHeadCell>
            </TableHead>
            <TableBody className="w-screen divide-y">
              {usersFormatted.map((t: ReferralUser, index: number) => (
                <UserItem
                  key={index}
                  data={t}
                  index={(currentPage - 1) * 20 + index + 1}
                />
              ))}
            </TableBody>
          </Table>
        </div>
        {totalPage > 1 && (
          <div className="flex overflow-x-auto sm:justify-center mt-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPage}
              onPageChange={onPageChange}
            />
          </div>
        )}
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
        {data ? Number(data.cakeValue || 0).toLocaleString("en-EN") : "..."}
      </TableCell>
      <TableCell align="center">{data ? "CAKE" : "..."}</TableCell>
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
