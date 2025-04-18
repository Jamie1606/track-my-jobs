import { db } from "./db";
import { JobList } from "./db-types";

export const jobDb = {
  getList: async (search: string, limit: number, offset: number): Promise<JobList[]> => {
    const trimmedSearch = search.trim();

    const data = await db.job.findMany({
      select: {
        jobId: true,
        title: true,
        location: true,
        link: true,
        createdAt: true,
        jobDescription: true,
        note: true,
        employerId: true,
        officeTypeId: true,
        statusHistory: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
          select: {
            status: {
              select: {
                name: true,
                color: true,
              },
            },
          },
        },
        officeType: {
          select: {
            name: true,
          },
        },
        employer: {
          select: {
            name: true,
          },
        },
      },
      where: trimmedSearch ? { title: { contains: trimmedSearch }, location: { contains: trimmedSearch }, employer: { name: { contains: trimmedSearch } } } : undefined,
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedData: JobList[] = [];

    data.forEach((item) => {
      const temp: JobList = {
        createdAt: item.createdAt,
        employerId: item.employerId,
        employerName: item.employer?.name,
        jobDescription: item.jobDescription,
        jobId: item.jobId,
        link: item.link,
        location: item.location,
        note: item.note,
        officeTypeId: item.officeTypeId,
        officeTypeName: item.officeType?.name,
        title: item.title,
        status: item.statusHistory[0].status?.name,
        color: item.statusHistory[0].status?.color,
      };

      formattedData.push(temp);
    });

    return formattedData;
  },

  getCount: async (search: string) => {
    const trimmedSearch = search.trim();

    return await db.job.count({
      where: trimmedSearch ? { title: { contains: trimmedSearch }, location: { contains: trimmedSearch }, employer: { name: { contains: trimmedSearch } } } : undefined,
    });
  },
};
