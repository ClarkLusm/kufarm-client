import axios from "axios";

export async function activeAccount(token: string) {
  return axios.post(process.env.API_URL + "/api/auth/active-account", {
    token,
  });
}
