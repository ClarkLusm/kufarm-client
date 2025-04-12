import axios from "axios";

export async function sendOTP(email: string) {
  return axios.post(process.env.API_URL + "/api/auth/send-login-otp", {
    email,
  });
}
