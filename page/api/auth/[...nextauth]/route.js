import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { connectToDB } from "@/lib/connect";
import User from '@models/user'

const handler = NextAuth({
     providers: [
          // OAuth authentication provider
          GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
          }),
        ],
        async session({session}) {
          const sessionUser = await User.findOne({
            email: session.user.email
          })

          session.user.id = sessionUser._id.toString();
          return session;
        },
        async signIn({ profile}){
          try{
            await connectToDB();

            // check the user 
            const userExists = await User.findOne({
              email: profile.email;
            });

            if(!userExists){
              await User.create({
                username: profile.name.replace(" ","").toLowerCase(),
                email: profile.email,
                image: profile.image
              })
            }

            return true;
          }
          catch(error){
            console.log(error);
            return false;
          }
        }
});

export { handler as GET, handler as POST };