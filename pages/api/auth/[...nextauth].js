import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET, //MUST DO THIS OR ELSE WILL GET ERROR IN PRODUCTION
  adapter: MongoDBAdapter(clientPromise), //MUST DO TO
  //THIS WILL ASSIGN THE PAGE WHERE TO SIGN IN, WHICH IS HOME PAGE FOR US
  pages: {
    signIn: "/home",
  },
  // NEEED TO SET THIS BECAUSE WE USING AN ADAPTER
  session: {
    strategy: "jwt",
  },
});
