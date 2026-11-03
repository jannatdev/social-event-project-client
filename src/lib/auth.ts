import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

import { client, db } from "@/lib/mongodb";

export const auth = betterAuth({
     emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
  database: mongodbAdapter(db, {
    client,
  }),
});