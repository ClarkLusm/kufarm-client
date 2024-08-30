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
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9 sm:block"
            alt="Bitcoino2fi Logo"
          />
          <span className="hidden sm:block whitespace-nowrap text-xl font-semibold dark:text-white">
            Bitcoino2fi
          </span>
        </NavbarBrand>
        <NavbarToggle className="ml-4" />
      </div>
      <Menu />
      <div className="flex align-center">
        <DarkThemeToggle className="mr-2" />
        <Account />
      </div>
    </Navbar>
  );
};

export default Header;
