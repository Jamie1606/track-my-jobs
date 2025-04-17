import { Status, OfficeType, Employer, ContactType, People, Job, JobStatusHistory, Task } from "src/prisma-generated";

export type { Status, OfficeType, Employer, ContactType, People, Job, JobStatusHistory, Task };

export type NewStatus = Omit<Status, "statusId" | "createdAt">;
