import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import connectDB from './lib/db';
import { User } from './models/User';
import { compare } from 'bcryptjs';
import GitHub from 'next-auth/providers/github';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    //to get into GITHUB sigin
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    Credentials({
      name: 'Credentials',

      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      authorize: async credentials => {
        const email = (credentials.email as string) || undefined;
        const password = (credentials.password as string) || undefined;

        if (!email || !password) {
          throw new CredentialsSignin('Please provide both email & password');
        }

        await connectDB();

        const user = await User.findOne({ email }).select('+password +role');

        if (!user) {
          throw new Error('Invalid email or password');
        }

        if (!user.password) {
          throw new Error('Invalid email or password');
        }

        //comparing the password

        const isMatched = await compare(password, user.password);

        if (!isMatched) {
          throw new Error('Password didnot matched');
        }

        //sending all the data to user
        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          id: user._id,
        };

        return userData;
      },
    }),
  ],

  pages: {
    signIn: '/login',
  },
});
