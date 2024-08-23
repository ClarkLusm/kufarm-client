"use client";

import { Button } from "flowbite-react";
import { useEffect } from "react";
import router from "next/router";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <h2 className="text-3xl text-center font-bold mb-4 dark:text-white">
        Oops! Something went wrong!
      </h2>
      <Button className="btn-primary w-[168px] text-center" onClick={() => router.push("/")}>
        Go to Home
      </Button>
    </div>
  );
}
