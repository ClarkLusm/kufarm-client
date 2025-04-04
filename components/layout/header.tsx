import {
  DarkThemeToggle,
  Navbar,
  NavbarBrand,
  NavbarToggle,
} from "flowbite-react";

import Account from "./account";
import Menu from "./menu";

const Header = () => {
  return (
    <Navbar
      fluid
      rounded
      className="fixed z-50 w-full bg-gray-100 dark:bg-gray-800 top-0 rounded-none"
    >
      <div className="flex">
        <NavbarBrand href="/">
          <img
            src="/images/logo.jpg"
            className="mr-3 h-6 sm:h-9 sm:block rounded-[50%]"
            alt="PancakeSwapfi Logo"
          />
          <span className="hidden sm:block whitespace-nowrap text-xl font-semibold dark:text-white">
            PancakeSwap Mining
          </span>
        </NavbarBrand>
        <NavbarToggle className="ml-4" />
      </div>
      <Menu />
      <div className="flex items-center">
        <DarkThemeToggle className="mr-2" />
        <Account />
      </div>
    </Navbar>
  );
};

export default Header;
