// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { SettingRecords } from "./records";

contextBridge.exposeInMainWorld("electronAPI", {
  onUpdateSetting: (callback: (value: SettingRecords) => void) => ipcRenderer.on("update-setting", (_event, value: SettingRecords) => callback(value)),
});
