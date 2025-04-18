import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("JobAPI", {
  getList: (search: string, limit: number, offset: number) => ipcRenderer.invoke("job:getList", search, limit, offset),
  getCount: (search: string) => ipcRenderer.invoke("job:getCount", search),
});
