import { db } from "./db";
import { newStatusSchema } from "../zod-schema/status";
import { ZodError } from "zod";
import { NewStatus } from "./db-types";

export const statusDb = {
  /**
   * Create a new job status
   * @param newStatus The status data to insert
   * @returns The created status ID
   */
  create: async (newStatus: NewStatus) => {
    try {
      const parsed = newStatusSchema.parse(newStatus);
      const created = await db.status.create({ data: parsed });

      if (!created.statusId) {
        throw new Error("Failed to create status.");
      }

      return created.statusId;
    } catch (error) {
      if (error instanceof ZodError) {
        const firstError = error.errors[0]?.message;
        throw new Error(firstError || "Invalid input.");
      } else {
        throw error;
      }
    }
  },

  /**
   * Update job status
   * @param name The new status name
   * @param color The new status color
   * @param statusID The status ID to update
   * @returns The updated status ID
   */
  update: async (name: string, statusID: number, color: string) => {
    try {
      const parsed = newStatusSchema.parse({ name, color });
      const updated = await db.status.update({
        where: { statusId: statusID },
        data: { name: parsed.name, color: parsed.color },
      });

      if (!updated.statusId || updated.statusId !== statusID) {
        throw new Error("Failed to update status.");
      }

      return updated.statusId;
    } catch (error) {
      if (error instanceof ZodError) {
        const firstError = error.errors[0]?.message;
        throw new Error(firstError || "Invalid input.");
      } else {
        throw error;
      }
    }
  },

  /**
   * Delete the job status
   * @param statusID The status ID to delete
   * @returns The deleted status ID
   */
  delete: async (statusID: number) => {
    try {
      const deleted = await db.status.delete({ where: { statusId: statusID } });

      if (!deleted.statusId || deleted.statusId !== statusID) {
        throw new Error("Failed to delete status.");
      }

      return deleted.statusId;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a list of job statuses
   * @param search The search query
   * @param limit  The limit for pagination
   * @param offset The offset for pagination
   * @returns A list of job statuses
   */
  getList: async (search: string, limit: number, offset: number) => {
    return await db.status.findMany({
      where: search ? { name: { contains: search.trim() } } : undefined,
      skip: offset,
      take: limit,
      orderBy: { createdAt: "asc" },
    });
  },

  /**
   * Get total job status count
   * @param search THe search query
   * @returns Total job status count
   */
  getCount: async (search: string) => {
    return await db.status.count({
      where: search ? { name: { contains: search.trim() } } : undefined,
      orderBy: {
        createdAt: "asc",
      },
    });
  },

  /**
   * Get job status by status ID
   * @param statusID The status ID to retrieve
   * @returns Job Status
   */
  getById: async (statusID: number) => {
    const result = await db.status.findUnique({
      where: { statusId: statusID },
    });

    if (!result) {
      throw new Error("No status found");
    }

    return result;
  },
};
