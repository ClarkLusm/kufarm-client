import { NavbarCollapse, NavbarLink } from 'flowbite-react';

export default () => {
  const logged = false;
  const routes = logged
    ? [
        {
          label: 'About us',
          path: '/about-us',
        },
        {
          label: 'Contact',
          path: '/contact',
        },
        {
          label: 'Review',
          path: '/review',
        },
      ]
    : [
        {
          label: 'Buy more TH/S',
          path: '/buy',
        },
        {
          label: 'Withdraw',
          path: '/withdraw',
        },
        {
          label: 'Order History',
          path: '/history',
        },
      ];

  return (
    <NavbarCollapse>
      <NavbarLink className="text-xl font-semibold" href="/" active>
        Home
      </NavbarLink>
      {routes.map((r) => (
        <NavbarLink
          className="text-xl font-semibold"
          key={r.path}
          href={r.path}
          active={false}
        >
          {r.label}
        </NavbarLink>
      ))}
    </NavbarCollapse>
  );
};
