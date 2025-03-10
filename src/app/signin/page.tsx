import { GoogleButton } from '@/shared/ui/GoogleButton/GoogleButton';
import { SignInForm } from '@/features/auth/ui/SignInForm';
import { Suspense } from 'react';
import block from 'bem-css-modules';
import styles from './page.module.scss';

const b = block(styles);

export default function SignIn() {
  return (
    <div className={b('')}>
      <h1 className={b('title')}>Sign In</h1>
      <Suspense>
        <GoogleButton />
      </Suspense>
      <div className={b('divider')}>or</div>
      <SignInForm />
    </div>
  );
}
