import { Button, Card } from "flowbite-react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import { Product } from "@/libs/types/product";
import UsdIcon from "@/icons/usd.svg";
import CpuIcon from "@/icons/cpu.svg";
import DayIcon from "@/icons/24h.svg";
import MonthIcon from "@/icons/time-is-money.svg";
import CartIcon from "@/icons/cart.svg";

type Resp = {
  data: Product[];
  total: number;
};

export const getServerSideProps = (async () => {
  const res = await fetch(`${process.env.API_URL}/api/products`);
  const product: Resp = await res.json();
  return { props: { product } };
}) satisfies GetServerSideProps<{ product: Resp }>;

export default function BuyPage({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  return (
    <div className="grid gap-8 sm:grid-cols-2 py-8 px-4 sm:px-0">
      {product.data.map((p) => (
        <Card className="w-full bg-slate-100 rounded-2xl" key={p.id}>
          <div className="flex justify-between">
            <div>
              <div className="mb-5 text-2xl font-semibold">{p.name}</div>
              <div className="mb-3 flex items-center">
                <CpuIcon width={30} height={30} />
                <div className="ml-2 font-medium text-gray-600 dark:text-gray-200">
                  Hashpower: {p.hashPower.toLocaleString("en-EN")} TH/S
                </div>
              </div>
              <div className="flex items-center mb-3">
                <DayIcon width={30} height={30} />
                <div className="ml-2 font-medium text-gray-600 dark:text-gray-200">
                  Daily Income: {Number(p.dailyIncome).toLocaleString("en-EN")}$
                </div>
              </div>
              <div className="flex items-center mb-3">
                <MonthIcon width={30} height={30} />
                <div className="ml-2 font-medium text-gray-600 dark:text-gray-200">
                  Monthly Income:{" "}
                  {Number(p.monthlyIncome).toLocaleString("en-EN")}$
                </div>
              </div>
            </div>
            <Image src={p.image || ""} alt={p.name} />
          </div>
          <div className="flex items-center text-xl">
            <UsdIcon width={30} height={30} />
            <div className="ml-2 font-medium text-gray-600 dark:text-gray-200">Price:</div>
            <span className="ml-2 font-semibold">
              {p.price.toLocaleString("en-EN")}$
            </span>
          </div>
          <Button
            color="success"
            className="items-center"
            onClick={() => router.push(`/buy/${p.alias}`)}
          >
            <CartIcon width={30} height={30} className="mr-2" />
            <span className="text-base">Purchase</span>
          </Button>
        </Card>
      ))}
    </div>
  );
}
