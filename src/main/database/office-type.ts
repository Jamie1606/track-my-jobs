import { db } from "./db";
import { newOfficeTypeSchema } from "../zod-schema/office-type";
import { ZodError } from "zod";
import { NewOfficeType } from "./db-types";

export const officeTypeDb = {
  /**
   * Create a new office type
   * @param newOfficeType The office type data to insert
   * @returns The created office type ID
   */
  create: async (newOfficeType: NewOfficeType) => {
    try {
      const parsed = newOfficeTypeSchema.parse(newOfficeType);
      const created = await db.officeType.create({ data: { name: parsed.name } });

      if (!created.officeTypeId) {
        throw new Error("Failed to create office type.");
      }

      return created.officeTypeId;
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
   * Update office type
   * @param name The new office type name
   * @param officeTypeID The office type ID to update
   * @returns The updated office type ID
   */
  update: async (name: string, officeTypeID: number) => {
    try {
      const parsed = newOfficeTypeSchema.parse({ name });
      const updated = await db.officeType.update({
        where: { officeTypeId: officeTypeID },
        data: { name: parsed.name },
      });

      if (!updated.officeTypeId || updated.officeTypeId !== officeTypeID) {
        throw new Error("Failed to update office type.");
      }

      return updated.officeTypeId;
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
   * Delete the office type
   * @param officeTypeID The office type ID to delete
   * @returns The deleted office type ID
   */
  delete: async (officeTypeID: number) => {
    try {
      const deleted = await db.officeType.delete({ where: { officeTypeId: officeTypeID } });

      if (!deleted.officeTypeId || deleted.officeTypeId !== officeTypeID) {
        throw new Error("Failed to delete office type.");
      }

      return deleted.officeTypeId;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a list of office types
   * @param search The search query
   * @param limit  The limit for pagination
   * @param offset The offset for pagination
   * @returns A list of office types
   */
  getList: async (search: string, limit: number, offset: number) => {
    return await db.officeType.findMany({
      where: search ? { name: { contains: search.trim() } } : undefined,
      skip: offset,
      take: limit,
      orderBy: { createdAt: "asc" },
    });
  },

  /**
   * Get total office type count
   * @param search The search query
   * @returns Total office type count
   */
  getCount: async (search: string) => {
    return await db.officeType.count({
      where: search ? { name: { contains: search.trim() } } : undefined,
    });
  },

  /**
   * Get office type by office type ID
   * @param officeTypeID The office type ID to retrieve
   * @returns Office Type
   */
  getById: async (officeTypeID: number) => {
    const result = await db.officeType.findUnique({
      where: { officeTypeId: officeTypeID },
    });

    if (!result) {
      throw new Error("No office type found");
    }

    return result;
  },

  /**
   * Get all office types
   * @returns A list of office types
   */
  getAll: async () => {
    return await db.officeType.findMany();
  },
};
