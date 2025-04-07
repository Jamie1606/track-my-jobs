import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Status table
export const status = sqliteTable('status', {
  statusId: integer('status_id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Office type table
export const officeType = sqliteTable('office_type', {
  officeTypeId: integer('office_type_id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Employer table
export const employer = sqliteTable('employer', {
  employerId: integer('employer_id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Contact type table
export const contactType = sqliteTable('contact_type', {
  contactTypeId: integer('contact_type_id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// People table
export const people = sqliteTable('people', {
  peopleId: integer('people_id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').unique(),
  phone: text('phone'),
  url: text('url'),
  note: text('note'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  employerId: integer('employer_id').references(() => employer.employerId),
  contactTypeId: integer('contact_type_id').references(() => contactType.contactTypeId),
});

// Job table
export const job = sqliteTable('job', {
  jobId: integer('job_id').primaryKey({ autoIncrement: true }),
  location: text('location'),
  jobDescription: text('job_description'),
  link: text('link'),
  note: text('note'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  referrerId: integer('referrer_id').references(() => people.peopleId),
  officeTypeId: integer('office_type_id').references(() => officeType.officeTypeId),
  employerId: integer('employer_id').references(() => employer.employerId),
});

// Job status history table
export const jobStatusHistory = sqliteTable('job_status_history', {
  historyId: integer('history_id').primaryKey({ autoIncrement: true }),
  note: text('note'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  jobId: integer('job_id').references(() => job.jobId),
  statusId: integer('status_id').references(() => status.statusId),
});

// Task table
export const task = sqliteTable('task', {
  taskId: integer('task_id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  dueDate: text('due_date'),
  completed: integer('completed', { mode: 'boolean' }),
  note: text('note'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  jobId: integer('job_id').references(() => job.jobId),
});

// Export types
export type Status = typeof status.$inferSelect;
export type NewStatus = typeof status.$inferInsert;

export type OfficeType = typeof officeType.$inferSelect;
export type NewOfficeType = typeof officeType.$inferInsert;

export type Employer = typeof employer.$inferSelect;
export type NewEmployer = typeof employer.$inferInsert;

export type ContactType = typeof contactType.$inferSelect;
export type NewContactType = typeof contactType.$inferInsert;

export type People = typeof people.$inferSelect;
export type NewPeople = typeof people.$inferInsert;

export type Job = typeof job.$inferSelect;
export type NewJob = typeof job.$inferInsert;

export type JobStatusHistory = typeof jobStatusHistory.$inferSelect;
export type NewJobStatusHistory = typeof jobStatusHistory.$inferInsert;

export type Task = typeof task.$inferSelect;
export type NewTask = typeof task.$inferInsert;
