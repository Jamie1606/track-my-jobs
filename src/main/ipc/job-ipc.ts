import { ipcMain } from "electron";
import { jobDb } from "../database/job";
import { handleIPC } from "../utils/ipc-handler";

ipcMain.handle("job:getList", handleIPC(jobDb.getList));
ipcMain.handle("job:getCount", handleIPC(jobDb.getCount));

export {};
