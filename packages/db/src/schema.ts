import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import {
  InferInsertModel,
  InferSelectModel,
  relations,
  sql,
} from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: int("email_verified", { mode: "boolean" }).notNull(),
  image: text("image"),
  isSubscribed: int("is_subscribed", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: int("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).notNull(),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: int("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: int("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: int("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: int("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: int("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).notNull(),
});

export const verifications = sqliteTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: int("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: int("created_at", { mode: "timestamp" }),
  updatedAt: int("updated_at", { mode: "timestamp" }),
});

export const chirps = sqliteTable("chirps", {
  id: int("id").primaryKey({ autoIncrement: true }),
  chirp: text("chirp"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  created_at: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updated_at: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const userChirpRelation = relations(users, ({ many }) => ({
  chirps: many(chirps),
}));

export const chirpUserRelation = relations(chirps, ({ one }) => ({
  user: one(users, {
    fields: [chirps.userId],
    references: [users.id],
  }),
}));

export type Session = InferSelectModel<typeof sessions>;
export type User = InferSelectModel<typeof users>;
export type Account = InferSelectModel<typeof accounts>;
export type ReadChirp = InferSelectModel<typeof chirps>;
export type WriteChirp = InferInsertModel<typeof chirps>;

//import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
//
//export const users = pgTable("users", {
//  id: text("id").primaryKey(),
//  name: text("name").notNull(),
//  email: text("email").notNull().unique(),
//  emailVerified: boolean("email_verified").notNull(),
//  image: text("image"),
//  createdAt: timestamp("created_at").notNull(),
//  updatedAt: timestamp("updated_at").notNull(),
//  role: text("role"),
//  banned: boolean("banned"),
//  banReason: text("ban_reason"),
//  banExpires: timestamp("ban_expires"),
//  isSubscribed: boolean("is_subscribed"),
//});
//
//export const sessions = pgTable("sessions", {
//  id: text("id").primaryKey(),
//  expiresAt: timestamp("expires_at").notNull(),
//  token: text("token").notNull().unique(),
//  createdAt: timestamp("created_at").notNull(),
//  updatedAt: timestamp("updated_at").notNull(),
//  ipAddress: text("ip_address"),
//  userAgent: text("user_agent"),
//  userId: text("user_id")
//    .notNull()
//    .references(() => users.id),
//  impersonatedBy: text("impersonated_by"),
//});
//
//export const accounts = pgTable("accounts", {
//  id: text("id").primaryKey(),
//  accountId: text("account_id").notNull(),
//  providerId: text("provider_id").notNull(),
//  userId: text("user_id")
//    .notNull()
//    .references(() => users.id),
//  accessToken: text("access_token"),
//  refreshToken: text("refresh_token"),
//  idToken: text("id_token"),
//  accessTokenExpiresAt: timestamp("access_token_expires_at"),
//  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
//  scope: text("scope"),
//  password: text("password"),
//  createdAt: timestamp("created_at").notNull(),
//  updatedAt: timestamp("updated_at").notNull(),
//});
//
//export const verifications = pgTable("verifications", {
//  id: text("id").primaryKey(),
//  identifier: text("identifier").notNull(),
//  value: text("value").notNull(),
//  expiresAt: timestamp("expires_at").notNull(),
//  createdAt: timestamp("created_at"),
//  updatedAt: timestamp("updated_at"),
//});
//
//export const chirps = pgTable("chirps", {
//  id: text("id").primaryKey(),
//  chirp: text("chirp"),
//  userId: text("user_id")
//    .notNull()
//    .references(() => users.id),
//  created_at: timestamp("created_at").notNull().defaultNow(),
//  updated_at: timestamp("updated_at").notNull().defaultNow(),
//});
