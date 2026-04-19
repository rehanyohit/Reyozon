import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const pointsTransactionsTable = pgTable("points_transactions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  type: text("type").notNull().$type<"earned" | "redeemed">(),
  amount: integer("amount").notNull(),
  description: text("description").notNull(),
  dealId: integer("deal_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const dealViewsTable = pgTable("deal_views", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  dealId: integer("deal_id").notNull(),
  viewedAt: timestamp("viewed_at").notNull().defaultNow(),
});

export const insertPointsTransactionSchema = createInsertSchema(pointsTransactionsTable).omit({ id: true, createdAt: true });
export type InsertPointsTransaction = z.infer<typeof insertPointsTransactionSchema>;
export type PointsTransaction = typeof pointsTransactionsTable.$inferSelect;

export const insertDealViewSchema = createInsertSchema(dealViewsTable).omit({ id: true, viewedAt: true });
export type InsertDealView = z.infer<typeof insertDealViewSchema>;
export type DealView = typeof dealViewsTable.$inferSelect;
