import {
  pgTable, text, timestamp, primaryKey, integer, uniqueIndex,
} from "drizzle-orm/pg-core";

// AdapterAccountType local fallback — will be replaced by next-auth/adapters import in Task 2
type AdapterAccountType = "oauth" | "oidc" | "email" | "webauthn";

export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable("account", {
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").$type<AdapterAccountType>().notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
}, (a) => [primaryKey({ columns: [a.provider, a.providerAccountId] })]);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable("verificationToken", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
}, (v) => [primaryKey({ columns: [v.identifier, v.token] })]);

export const progress = pgTable("progress", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  moduleSlug: text("moduleSlug").notNull(),
  lessonSlug: text("lessonSlug").notNull(),
  completedAt: timestamp("completedAt", { mode: "date" }),
  quizScore: integer("quizScore"),
  quizTotal: integer("quizTotal"),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().$defaultFn(() => new Date()),
}, (p) => [uniqueIndex("progress_user_lesson").on(p.userId, p.moduleSlug, p.lessonSlug)]);

export type Progress = typeof progress.$inferSelect;
export type NewProgress = typeof progress.$inferInsert;
