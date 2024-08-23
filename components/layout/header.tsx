import {
  DarkThemeToggle,
  Navbar,
  NavbarBrand,
  NavbarToggle,
} from "flowbite-react";

import Account from "./account";
import Menu from "./menu";

export default () => {
  return (
    <Navbar
      fluid
      rounded
      className="fixed z-50 w-full bg-gray-100 dark:bg-gray-800 top-0 rounded-none"
    >
      <div className="container max-w-[1100px] mx-auto flex items-center justify-between">
        <NavbarBrand href="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9 hidden sm:block"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Kufarm
            <br /> Mining
          </span>
          <NavbarToggle className="ml-4"/>
        </NavbarBrand>
        <Menu />
        <div className="flex align-center">
          <DarkThemeToggle className="mr-2"/>
          <Account />
        </div>
      </div>
    </Navbar>
  );
};
