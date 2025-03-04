'use client';

import { signOut, useSession } from 'next-auth/react';
import { NavItem } from '../NavItem/NavItem';
import block from 'bem-css-modules';
import styles from './Navigation.module.scss';

const b = block(styles);

interface NavLink {
  label: string;
  href: string;
}

interface Props {
  navLinks: NavLink[];
}

const Navigation = ({ navLinks }: Props) => {
  const session = useSession();

  return (
    <nav className={b('')}>
      <ul className={b('list')}>
        {navLinks.map((link) => (
          <NavItem key={link.href} href={link.href} label={link.label} />
        ))}

        {session?.data ? (
          <>
            <NavItem href="/todolist" label="Todo" />
            <NavItem href="/profile" label="Profile" />

            <NavItem
              href="#"
              label={`Sign out (${session.data.user?.name})`}
              onClick={() => signOut({ callbackUrl: '/' })}
            />
          </>
        ) : (
          <NavItem href="/signin" label="Sign in" />
        )}
      </ul>
    </nav>
  );
};

export { Navigation };
