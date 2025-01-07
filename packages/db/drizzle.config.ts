import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";

if (!process.env.DB_URL) {
  throw new Error("DB_URL is not defined");
}

if (!process.env.AUTH_TOKEN) {
  throw new Error("AUTH_TOKEN is not defined");
}

const client = {
  url: process.env.DB_URL,
  authToken: process.env.AUTH_TOKEN,
} as const;

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: client.url,
    authToken: client.authToken,
  },
}) satisfies Config;
