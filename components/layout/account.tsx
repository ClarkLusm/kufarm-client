import { Navbar, NavbarLink } from 'flowbite-react';

export default () => {
  const logged = true;
  return !logged ? (
    <div className="flex list-none items-center">
      <span className="font-medium text-gray-500">demo@gmail.com</span>
      <Navbar className="bg-transparent">
        <NavbarLink href="#">
          <button
            type="button"
            className="mb-2 me-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Log out
          </button>
        </NavbarLink>
      </Navbar>
    </div>
  ) : (
    <Navbar className="bg-transparent">
      <div className="flex list-none">
        <NavbarLink href="/auth/login">
          <button
            type="button"
            className="mb-2 me-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            Sign in
          </button>
        </NavbarLink>
        <NavbarLink href="/auth/register">
          <button
            type="button"
            className="mb-2 me-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign up
          </button>
        </NavbarLink>
      </div>
    </Navbar>
  );
};
