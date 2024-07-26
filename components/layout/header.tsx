import { Navbar, NavbarBrand, NavbarToggle } from 'flowbite-react';

import Account from './account';
import Menu from './menu';

export default () => {
  return (
    <Navbar fluid rounded className="fixed z-50 w-full bg-gray-100">
      <div className="container m-auto flex items-center justify-between">
        <NavbarBrand href="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Kufarm
            <br /> Mining
          </span>
        </NavbarBrand>
        <NavbarToggle />
        <Menu />
        <Account />
      </div>
    </Navbar>
  );
};
