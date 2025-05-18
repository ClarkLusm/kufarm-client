import axios from "axios";
import { getSession } from "next-auth/react";

export async function sendReinvest(enabled: boolean, amount: number) {
  const session = await getSession();
  return axios.post(
    process.env.API_URL + "/api/account/reinvests",
    {
      autoReinvest: enabled,
      amount: Number(amount),
    },
    {
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
    }
  );
}
