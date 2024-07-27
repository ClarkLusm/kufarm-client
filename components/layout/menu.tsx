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
          path: "/home",
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
    }
  }, [status]);

  return (
    <NavbarCollapse>
      {menuItems.map((r) => (
        <NavbarLink
          className="text-xl font-semibold"
          key={r.path}
          href={r.path}
          active={pathname === r.path}
        >
          {r.label}
        </NavbarLink>
      ))}
    </NavbarCollapse>
  );
};
