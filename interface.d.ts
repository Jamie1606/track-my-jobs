import { JobList, NewStatus, Status } from "src/main/database/db-types";
import { SettingRecords } from "./src/main/records";

export type APISuccess<T> = {
  success: true;
  data: T;
};

export type APIError = {
  success: false;
  error: string;
};

export type APIResponse<T> = APISuccess<T> | APIError;

export interface IStatusAPI {
  create: (newStatus: NewStatus) => Promsie<APIResponse<number>>;
  update: (name: string, statusID: number, color: string) => Promise<APIResponse<number>>;
  delete: (statusID: number) => Promise<APIResponse<number>>;
  getList: (search: string, limit: number, offset: number) => Promise<APIResponse<Status[]>>;
  getById: (statusID: number) => Promise<APIResponse<Status>>;
  getCount: (search: string) => Promise<APIResponse<number>>;
  getAll: () => Promise<APIResponse<Status[]>>;
}

export interface IJobAPI {
  getList: (search: string, limit: number, offset: number) => Promise<APIResponse<JobList[]>>;
  getCount: (search: string) => Promise<APIResponse<number>>;
}

declare global {
  interface Window {
    StatusAPI: IStatusAPI;
    JobAPI: IJobAPI;
  }
}

export {};
