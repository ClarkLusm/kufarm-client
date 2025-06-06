import { Button, Checkbox, Label, Alert, TextInput } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import { SignUpSchema } from "@/libs/schemas/auth.schema";
import { useWallet } from "@/hooks/useWallet";
import CheckIcon from "@/icons/checked.svg";

type Inputs = {
  // username: string;
  email: string;
  password: string;
  rePassword: string;
  referralCode?: string | undefined | null;
  walletAddress: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("referral");
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const { address } = useWallet();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(SignUpSchema),
  });

  useEffect(() => {
    if (referralCode) {
      setValue("referralCode", referralCode);
    }
  }, [referralCode]);

  useEffect(() => {
    if (address) {
      setValue("walletAddress", address);
    }
  }, [address]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    axios
      .post(`${process.env.API_URL}/api/auth/signup`, data)
      .then((_) => {
        setSuccessful(true);
      })
      .catch((error) => {
        setMessage(error?.response?.data?.message || "Server is busy");
      });
  };

  const onChange = () => {
    if (message) setMessage("");
  };

  return (
    <div className="p-4 pb-8">
      {successful ? (
        <div className="m-auto max-w-[500px]">
          <div className="flex justify-center mb-8">
            <CheckIcon width={96} height={96} color="green" />
          </div>
          <p className="text-2xl text-center text-green-600 font-bold mb-4">
            Congratulations!
          </p>
          <p className="text-justify mb-8">
            {
              "You have successfully registered your account. Please check your email to confirm your account. If you don't see the email in your inbox, please check your spam folder. Thank you for joining us!"
            }
          </p>
          <div className="flex justify-center mb-4">
            <Button
              color="blue"
              className="btn-primary w-[168px] text-center"
              onClick={() => router.push("/auth/signin")}
            >
              Sign In Now!
            </Button>
          </div>
        </div>
      ) : (
        <div className="m-auto max-w-[500px] rounded-xl border p-4 sm:p-10">
          <div className="m-auto mb-5 flex">
            <span className="text-xl font-semibold dark:text-white">
              Registration
            </span>
          </div>
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
            onChange={onChange}
          >
            {/* <div>
            <TextInput
              required
              placeholder="Username"
              {...register("username")}
              autoComplete="off"
              color={errors.username ? "failure" : ""}
              helperText={errors.username?.message}
            />
          </div> */}
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
                placeholder="Your Wallet Address e.g. 0x0b37D0D50528995072ceaDC303C352F3b75f39A6"
                {...register("walletAddress")}
                color={errors.walletAddress ? "failure" : ""}
                helperText={errors.walletAddress?.message}
                disabled={!!address}
                className="text-right"
              />
            </div>
            <div>
              <TextInput
                placeholder="Referral code e.g. 4F8NI92OLI"
                {...register("referralCode")}
                color={errors.referralCode ? "failure" : ""}
                helperText={errors.referralCode?.message}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" onClick={() => setAgree(!agree)} />
              <Label htmlFor="remember">
                I agree to Miner86
                <Link target="_blank" href="#" className="ml-1">
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
      )}
    </div>
  );
}
