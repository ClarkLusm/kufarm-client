import { getSession } from "next-auth/react";

export const getServerSideProps = async (context: any) => {
  const { code } = context.query;
  const session = await getSession(context);
  return session
    ? {
        redirect: {
          destination: "/dashboard",
        },
      }
    : {
        redirect: {
          destination: `/auth/signup?referral=${code}`,
        },
      };
};

export default function ReferralCodePage() {}
