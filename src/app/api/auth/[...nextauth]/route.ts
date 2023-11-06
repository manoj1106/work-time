// @ts-nocheck
import 'reflect-metadata';
import { container } from 'tsyringe';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginService } from '@/server/service/impl/login.service.impl';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials: any, req) {
        const loginService = container.resolve(LoginService);
        const username = credentials.username;
        const password = credentials.password;
        const response = await loginService.performLogin(username, password);
        if (!response.success) {
          throw new Error(response.msg);
        }
        return response.payload;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 86400,
  },
  session: {
    maxAge: 86400,
    updateAge: 86400,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});

export { handler as GET, handler as POST };
