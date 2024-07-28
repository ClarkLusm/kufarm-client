import { Clipboard, Label } from "flowbite-react";
import { InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import QRCode from "qrcode.react";

import { NETWORKS } from "@/libs/constants";

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);
  const { id } = ctx.query;
  try {
    const res = await axios.get(
      `${process.env.API_URL}/api/account/invoice/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return {
      props: {
        invoice: res.data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/buy",
      },
    };
  }
};

export default function Withdraw({
  invoice,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const amount = invoice.amount / (invoice.coin === "USDT" ? 1 : 1e18);
  return (
    <div className="m-auto my-5 w-3/4 rounded-t-3xl border bg-white">
      <div className="m-auto mb-10 w-4/6 rounded-2xl p-10 shadow-xl">
        <div className="mb-5 flex justify-between">
          <div className="text-xl font-medium">Invoice ID #{invoice?.code}</div>
          {invoice.status === 0 && <span className="text-orange-400 font-semibold">Waiting...</span>}
          {invoice.status === 2 && <span className="text-green-400 font-semibold">Success</span>}
        </div>
        <div className="mb-5">
          <div className="flex items-center">
            <div className="size-10 rounded-3xl bg-slate-400">
              <svg
                className="ml-2 mt-2 size-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m8 10 4-6 4 6H8Zm8 4-4 6-4-6h8Z"
                />
              </svg>
            </div>
            <div className="ml-2 text-xl font-medium">{invoice?.coin}</div>
          </div>
        </div>
        <div className="mb-5">
          <div className="mb-2 block">
            <Label
              htmlFor="small"
              value={`Amount (approx: $${Number(invoice.price).toLocaleString(
                "en-EN"
              )}) :`}
            />
          </div>
          <div className="relative flex">
            <div className="border p-2 bg-white rounded-lg text-md w-full text-grey">
              {Number(amount).toLocaleString("en-EN")}
            </div>
            <Clipboard.WithIcon
              className="absolute right-0 w-auto p-3"
              valueToCopy={amount.toString()}
            />
          </div>
        </div>
        <div className="mb-5">
          <div className="mb-2 block">
            <Label
              htmlFor="small"
              value={`Wallet address(${invoice.coin}): :`}
            />
          </div>
          <div className="relative flex">
            <div className="border p-2 bg-white rounded-lg w-full">
              {invoice.walletAddress}
            </div>
            <Clipboard.WithIcon
              className="absolute right-0 w-auto p-3"
              valueToCopy={invoice.walletAddress}
            />
          </div>
        </div>
        <Link
          target="_blank"
          href={`${NETWORKS[56]?.explorerUrl}/${invoice.walletAddress}`}
          className="text-sky-500 underline"
        >
          Check Explorer...
        </Link>
        <div className="text-center my-4">
          <div className="flex justify-center">
            <QRCode
              id="qrcode"
              value={invoice.walletAddress}
              size={290}
              level={"H"}
              includeMargin={true}
            />
          </div>
          <div className="font-medium">Scan QR</div>
          <div className="font-medium">code for payment</div>
        </div>
      </div>
    </div>
  );
}
