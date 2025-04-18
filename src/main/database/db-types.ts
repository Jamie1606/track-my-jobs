import { Status, OfficeType, Employer, ContactType, People, Job, JobStatusHistory, Task } from "src/prisma-generated";

export type { Status, OfficeType, Employer, ContactType, People, Job, JobStatusHistory, Task };

export type NewStatus = Omit<Status, "statusId" | "createdAt">;

export type JobList = Omit<Job, "referrerId" | "resume" | "coverLetter"> & {
    employerName: string | undefined;
    officeTypeName: string | undefined;
    status: string | undefined;
    color: string | undefined;
}
