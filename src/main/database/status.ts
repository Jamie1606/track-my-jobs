import { like } from "drizzle-orm";
import { db } from "./db";
import { type NewStatus, type Status, status } from "./schema";

/**
 * Job Status database operations
 */
export const statusDb = {
  /**
   * Create a new job status
   * @param newStatus The status data to insert
   * @returns The created status with ID
   */
  create: async (newStatus: NewStatus): Promise<number> => {
    const result = await db.insert(status).values(newStatus).returning({ insertedId: status.statusId });
    return result[0].insertedId;
  },

  /**
   * Get a list of job statuses
   * @param offset The offset for pagination
   * @param limit  The limit for pagination
   * @param search The search query
   * @returns A list of job statuses
   */
  getStatusList: async (offset: number, limit: number, search: string): Promise<Status[]> => {
    return await db
      .select()
      .from(status)
      .where(search ? like(status.name, `%${search}%`) : undefined)
      .limit(limit)
      .offset(offset);
  },
};
