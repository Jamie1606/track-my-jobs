import { ipcMain } from "electron";
import { handleIPC } from "../utils/ipc-handler";
import { officeTypeDb } from "../database/office-type";

ipcMain.handle("officeType:create", handleIPC(officeTypeDb.create));
ipcMain.handle("officeType:update", handleIPC(officeTypeDb.update));
ipcMain.handle("officeType:delete", handleIPC(officeTypeDb.delete));
ipcMain.handle("officeType:getById", handleIPC(officeTypeDb.getById));
ipcMain.handle("officeType:getList", handleIPC(officeTypeDb.getList));
ipcMain.handle("officeType:getCount", handleIPC(officeTypeDb.getCount));
ipcMain.handle("officeType:getAll", handleIPC(officeTypeDb.getAll));

export {};
