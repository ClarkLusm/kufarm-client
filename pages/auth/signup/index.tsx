import { Button, Checkbox, Label, Alert, TextInput } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import { schema } from "./schema";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

type Inputs = {
  username: string;
  email: string;
  password: string;
  rePassword: string;
  referralId?: string;
  walletAddress: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    axios
      .post(`${process.env.API_URL}/api/auth/signup`, data)
      .then((_) => {
        setSuccessful(true);
        setTimeout(() => {
          router.push("/auth/signin");
        }, 2000);
      })
      .catch((error) => {
        setMessage(error?.response?.data?.message || "Server is busy");
      });
  };

  const onChange = () => {
    if (message) setMessage("");
  };

  return (
    <div className="container m-auto py-16 pt-24">
      <div className="m-auto w-1/3 list-none rounded-xl border p-10">
        <div className="m-auto mb-5 flex">
          <img
            className="w-6"
            src="https://kufarm.io/static/kufarm/user.svg"
            alt=""
          />
          <span className="ml-3 text-xl font-semibold">Registration</span>
        </div>
        <form
          className="flex max-w-md flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
          onChange={onChange}
        >
          <div>
            <TextInput
              required
              placeholder="Username"
              {...register("username")}
              color={errors.username ? "failure" : ""}
              helperText={errors.username?.message}
            />
          </div>
          <div>
            <TextInput
              type="email"
              placeholder="Email"
              required
              {...register("email")}
              color={errors.email ? "failure" : ""}
              helperText={errors.email?.message}
            />
          </div>
          <div>
            <TextInput
              type="password"
              required
              placeholder="Password"
              {...register("password")}
              color={errors.password ? "failure" : ""}
              helperText={errors.password?.message}
            />
          </div>
          <div>
            <TextInput
              type="password"
              required
              placeholder="Repeat Password"
              {...register("rePassword")}
              color={errors.rePassword ? "failure" : ""}
              helperText={errors.rePassword?.message}
            />
          </div>
          <div>
            <TextInput
              required
              placeholder="Your Bitcoin Wallet Adress e.g. 1PQb1hBMedgWxr8HnPmdyUCCb53fLkEYQ5"
              {...register("walletAddress")}
              color={errors.walletAddress ? "failure" : ""}
              helperText={errors.walletAddress?.message}
            />
          </div>
          <div>
            <TextInput
              placeholder="Referral ID e.g. db80b3ac02224cbd947ab17dbacfde28"
              {...register("referralId")}
              color={errors.referralId ? "failure" : ""}
              helperText={errors.referralId?.message}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="flex items-center">
              I agree to Kufarm
              <Link href="https://kufarm.io/conditions">
                Terms & Conditions
              </Link>
            </Label>
          </div>
          <Button type="submit" disabled={!!message || successful}>
            Registered
          </Button>
        </form>
        {message && (
          <Alert color="failure" className="mt-4">
            {message}
          </Alert>
        )}
        {successful && (
          <Alert color="success" className="mt-4">
            <span className="font-bold">Contugate!</span> Register successful.
          </Alert>
        )}
      </div>
    </div>
  );
}
