import { InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import { Card } from "flowbite-react";
import router from "next/router";
import axios from "axios";

import { Product } from "@/libs/types/product";
import { PaymentWallet } from "@/libs/types/wallet";

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
    return {
      redirect: {
        destination: "/500",
      },
    };
  }
};

export default function BuyOnePage({
  product,
  wallets,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const session = useSession();
  const onOrder = async (walletId: string) => {
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
    if (res.status === 201) {
      router.push(`invoice/${res.data.code}`);
    }
  };

  return (
    <div className="flex py-8">
      <Card className="w-5/12 bg-slate-100 rounded-2xl mr-8">
        <div className="flex flex-col items-center">
          <div className="mb-5 text-2xl font-semibold">{product.name}</div>
          <img src="https://kufarm.io/static/kufarm/prod1.png" alt="" />
        </div>
        <div className="mb-3 flex items-center">
          <img src="https://kufarm.io/static/kufarm/settings.svg" alt="" />
          <div className="ml-2 font-medium text-gray-400">
            Hashpower: {product.hashPower.toLocaleString("en-EN")} TH/S
          </div>
        </div>
        <div className="flex items-center mb-3">
          <img src="https://kufarm.io/static/kufarm/fire.svg" alt="" />
          <div className="ml-2 font-medium text-gray-400">
            Daily Income: {Number(product.dailyIncome).toLocaleString("en-EN")}$
          </div>
        </div>
        <div className="flex items-center mb-3">
          <img src="https://kufarm.io/static/kufarm/time.svg" alt="" />
          <div className="ml-2 font-medium text-gray-400">
            Monthly Income:{" "}
            {Number(product.monthlyIncome).toLocaleString("en-EN")}$
          </div>
        </div>
        <div className="flex items-center text-xl">
          <img src="https://kufarm.io/static/kufarm/btc.svg" alt="" />
          <div className="ml-2 font-medium text-gray-400">Price:</div>
          <span className="ml-2 font-semibold">
            {product.price.toLocaleString("en-EN")}$
          </span>
        </div>
      </Card>

      <Card className="w-7/12 bg-slate-100 rounded-2xl justify-start">
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
        <div className="grid grid-cols-3 gap-4">
          {wallets.map((w: PaymentWallet) => (
            <button
              key={w.id}
              className="flex rounded-xl"
              onClick={() => onOrder(w.id)}
            >
              <img src={w.image} alt="" />
              <span>{w.name}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
