import { Button, Alert, TextInput } from "flowbite-react";
import { useSession, signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

import { schema } from "./schema";

type Inputs = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const router = useRouter();
  const { status } = useSession();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      void signIn("okta");
    } else if (status === "authenticated") {
      void router.push("/");
    }
  }, [status]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    signIn("credentials", {
      redirect: false,
      ...data,
    }).then((res) => {
      if (!res?.ok) {
        setMessage(res?.error || "Login failed!");
      } else {
        router.push("/");
      }
    });
  };

  const onChange = () => {
    if (message) setMessage("");
  };

  return (
    <div className="container m-auto h-screen py-16 pt-24">
      <div className="m-auto w-1/3 list-none rounded-xl border p-10">
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
            <img src="https://kufarm.io/static/kufarm/entrance.svg" alt="" />
            <div className="ml-3 text-xl font-bold">Entrace</div>
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
          <div className="grid gap-4 grid-cols-2">
            <Button
              type="submit"
              color="success"
              className="w-full"
              disabled={!!message}
            >
              Enter
            </Button>
            <Link href="/auth/signup">
              <Button color="blue" className="w-full">
                Registration
              </Button>
            </Link>
          </div>
          <Link className="text-base" href="/auth/recovery">
            Forgot your password?
          </Link>
        </form>
      </div>
    </div>
  );
}
