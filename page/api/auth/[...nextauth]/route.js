import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { signIn } from "next-auth/react";

const handler = NextAuth({
     providers: [
          // OAuth authentication provider
          GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
          }),
        ],
        async session({session}) {

        },
        async signIn({ profile}){}
});

export { handler as GET, handler as POST };