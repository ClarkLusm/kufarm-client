import axios from "axios";
import { getSession } from "next-auth/react";

export async function payOrderSuccess(
  code: string,
  walletAddress: string,
  tx: any
) {
  const session = await getSession();
  return axios.post(
    process.env.API_URL + "/account/payorder",
    {
      code,
      walletAddress,
      tx,
    },
    {
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
    }
  );
}
