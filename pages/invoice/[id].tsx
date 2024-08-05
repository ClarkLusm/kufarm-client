import { Button, Clipboard, Label } from "flowbite-react";
import { InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Link from "next/link";
// import QRCode from "qrcode.react";
import Image from "next/image";

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
  chainId?: string;
  network?: string;
  signer?: ethers.JsonRpcSigner;
}

export default function Withdraw({
  invoice,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [accountData, setAccountData] = useState<AccountType>({});
  const amount = invoice.amount / (invoice.coin === "USDT" ? 1 : 1e18);
  const _connectToMetaMask = useCallback(async () => {
    const ethereum = window.ethereum;
    // Check if MetaMask is installed
    if (typeof ethereum !== "undefined") {
      try {
        // Request access to the user's MetaMask accounts
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        // Get the connected Ethereum address
        const address = accounts[0];
        // Create an ethers.js provider using the injected provider from MetaMask
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        // Get the account balance
        const balance = await provider.getBalance(address);
        // Get the network ID from MetaMask
        const network = await provider.getNetwork();
        //TODO: Check supported network
        // Update state with the results
        setAccountData({
          address,
          signer,
          balance: ethers.formatEther(balance),
          // The chainId property is a bigint, change to a string
          chainId: network.chainId.toString(),
          network: network.name,
        });
      } catch (error: Error | any) {
        alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
      }
    } else {
      alert("MetaMask not installed");
    }
  }, []);

  const sendTransaction = useCallback(async () => {
    try {
      // Create a transaction object
      const tx = {
        to: invoice.walletAddress,
        value: ethers.parseEther(invoice.amount.toString()),
        gasLimit: 21000,
      };

      // Send the transaction
      const txResponse = await accountData?.signer?.sendTransaction(tx);
      console.log("Transaction sent:", txResponse?.hash);
      return txResponse;
    } catch (error) {
      console.error("Error sending transaction:", error);
      throw error;
    }
  }, [accountData]);

  return (
    <div className="m-auto my-5 w-3/4 rounded-t-3xl border bg-white">
      <div className="m-auto mb-10 w-4/6 rounded-2xl p-10 shadow-xl">
        <div className="mb-5 flex justify-between">
          <div className="text-xl font-medium">Invoice ID #{invoice?.code}</div>
          {invoice.status === 0 && (
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
        {/* <div className="text-center my-4">
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
        </div> */}
        <Button
          onClick={accountData.signer ? sendTransaction : _connectToMetaMask}
          className="bg-black text-white p-4 rounded-lg"
        >
          {accountData.signer ? "Submit" : "Connect to MetaMask"}
        </Button>
      </div>
    </div>
  );
}
