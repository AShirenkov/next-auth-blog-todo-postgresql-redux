import { authConfig } from '@/configs/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import block from 'bem-css-modules';
import styles from './page.module.scss';
import type { Metadata } from 'next';

const b = block(styles);

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Profile card',
};

export default async function Profile() {
  const session = await getServerSession(authConfig);

  return (
    <div className={b('')}>
      <h1 className={b('title')}>Profile</h1>
      <div className={b('card')}>
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt="User Avatar"
            width={80}
            height={80}
            className={b('avatar')}
          />
        ) : (
          <div className={b('avatar', { placeholder: true })}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={b('icon')}
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.93 0 3.5 1.57 3.5 3.5S13.93 12 12 12s-3.5-1.57-3.5-3.5S10.07 5 12 5zm0 14c-2.33 0-4.48-.8-6.22-2.15.03-2.04 4.14-3.15 6.22-3.15s6.19 1.11 6.22 3.15C16.48 18.2 14.33 19 12 19z" />
            </svg>
          </div>
        )}
        <div className={b('info')}>
          <p className={b('name')}>{session?.user?.name || 'Unknown User'}</p>
          <p className={b('email')}>
            {session?.user?.email || 'No email provided'}
          </p>
        </div>
      </div>
    </div>
  );
}
