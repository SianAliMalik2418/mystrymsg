// authOptions.ts
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/connectDB";
import { UserModel } from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { ResponseJson } from "@/lib/ResponseJson";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials: any): Promise<any> {
        const { email, password } = credentials;
        console.log(credentials);

          await connectDB();

          const user = await UserModel.findOne({ email });

          if (!user) {
            throw new Error("Invalid Credentials!");
          }

          const isPasswordMatch = bcrypt.compareSync(password, user.password);

          if (!isPasswordMatch) {
            throw new Error("Invalid Credentials!");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account before login again");
          }

          return user;
        } 
    
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
      }
      return session;
    },
  },

  secret: process.env.NEXT_AUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "auth/sign-in",
  },
};
