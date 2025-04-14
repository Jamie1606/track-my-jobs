import { eq, like } from "drizzle-orm";
import { db } from "./db";
import { type NewStatus, type Status, status } from "./schema";
import { newStatusSchema } from "../zod-schema/status";
import { ZodError } from "zod";

/**
 * Job Status database operations
 */
export const statusDb = {
  /**
   * Create a new job status
   * @param newStatus The status data to insert
   * @returns The created status ID
   */
  createNewStatus: async (newStatus: NewStatus): Promise<number> => {
    try {
      const parsed = newStatusSchema.parse(newStatus);
      const result = await db.insert(status).values(parsed).returning({ insertedID: status.statusId });

      if (!result.length || !result[0].insertedID) {
        throw new Error("Failed to create status.");
      }

      return result[0].insertedID;
    } catch (error) {
      if (error instanceof ZodError) {
        const firstError = error.errors[0]?.message;
        throw new Error(firstError || "Invalid input.");
      } else throw error;
    }
  },

  /**
   * Delete the job status
   * @param statusID The status ID to delete 
   * @returns The deleted status ID
   */
  deleteStatus: async (statusID: number): Promise<number> => {
    try {
      const result = await db.delete(status).where(eq(status.statusId, statusID)).returning({ deleteID: status.statusId });

      if (!result.length || !result[0].deleteID) {
        throw new Error("No status found.");
      }

      return result[0].deleteID;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a list of job statuses
   * @param offset The offset for pagination
   * @param limit  The limit for pagination
   * @param search The search query
   * @returns A list of job statuses
   */
  getStatusList: async (search: string, limit: number, offset: number): Promise<Status[]> => {
    return await db
      .select()
      .from(status)
      .where(search ? like(status.name, `%${search.trim()}%`) : undefined)
      .limit(limit)
      .offset(offset);
  },

  getStatusCount: async (search: string): Promise<number> => {
    return await db.$count(status, search ? like(status.name, `%${search.trim()}%`) : undefined);
  },

  /**
   * Get job status by status ID
   * @param statusID The status ID to retrieve
   * @returns Job Status
   */
  getStatusByID: async (statusID: number): Promise<Status> => {
    const result = await db.selectDistinct().from(status).where(eq(status.statusId, statusID));

    if (result.length !== 1) {
      throw new Error("No status found");
    }

    return result[0];
  },
};
