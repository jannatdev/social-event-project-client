import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"

import { client, db } from "@/lib/mongodb";




export const auth = betterAuth({

 baseURL: process.env.BETTER_AUTH_URL,

     emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },

    plugins:[ jwt()],
   session:{
    cookieCache:{
      enabled:true,
      strategy:"jwt",
      maxAge: 14*24*60*60
    }
   },

    trustedOrigins: [
    "http://localhost:3000",
    "https://social-event-project-client-792l.vercel.app/",
  ],
    

 database: mongodbAdapter(db, {
    client,
  }),
});