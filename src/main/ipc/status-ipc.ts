import { ipcMain } from "electron";
import { statusDb } from "../database/status";
import { handleIPC } from "../utils/ipc-handler";

ipcMain.handle("status:create", handleIPC(statusDb.create));
ipcMain.handle("status:update", handleIPC(statusDb.update));
ipcMain.handle("status:delete", handleIPC(statusDb.delete));
ipcMain.handle("status:getList", handleIPC(statusDb.getList));
ipcMain.handle("status:getById", handleIPC(statusDb.getById));
ipcMain.handle("status:getCount", handleIPC(statusDb.getCount));

export {};
