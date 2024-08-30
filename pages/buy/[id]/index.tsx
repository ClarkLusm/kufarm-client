import { InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import { Card } from "flowbite-react";
import { useState } from "react";
import router from "next/router";
import axios from "axios";
import Image from "next/image";

import { Product } from "@/libs/types/product";
import GpuIcon from "@/icons/gpu.svg";
import DayIcon from "@/icons/money.svg";
import UsdIcon from "@/icons/usd.svg";
import MonthIcon from "@/icons/money.svg";

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;
  try {
    const [productRes, walletsRes] = await Promise.all([
      fetch(`${process.env.API_URL}/api/products/${id}`),
      fetch(`${process.env.API_URL}/api/payments`),
    ]);
    const product: Product = await productRes.json();
    const wallets: PaymentWallet[] = await walletsRes.json();
    return { props: { product, wallets } };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export default function BuyOnePage({
  product,
  wallets,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const session = useSession();
  const [loading, setLoading] = useState(false);

  const onOrder = async (walletId: string) => {
    setLoading(true);
    const res = await axios.post(
      `${process.env.API_URL}/api/account/order`,
      {
        productId: product.id,
        quantity: 1,
        paymentWalletId: walletId,
      },
      {
        headers: {
          Authorization: `Bearer ${session?.data?.accessToken}`,
        },
      }
    );
    setLoading(false);
    if (res.status === 201) {
      router.push(`/invoice/${res.data.code}`);
    }
  };

  return (
    <div className="p-4 sm:flex sm:py-8">
      <Card className="sm:w-5/12 bg-slate-100 dark:bg-slate-900 rounded-2xl mb-4 sm:mr-8 sm:mb-0">
        <div className="flex flex-col items-center">
          <div className="mb-5 text-2xl font-semibold">{product.name}</div>
          <Image
            src={product.image || ""}
            alt={product.name}
            width={40}
            height={0}
            style={{ height: "auto" }}
          />
        </div>
        <div className="mb-3 flex items-center">
          <GpuIcon width={24} />
          <div className="ml-2 font-medium text-gray-600 dark:text-gray-200">
            Hashpower: {product.hashPower.toLocaleString("en-EN")} TH/S
          </div>
        </div>
        <div className="flex items-center mb-3">
          <DayIcon width={24} />
          <div className="ml-2 font-medium text-gray-600 dark:text-gray-200">
            Daily Income: {Number(product.dailyIncome).toLocaleString("en-EN")}$
          </div>
        </div>
        <div className="flex items-center mb-3">
          <MonthIcon width={24} />
          <div className="ml-2 font-medium text-gray-600 dark:text-gray-200">
            Monthly Income:{" "}
            {Number(product.monthlyIncome).toLocaleString("en-EN")}$
          </div>
        </div>
        <div className="flex items-center text-xl">
          <UsdIcon width={24} />
          <div className="ml-2 font-medium text-gray-600 dark:text-gray-200">
            Price:
          </div>
          <span className="ml-2 font-semibold">
            {product.price.toLocaleString("en-EN")}$
          </span>
        </div>
      </Card>

      <Card className="sm:w-7/12 bg-slate-100 dark:bg-slate-900 rounded-2xl justify-start">
        <h3 className="font-bold">Select Payment Method:</h3>
        <p>
          To pay, select the cryptocurrency you want to pay and scan QR code
          through your mobile wallet.
        </p>
        <p>
          Remember, all mining payments will be sent in Bitcoin to your kufarm
          account.
        </p>
        <p>
          Payment is verified within 1 minute after the transaction appears in
          the blockchain network. Refresh the home page of site.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {wallets.map((w: PaymentWallet) => (
            <button
              key={w.id}
              className="flex items-center rounded-xl border p-2 hover:border-green-400"
              onClick={() => onOrder(w.id)}
              disabled={loading}
            >
              <img
                src={`/images/tokens/${w.coin}.png`}
                alt={w.name}
                width={32}
                className="mr-2"
              />
              <span className="font-semibold">{w.name}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
