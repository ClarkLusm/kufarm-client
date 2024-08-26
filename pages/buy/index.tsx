import { Button, Card } from "flowbite-react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import { Product } from "@/libs/types/product";

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
                <Image src="/images/icons/settings.svg" alt="" width={30} height={30} />
                <div className="ml-2 font-medium text-gray-400">
                  Hashpower: {p.hashPower.toLocaleString("en-EN")} TH/S
                </div>
              </div>
              <div className="flex items-center mb-3">
                <Image src="/images/icons/fire.svg" alt="" width={30} height={30} />
                <div className="ml-2 font-medium text-gray-400">
                  Daily Income: {Number(p.dailyIncome).toLocaleString("en-EN")}$
                </div>
              </div>
              <div className="flex items-center mb-3">
                <Image src="/images/icons/time.svg" alt="" width={30} height={30} />
                <div className="ml-2 font-medium text-gray-400">
                  Monthly Income:{" "}
                  {Number(p.monthlyIncome).toLocaleString("en-EN")}$
                </div>
              </div>
            </div>
            <Image src="/images/icons/prod1.png" alt="" width={30} height={30} />
          </div>
          <div className="flex items-center text-xl">
            <Image src="/images/icons/btc.svg" alt="" width={30} height={30} />
            <div className="ml-2 font-medium text-gray-400">Price:</div>
            <span className="ml-2 font-semibold">
              {p.price.toLocaleString("en-EN")}$
            </span>
          </div>
          <Button
            color="success"
            className="w-32"
            onClick={() => router.push(`/buy/${p.alias}`)}
          >
            <Image src="/images/icons/cart-icon.svg" alt="" width={30} height={30} className="mr-2" />
            Purchase
          </Button>
        </Card>
      ))}
    </div>
  );
}
