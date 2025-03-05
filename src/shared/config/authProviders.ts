import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { users } from '@/shared/config/users';
import type { NextAuthOptions, User } from 'next-auth';

export const authProviders: NextAuthOptions['providers'] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_SECRET || '',
  }),
  Credentials({
    credentials: {
      email: { label: 'email', type: 'email', required: true },
      password: { label: 'password', type: 'password', required: true },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials.password) {
        return null;
      }

      const currentUser = users.find(
        (user) => user.email === credentials.email
      );

      if (currentUser && currentUser.password === credentials.password) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...user } = currentUser;
        return user as User;
      }

      return null;
    },
  }),
];
