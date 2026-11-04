import {sql} from "drizzle-orm";
import {integer,sqliteTable,text} from "drizzle-orm/sqlite-core";
export const rsvps=sqliteTable("rsvps",{id:text("id").primaryKey(),name:text("name").notNull(),contact:text("contact").notNull(),attendance:text("attendance").notNull(),adults:integer("adults").notNull(),children:integer("children").notNull(),diet:text("diet").notNull(),stay:text("stay").notNull(),notes:text("notes").notNull().default(""),language:text("language").notNull(),createdAt:text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)});
