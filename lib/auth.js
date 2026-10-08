import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import { nextCookies } from "better-auth/next-js";

// local fallback only, the real uri comes from .env.local
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bazar_dor";

// reuse one client across serverless invocations
const globalForMongo = globalThis;
if (!globalForMongo._bazarDorMongoClient) {
  globalForMongo._bazarDorMongoClient = new MongoClient(uri);
}
const client = globalForMongo._bazarDorMongoClient;
const db = client.db("bazar_dor");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  // put your own secret in .env.local, this fallback is only so the app
  // still runs if someone forgets
  secret: process.env.BETTER_AUTH_SECRET || "bazar-dor-dev-secret-change-me",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  trustedOrigins: [
    "http://localhost:3000",
    "https://*.vercel.app",
    ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
  ],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  // this one has to stay last, it sets the cookies when auth runs on the server
  plugins: [nextCookies()],
});