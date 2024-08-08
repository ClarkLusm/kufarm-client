import { Alert, Button, Clipboard, Label } from "flowbite-react";
import { getSession } from "next-auth/react";
import { useCallback } from "react";
import { InferGetServerSidePropsType } from "next";
import { ethers, BrowserProvider, Contract } from "ethers";
import {
  useWeb3Modal,
  useSwitchNetwork,
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";

import tokenABI from "@/libs/abis/USDT_test.abi.json";
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
  } catch (error: any) {
    console.error(error);
    return error?.response?.status === 404
      ? {
          notFound: true,
        }
      : {
          redirect: {
            destination: "/buy",
          },
        };
  }
};

export interface AccountType {
  address?: string;
  balance?: string;
  chainId?: number;
  network?: string;
  signer?: ethers.JsonRpcSigner;
}

export default function ({
  invoice,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { switchNetwork } = useSwitchNetwork();
  const formattedAmount = ethers.formatUnits(
    invoice.amount.toString(),
    invoice.decimals
  );

  const sendTransaction = useCallback(async () => {
    if (!walletProvider) return;
    const ethersProvider = new BrowserProvider(walletProvider!);
    try {
      const signer = await ethersProvider.getSigner(address);
      // // The Contract object
      const tokenContract = new Contract(
        invoice.contractAddress,
        tokenABI,
        signer
      );
      const tx = await tokenContract.transfer(
        invoice.walletAddress,
        ethers.parseUnits(invoice.amount.toString(), invoice.decimals)
      );
      await tx.wait();
      console.log(tx);
    } catch (error) {
      console.error("Error sending transaction:", error);
      throw error;
    }
  }, [walletProvider]);
  console.log(invoice);

  return (
    <div className="m-auto my-5 w-3/4 rounded-t-3xl border bg-white">
      {chainId !== invoice.chainId && (
        <div className="mx-auto my-4 w-4/6">
          <Alert color="failure">
            <span>The payment method you choose is only supported in</span>
            <button
              className="font-bold ml-2"
              onClick={() => switchNetwork(invoice.chainId)}
            >
              {NETWORKS[invoice?.chainId]?.name}
            </button>
          </Alert>
        </div>
      )}
      <div className="m-auto mb-10 w-4/6 rounded-2xl p-10 shadow-xl">
        <div className="mb-5 flex justify-between">
          <div className="text-xl font-medium">Invoice ID #{invoice?.code}</div>
          {invoice?.status === 0 && (
            <span className="text-orange-400 font-semibold">Waiting...</span>
          )}
          {invoice.status === 2 && (
            <span className="text-green-400 font-semibold">Success</span>
          )}
        </div>
        <div className="mb-5">
          <div className="flex items-center">
            <Image
              src={`/images/tokens/${invoice?.coin}.png`}
              alt={invoice?.coin}
              width={32}
              height={32}
            />
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
              {formattedAmount}
            </div>
            <Clipboard.WithIcon
              className="absolute right-0 w-auto p-3"
              valueToCopy={formattedAmount}
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
        {isConnected && (
          <>
            {" "}
            <div className="grid bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <h3 className="text-sm font-semibold bg-gray-100 p-2">
                Account button (only when connected)
              </h3>
              <div className="text-xs bg-gray-50 p-2 font-mono overflow-x-auto">
                {'<w3m-account-button balance={"show"} />'}
              </div>
              <div className="flex justify-center items-center p-4">
                <w3m-account-button balance={"show"} />
              </div>
            </div>
            <div className="grid bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <h3 className="text-sm font-semibold bg-gray-100 p-2">
                Account button with balance hidden
              </h3>
              <div className="text-xs bg-gray-50 p-2 font-mono overflow-x-auto">
                {'<w3m-account-button balance={"hide"} />'}
              </div>
              <div className="flex justify-center items-center p-4">
                <w3m-account-button balance={"hide"} />
              </div>
            </div>
          </>
        )}
        <Button
          onClick={() =>
            isConnected
              ? chainId !== invoice.chainId
                ? switchNetwork(invoice.chainId)
                : sendTransaction()
              : open()
          }
          className={`px-4 py-2 font-bold text-white rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:translate-y-0 focus:outline-none bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600`}
        >
          <span className="mr-2 text-xl">🔓</span>
          {isConnected
            ? chainId !== invoice.chainId
              ? "Change Network"
              : "Submit"
            : "Connect Wallet"}
        </Button>
      </div>
    </div>
  );
}
