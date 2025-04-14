import { NewStatus, Status } from "./src/main/database/schema";
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
  createNewStatus: (newStatus: NewStatus) => Promsie<APIResponse<number>>;
  getStatusList: (search: string, limit: number, offset: number) => Promise<APIResponse<Status[]>>;
  getStatusByID: (statusID: number) => Promise<APIResponse<Status>>;
  getStatusCount: (search: string) => Promise<APIResponse<number>>;
  updateStatus: (name: string, statusID: number) => Promise<APIResponse<number>>;
  deleteStatus: (statusID: number) => Promise<APIResponse<number>>;
}

declare global {
  interface Window {
    StatusAPI: IStatusAPI;
  }
}

export {};
