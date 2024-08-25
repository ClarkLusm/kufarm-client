"use client";

import { Alert, Button, Modal, Spinner } from "flowbite-react";
import { useSession } from "next-auth/react";
import { FaCheckCircle } from "react-icons/fa";
import router from "next/router";
import { useState } from "react";
import axios from "axios";

type DialogProps = {
  show: boolean;
  onClose: Function;
  data: {
    amount: number;
    transactionFee: number;
    withdrawTo: string;
  };
};
export function WithdrawConfirmDialog({ show, onClose, data }: DialogProps) {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.API_URL}/api/account/withdraw`,
        { amount: data.amount - data.transactionFee },
        {
          headers: {
            Authorization: `Bearer ${session?.data?.accessToken}`,
          },
        }
      );
      setSuccess(true);
    } catch (error: any) {
      setErrorMsg(
        error?.response?.data?.message ||
          "The server is busy. Please try again later!"
      );
    } finally {
      setLoading(false);
    }
  };

  const closeDialog = () => {
    if (success) {
      router.reload();
    }
    onClose(false);
  };

  return (
    <>
      <Modal show={show} onClose={closeDialog}>
        <Modal.Header>
          {success ? "Withdraw Successful" : "Withdraw Confirmation"}
        </Modal.Header>
        {success ? (
          <div className="space-y-4 pb-6 flex flex-col items-center">
            <FaCheckCircle className="inline-block my-4 text-7xl text-green-400" />
            <p className="text-2xl">
              <span className="font-bold">
                {data.amount.toLocaleString("en-EN", {
                  maximumFractionDigits: 5,
                })}
              </span>
              <span className="ml-2">BITCO2</span>
            </p>
            <p className="text-center">
              has been withdrawn to your wallet address{" "}
              <span className="font-semibold">{data.withdrawTo}</span>.<br />
            </p>
            <Button color="gray" onClick={() => router.push("/dashboard")}>
              Back to dashboard
            </Button>
          </div>
        ) : (
          <>
            <Modal.Body>
              <div className="space-y-4">
                <p className="font-semibold">Withdraw to</p>
                <p className="flex justify-between text-gray-500 dark:text-gray-400">
                  {data.withdrawTo}
                </p>
                <p className="font-semibold">Details</p>
                <p className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Amount: </span>
                  <span>
                    {data.amount.toLocaleString("en-EN", {
                      maximumFractionDigits: 5,
                    })}{" "}
                    BITCO2
                  </span>
                </p>
                <p className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Transaction fee:</span>
                  <span>
                    -
                    {data.transactionFee.toLocaleString("en-EN", {
                      maximumFractionDigits: 5,
                    })}
                    <span className="ml-2">BITCO2</span>
                  </span>
                </p>
                <p className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Net amount:</span>
                  <span>
                    {(data.amount - data.transactionFee).toLocaleString(
                      "en-EN",
                      { maximumFractionDigits: 5 }
                    )}
                    <span className="ml-2">BITCO2</span>
                  </span>
                </p>
              </div>
              {!!errorMsg && (
                <Alert color="failure">
                  <span className="">{errorMsg}</span>
                </Alert>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={onSubmit}>
                {loading ? (
                  <>
                    <Spinner aria-label="Spinner button example" size="sm" />
                    <span className="pl-3">Processing...</span>
                  </>
                ) : (
                  "SUBMIT"
                )}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
}
