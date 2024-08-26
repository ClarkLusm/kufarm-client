import { Button, Checkbox, Label, Alert, TextInput } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

import { SignUpSchema } from "@/libs/schemas/auth.schema";

type Inputs = {
  username: string;
  email: string;
  password: string;
  rePassword: string;
  referralId?: string | undefined | null;
  walletAddress: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(SignUpSchema),
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
    <div className="p-8">
      <div className="m-auto sm:w-1/3 list-none rounded-xl border p-4 sm:p-10">
        <div className="m-auto mb-5 flex">
          <img
            className="w-6"
            src="https://kufarm.io/static/kufarm/user.svg"
            alt=""
          />
          <span className="ml-3 text-xl font-semibold dark:text-white">Registration</span>
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
              autoComplete="off"
              color={errors.username ? "failure" : ""}
              helperText={errors.username?.message}
            />
          </div>
          <div>
            <TextInput
              required
              type="email"
              placeholder="Email"
              {...register("email")}
              color={errors.email ? "failure" : ""}
              helperText={errors.email?.message}
            />
          </div>
          <div>
            <TextInput
              required
              type="password"
              placeholder="Password"
              {...register("password")}
              autoComplete="off"
              color={errors.password ? "failure" : ""}
              helperText={errors.password?.message}
            />
          </div>
          <div>
            <TextInput
              required
              type="password"
              placeholder="Repeat Password"
              {...register("rePassword")}
              color={errors.rePassword ? "failure" : ""}
              helperText={errors.rePassword?.message}
            />
          </div>
          <div>
            <TextInput
              required
              placeholder="Your Wallet Adress e.g. 0x807974B411B6b2277d73d3D017f5749Fb7bD5E62"
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
            <Checkbox id="remember" onClick={() => setAgree(!agree)} />
            <Label htmlFor="remember" className="flex items-center">
              I agree to Kufarm
              <Link target="_blank" href="#">
                Terms & Conditions
              </Link>
            </Label>
          </div>
          <Button type="submit" disabled={!!message || !agree || successful}>
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
