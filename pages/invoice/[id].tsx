import { Alert, Button, Clipboard, Label, Spinner } from "flowbite-react";
import { getSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { InferGetServerSidePropsType } from "next";
import router from "next/router";
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
import { EOrderStatus } from "@/libs/enums/order.enum";

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
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [allowance, setAllowance] = useState(0);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected) getAllowance();
  }, [isConnected]);

  const formattedAmount = ethers.formatUnits(
    invoice.amount.toString(),
    invoice.decimals
  );
  const bigIntAmount = ethers.parseUnits(formattedAmount, invoice.decimals);

  const onClick = () => {
    isConnected
      ? chainId !== invoice.chainId
        ? switchNetwork(invoice.chainId)
        : sendTransaction()
      : open();
  };

  const getTokenContract = useCallback(async () => {
    try {
      const ethersProvider = new BrowserProvider(walletProvider!);
      const signer = await ethersProvider.getSigner(address);
      return new Contract(invoice.contractAddress, tokenABI, signer);
    } catch (error) {
      console.error(error);
    }
  }, [walletProvider, address]);

  async function getAllowance() {
    const tokenContract = await getTokenContract();
    if (!tokenContract) return false;
    const a = await tokenContract.allowance(address, invoice.walletAddress);
    setAllowance(a);
  }

  const sendTransaction = async () => {
    try {
      setLoading(true);
      const tokenContract = await getTokenContract();
      // ("0xaa3d07cbdd5a9b35369b311aa524cfe8864d676444e8a014c943bf9b44314ba4");
      if (allowance < bigIntAmount) {
        await tokenContract?.approve(invoice.contractAddress, bigIntAmount);
      }
      const gasFee = await tokenContract?.transfer.estimateGas(
        invoice.contractAddress,
        bigIntAmount
      );
      const tx = await tokenContract?.transfer(
        invoice.walletAddress,
        bigIntAmount,
        {
          gasLimit: gasFee,
        }
      );
      await tx.wait();
      await payOrderSuccess(tx);
      router.push("/history");
    } catch (error) {
      console.error("Error sending transaction:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  async function payOrderSuccess(tx: any) {
    const session = await getSession();
    return axios.post(
      process.env.API_URL + "/api/account/payorder",
      {
        code: invoice.code,
        walletAddress: invoice.walletAddress,
        tx,
      },
      {
        headers: {
          Authorization: "Bearer " + session?.accessToken,
        },
      }
    );
  }

  if (!hasMounted) return null;

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
          <div className="text-xl font-medium">
            <span>Invoice ID #{invoice.code}</span>
          </div>
          {invoice.status === 0 && (
            <span className="text-orange-400 font-semibold">Waiting...</span>
          )}
          {invoice.status === 2 && (
            <span className="text-green-400 font-semibold">Success</span>
          )}
        </div>
        <div className="mb-5 flex justify-between">
          <div className="flex items-center">
            <Image
              src={`/images/tokens/${invoice?.coin}.png`}
              alt={invoice?.coin}
              width={32}
              height={32}
            />
            <div className="ml-2 text-xl font-medium">{invoice?.coin}</div>
          </div>
          {isConnected && <w3m-account-button balance="hide" />}
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
            <Label htmlFor="small" value={`Wallet address(${invoice.coin}):`} />
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
        {invoice.status === EOrderStatus.success && (
          <Link
            target="_blank"
            href={`${NETWORKS[invoice.chainId]?.explorerUrl}/tx/${
              invoice.txHash
            }`}
            className="text-sky-500 underline"
          >
            View transaction
          </Link>
        )}
        {invoice.status === EOrderStatus.pending && (
          <>
            <Link
              target="_blank"
              href={`${NETWORKS[invoice.chainId]?.explorerUrl}/${
                invoice.walletAddress
              }`}
              className="text-sky-500 underline"
            >
              Check Explorer...
            </Link>
            <Button
              disabled={loading}
              onClick={onClick}
              className={`flex items-center mt-4 px-4 py-2 w-full font-bold text-white rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:translate-y-0 focus:outline-none`}
            >
              {loading && <Spinner className="mr-2" />}
              {isConnected
                ? chainId !== invoice.chainId
                  ? "Change Network"
                  : "Submit"
                : "Connect Wallet"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
