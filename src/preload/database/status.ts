import { contextBridge, ipcRenderer } from "electron";
import { type NewStatus } from "../../main/database/schema";

contextBridge.exposeInMainWorld("StatusAPI", {
  createNewStatus: (newStatus: NewStatus) => ipcRenderer.invoke("status:create", newStatus),
  getStatusList: (search: string, limit: number, offset: number) => ipcRenderer.invoke("status:getList", search, limit, offset),
});

export {};
