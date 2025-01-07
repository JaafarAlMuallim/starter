import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@repo/db/client";
import { oAuthProxy, openAPI } from "better-auth/plugins";
import { accounts, sessions, users, verifications } from "@repo/db/schema";
import { expo } from "@better-auth/expo";
export const auth = betterAuth({
  trustedOrigins: ["myapp://"],
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: users,
      account: accounts,
      verfication: verifications,
      session: sessions,
    },
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 3,
    },
  },
  user: {
    additionalFields: {
      isSubscribed: {
        type: "boolean",
        required: false,
      },
    },
  },
  //socialProviders: {
  //  github: {
  //    clientId: process.env.GITHUB_CLIENT_ID!,
  //    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  //  },
  //},
  plugins: [
    openAPI(),
    expo(),
    oAuthProxy(),
    //admin({
    //  impersonationSessionDuration: 60 * 3, // 3 minutes
    //}),
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    //sendResetPassword: async ({ user, url }) => {
    //  await sendEmail(...);  use @sendgrid/mail or any other email service
    //},
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },
  },
});
