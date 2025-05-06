import { Button, Alert, TextInput, Spinner } from "flowbite-react";
import { useSession, signIn } from "next-auth/react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

import { SignInSchema } from "@/libs/schemas/auth.schema";
import { sendOTP } from "@/pages/api/auth/send-otp";
import WarningIcon from "@/icons/warning.svg";

type Inputs = {
  email: string;
  loginType: number;
  password?: string;
  code?: string;
};

let debounce: any = null;

export default function SignInPage() {
  const router = useRouter();
  const { status } = useSession();
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [sentOtp, setSentOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countDown, setCountDown] = useState(0);

  useEffect(() => {
    return () => {
      clearInterval(debounce);
    };
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(SignInSchema),
    defaultValues: { loginType: 0 },
  });
  const email = useWatch({ control, name: "email" });
  const loginType = useWatch({ control, name: "loginType", defaultValue: 0 });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    signIn(loginType == 1 ? "otp-credentials" : "credentials", {
      redirect: false,
      ...data,
    }).then((res) => {
      if (!res?.ok) {
        setMessage(res?.error || "Login failed!");
      } else {
        router.push("/dashboard");
      }
    });
  };

  const onCountDown = () => {
    clearInterval(debounce);
    setCountDown(60);
    debounce = setInterval(() => {
      setCountDown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(debounce);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  const handleChange = (e: any, index: number) => {
    setMessage("");
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setValue("code", newOtp.join(""));
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`)!.focus();
      }
    }
  };

  const handlePaste = (e: any) => {
    setMessage("");
    const pastedData = e.clipboardData.getData("Text").split("");
    if (pastedData.length === 6) {
      setOtp(pastedData);
      setValue("code", pastedData.join(""));
      pastedData.forEach((_: any, index: number) => {
        if (index < 6) {
          (
            document.getElementById(`otp-input-${index}`) as HTMLInputElement
          ).value = pastedData[index];
        }
      });
    }
    e.preventDefault();
  };

  const handleKeydown = (e: any, index: number) => {
    const value = e.target.value;
    const keyCode = e.keyCode;
    if (otp.length && (keyCode == 46 || keyCode == 8) && !value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)!.focus();
    }
  };

  const onSendCode = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const email = getValues("email");
      await sendOTP(email);
      setSentOtp(true);
      onCountDown();
    } catch (error: any) {
      setMessage(error?.response?.data?.message || error?.message);
    }
    setLoading(false);
  };

  const onChange = () => {
    if (message) setMessage("");
  };

  return (
    <div className="py-16 flex justify-center">
      <div className="mx-4 md:w-[420px] list-none rounded-xl border p-8">
        <form
          className="flex max-w-md flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
          onChange={onChange}
        >
          {message && (
            <Alert color="failure" className="mt-4">
              {message}
            </Alert>
          )}
          <div className="flex items-center">
            <div className="text-2xl font-bold dark:text-white">
              {loginType == 1 ? "Login with OTP" : "Login"}
            </div>
          </div>
          <div>
            <TextInput
              required
              placeholder="Email"
              {...register("email")}
              color={errors.email ? "failure" : ""}
              helperText={errors.email?.message}
            />
          </div>
          {loginType == 1 ? (
            <div>
              <div
                className="my-2 px-2"
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "space-between",
                }}
              >
                {otp.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                    onPaste={handlePaste}
                    onKeyDown={(e) => handleKeydown(e, index)}
                    className="w-[40px] h-[48px] text-center text-xl font-bold rounded-md"
                  />
                ))}
              </div>
              {sentOtp && (
                <div className="mb-4 mt-6 text-sm text-gray-600">
                  {"Didn't receive OTP code? "}
                  <button
                    type="button"
                    className="font-semibold text-green-500 disabled:text-green-300"
                    onClick={onSendCode}
                    disabled={countDown > 0}
                  >
                    RESEND {countDown > 0 && `(${countDown}s)`}
                  </button>
                </div>
              )}
              {sentOtp && !otp && (
                <p className="text-xs text-gray-400 italic">
                  <p className="flex items-center">
                    <WarningIcon
                      width={12}
                      height={12}
                      className="inline text-orange-400 mr-1"
                    />
                    <span>We have sent the OTP to your email.</span>
                  </p>
                  <p>
                    Please note that the email may have gone to your spam
                    folder.
                  </p>
                </p>
              )}
            </div>
          ) : (
            <div>
              <TextInput
                required
                type="password"
                placeholder="Password"
                {...register("password")}
                color={errors.password ? "failure" : ""}
                helperText={errors.password?.message}
              />
            </div>
          )}
          <div className="grid gap-4 grid-cols-2">
            {loginType == 1 && !sentOtp && (
              <Button
                type="button"
                onClick={onSendCode}
                color="success"
                className="w-full"
                disabled={loading || !email}
              >
                Get Code
              </Button>
            )}
            {(loginType == 0 || sentOtp) && (
              <Button
                type="submit"
                color="success"
                className="w-full"
                disabled={!!message || loading}
              >
                {loading && (
                  <Spinner
                    size="sm"
                    aria-label="Info spinner example"
                    className="me-3"
                    light
                  />
                )}
                {loginType == 1 ? "Verify Code" : "Submit"}
              </Button>
            )}
            <Button
              color="blue"
              className="w-full"
              onClick={() => setValue("loginType", loginType == 1 ? 0 : 1)}
            >
              Login {loginType == 1 ? "without" : "with"} OTP
            </Button>
          </div>
          <div>
            <Link href="/auth/signup">
              <Button color="gray" className="w-full">
                Registration
              </Button>
            </Link>
          </div>
          <Link className="text-base dark:text-white" href="/auth/recovery">
            Forgot your password?
          </Link>
        </form>
      </div>
    </div>
  );
}
