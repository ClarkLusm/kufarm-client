import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import router from "next/router";

import SignOutIcon from "@/icons/signout.svg";

const Account = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.error === "AccessTokenExpired") {
      signOut({ callbackUrl: "/", redirect: true });
    }
  }, [session]);

  if (status === "authenticated") {
    return (
      <div className="flex list-none items-center">
        <span className="font-medium text-gray-500 mr-2 max-w-[200px] overflow-hidden text-ellipsis">
          {session.user.email}
        </span>
        <button
          type="button"
          className="hidden sm:block rounded-full sm:bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
        >
          Sign out
        </button>
        <SignOutIcon width={20} className="sm:hidden fill-gray-500" />
      </div>
    );
  }

  return (
    <div className="bg-transparent">
      <div className="flex list-none">
        <button
          type="button"
          className="mb-2 me-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          onClick={() => router.push("/auth/signin")}
        >
          Sign in
        </button>
        <button
          type="button"
          className="mb-2 me-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => router.push("/auth/signup")}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Account;
