'use client';

import block from 'bem-css-modules';
import styles from './Home.module.scss';

const b = block(styles);

export default function Home() {
  return (
    <div className={b()}>
      <h1 className={b('title')}>Welcome to Next.js App</h1>
      <p className={b('description')}>
        To test the application, you can use the following test accounts:
      </p>
      <ul className={b('list')}>
        <li className={b('list-item')}>
          <strong>Email:</strong> guest@gmail.com | <strong>Password:</strong>{' '}
          12345
        </li>
        <li className={b('list-item')}>
          <strong>Email:</strong> test_user1@gmail.com |{' '}
          <strong>Password:</strong> 12345
        </li>
        <li className={b('list-item')}>
          <strong>Email:</strong> test_user2@gmail.com |{' '}
          <strong>Password:</strong> 12345
        </li>
      </ul>
    </div>
  );
}
