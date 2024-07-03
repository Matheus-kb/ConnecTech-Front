import Cookies from 'js-cookie';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import api from '@/app/_api/api';
import { MyUser } from '../_types/user';

interface LoginCredentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;

        if (!email || !password) return null;

        try {
          const res = await api.post('/auth/login', { email, password });

          if (res.data.access_token) {
            const user: MyUser = {
              id: res.data.user.id,
              email: res.data.user.email,
              name: res.data.user.name,
              type: res.data.user.type,
              accessToken: res.data.access_token,
            };

            // Save token to cookie
            Cookies.set('accessToken', res.data.access_token);
            return user;
          }
          return null;
        } catch (error) {
          console.error('Error logging in:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as MyUser).accessToken;
        token.id = (user as MyUser).id;
        token.email = (user as MyUser).email;
        token.name = (user as MyUser).name;
        token.type = (user as MyUser).type;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        type: token.type as string,
      };
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export function auth(
  ...args:
    | [
        GetServerSidePropsContext['req'],
        GetServerSidePropsContext['res']
      ]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
