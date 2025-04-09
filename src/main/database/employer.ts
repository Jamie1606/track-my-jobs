import { eq } from "drizzle-orm";
import { db } from "./db";
import { employer, type Employer, type NewEmployer } from "./schema";

/**
 * Employer database operations
 */
export const employerDb = {
  /**
   * Create a new employer
   * @param newEmployer The employer data to insert
   * @returns The created employer with ID
   */
  create: async (newEmployer: NewEmployer): Promise<number> => {
    const result = await db.insert(employer).values(newEmployer).returning({ insertedId: employer.employerId });
    return result[0].insertedId;
  },

  /**
   * Get all employers
   * @returns Array of all employers
   */
  getAll: async (): Promise<Employer[]> => {
    return await db.select().from(employer);
  },

  /**
   * Get an employer by ID
   * @param employerId The ID of the employer to retrieve
   * @returns The employer or undefined if not found
   */
  getById: async (employerId: number): Promise<Employer | undefined> => {
    const result = await db.select().from(employer).where(eq(employer.employerId, employerId));
    return result[0];
  },

  /**
   * Update an employer
   * @param employerId The ID of the employer to update
   * @param updateData The data to update
   * @returns The updated employer or undefined if not found
   */
  update: async (employerId: number, updateData: Partial<NewEmployer>): Promise<Employer | undefined> => {
    const result = await db.update(employer).set(updateData).where(eq(employer.employerId, employerId)).returning();
    return result[0];
  },

  /**
   * Delete an employer
   * @param employerId The ID of the employer to delete
   * @returns The deleted employer or undefined if not found
   */
  delete: async (employerId: number): Promise<Employer | undefined> => {
    const result = await db.delete(employer).where(eq(employer.employerId, employerId)).returning();
    return result[0];
  },
};
