import { ipcMain } from "electron";
import { statusDb } from "../database/status";
import { handleIPC } from "../utils/ipc-handler";

ipcMain.handle("status:create", handleIPC(statusDb.create));
ipcMain.handle("status:getList", handleIPC(statusDb.getStatusList));

export {};
