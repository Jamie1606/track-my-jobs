import { contextBridge, ipcRenderer } from "electron";
import { Status, type NewStatus } from "../../main/database/schema";
import { APIResponse } from "interface";

contextBridge.exposeInMainWorld("StatusAPI", {
  createNewStatus: (newStatus: NewStatus): Promise<APIResponse<number>> => ipcRenderer.invoke("status:create", newStatus),
  getStatusList: (search: string, limit: number, offset: number): Promise<APIResponse<Status[]>> => ipcRenderer.invoke("status:getList", search, limit, offset),
  getStatusByID: (statusID: number): Promise<APIResponse<Status>> => ipcRenderer.invoke("status:getByID", statusID),
  getStatusCount: (search: string): Promise<APIResponse<number>> => ipcRenderer.invoke("status:getCount", search),
  deleteStatus: (statusID: number): Promise<APIResponse<number>> => ipcRenderer.invoke("status:delete", statusID),
});

export {};
