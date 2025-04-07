import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

const sqlite = new Database("./job-tracker.db");
sqlite.pragma("foreign_keys = ON");

export const db = drizzle({ client: sqlite });
