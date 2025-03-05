import type { NextAuthOptions } from 'next-auth';
import { authProviders } from './authProviders';

export const authConfig: NextAuthOptions = {
  providers: authProviders,
  pages: {
    signIn: '/signin',
  },
};
