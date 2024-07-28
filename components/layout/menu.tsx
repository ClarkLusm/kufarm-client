import { NavbarCollapse, NavbarLink } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type MenuItem = {
  path: string;
  label: string;
};

export default () => {
  const { status } = useSession();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const pathname = usePathname();
  const mainPath =
    pathname !== "/" ? `/${pathname?.split("/")?.[1]}` : pathname;

  useEffect(() => {
    if (status === "authenticated") {
      setMenuItems([
        {
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          label: "Buy more TH/S",
          path: "/buy",
        },
        {
          label: "Withdraw",
          path: "/withdraw",
        },
        {
          label: "Order History",
          path: "/history",
        },
      ]);
    } else {
      setMenuItems([
        {
          label: "Home",
          path: "/",
        },
        {
          label: "Mining Pool",
          path: "/mining",
        },
        {
          label: "About Us",
          path: "/about-us",
        },
      ]);
    }
  }, [status]);

  return (
    <NavbarCollapse>
      {menuItems.map((r) => (
        <NavbarLink
          className="text-lg font-semibold"
          key={r.path}
          href={r.path}
          active={mainPath === r.path}
        >
          {r.label}
        </NavbarLink>
      ))}
    </NavbarCollapse>
  );
};
