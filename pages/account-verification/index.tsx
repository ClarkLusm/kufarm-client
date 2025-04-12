import router from "next/router";

import { activeAccount } from "../api/auth/active-account";

export async function getServerSideProps(context: any) {
  const { query } = context;

  try {
    await activeAccount(query.token);
    return {
      props: {
        message: null,
      },
    };
  } catch (error: any) {
    return {
      props: {
        message: error?.response?.data?.message || error?.message,
      },
    };
  }
}

const AccountVerificationPage = ({ message }: { message: string }) => {
  return (
    <div className="text-center py-8">
      {message != null ? (
        <div>
          <h2 className="text-3xl mb-4 text-gray-600">
            Unable to Verify Email Address
          </h2>
          <p className="text-red-500">{message}.</p>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl mb-4 text-green-500">Congratulations!</h2>
          <p className="text-gray-700 mb-6">
            You have successfully verified your account.
          </p>
          <button
            type="button"
            className="me-2 rounded-full bg-blue-700 px-2 sm:px-5 py-1.5 sm:py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => router.push("/auth/signin")}
          >
            SIGN IN NOW!
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountVerificationPage;
