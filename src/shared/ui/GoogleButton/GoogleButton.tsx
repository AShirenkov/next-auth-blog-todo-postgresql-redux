'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import block from 'bem-css-modules';
import styles from './GoogleButton.module.scss';

const b = block(styles);

export const GoogleButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/profile';

  return (
    <button
      type="button"
      onClick={() => signIn('google', { callbackUrl })}
      className={b('')}
    >
      Sign in with Google
    </button>
  );
};
