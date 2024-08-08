import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      setIsLogged(true);
      setUser(session?.data?.user);
    } else if (session.status === "unauthenticated") {
      setIsLogged(false);
    }
  }, [session]);
  return { isLogged };
};
