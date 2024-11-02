import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import axios from "axios";

import { shortAddress } from "@/utils";
import { Order } from "@/libs/types/order";

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);
  try {
    const resp = await axios.get(`${process.env.API_URL}/api/account/orders`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    return {
      props: {
        orders: resp?.data?.data,
        total: resp?.data?.total,
        tokens: resp?.data?.tokens,
      },
    };
  } catch (error: any) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export default function OrderPage({
  orders,
  total,
  tokens,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const orderItems =
    orders.length >= 7
      ? orders
      : [...orders, ...new Array(7 - orders.length).fill(null)];

  return (
    <div className="p-4 flex">
      <div className="w-full rounded-2xl bg-slate-100 dark:bg-slate-900">
        <div className="mb-5 text-2xl font-semibold">Order history:</div>
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableHeadCell>№</TableHeadCell>
              <TableHeadCell>Product</TableHeadCell>
              <TableHeadCell>Wallet</TableHeadCell>
              <TableHeadCell>Amount</TableHeadCell>
              <TableHeadCell>Coin</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
            </TableHead>
            <TableBody className="w-screen divide-y">
              {orderItems.map((t: Order, index: number) => {
                let data;
                if (t) {
                  data = Object.assign({}, t);
                  data.amount =
                    t.amount / Math.pow(10, tokens[t.coin].decimals);
                }
                return <OrderItem key={index} data={data} index={index + 1} />;
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

type OrderStatus = {
  [key: number]: string;
};

const status: OrderStatus = {
  0: "Pending",
  1: "Error",
  2: "Success",
};

type TransactionProps = {
  index: number;
  data?: Order;
};
const OrderItem = ({ index, data }: TransactionProps) => {
  return (
    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {index}
      </TableCell>
      <TableCell>{data?.product ? data?.product.name : "..."}</TableCell>
      <TableCell>
        {data?.user ? shortAddress(data.user.walletAddress) : "..."}
      </TableCell>
      <TableCell suppressHydrationWarning>
        {data?.amount ? data.amount.toLocaleString("en-EN") : "..."}
      </TableCell>
      <TableCell>{data?.coin ?? "..."}</TableCell>
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
