import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_CLIENT_URI;

if (!uri) {
  throw new Error("Missing MONGODB_CLIENT_URI environment variable.");
}

/**
 * Shared MongoDB connection for the "social-event" database. The client is
 * cached on `globalThis` so Next.js dev-server hot reloads reuse a single
 * connection pool instead of leaking new ones on every edit.
 */
const globalWithMongo = global as typeof globalThis & {
  _mongoClient?: MongoClient;
};

export const client = globalWithMongo._mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalWithMongo._mongoClient = client;
}

export const db = client.db("social-event");
