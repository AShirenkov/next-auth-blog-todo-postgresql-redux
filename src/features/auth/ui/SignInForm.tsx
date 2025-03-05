'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, type FormEventHandler } from 'react';
import block from 'bem-css-modules';
import styles from './SignInForm.module.scss';

const b = block(styles);

export const SignInForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (res?.error) {
      setErrorMessage('Invalid email or password. Please try again.');
    } else {
      router.push('/profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={b('')}>
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        className={b('input')}
      />
      <input
        type="password"
        name="password"
        required
        placeholder="Password"
        className={b('input')}
      />
      <button type="submit" className={b('button')}>
        Sign In
      </button>
      {errorMessage && <p className={b('error')}>{errorMessage}</p>}
    </form>
  );
};
