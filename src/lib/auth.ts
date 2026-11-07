import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("event_hub");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  
    emailAndPassword: { 
    enabled: true, 
  }, 
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
      },

      location: {
        type: "string",
        required: false,
      },

      profession: {
        type: "string",
        required: false,
      },

      website: {
        type: "string",
        required: false,
      },

      bio: {
        type: "string",
        required: false,
      },
    },
  },
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        },
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        },  
    },
});