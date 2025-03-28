import { SettingRecords } from "./src/records";

export interface IElectronAPI {
  onUpdateSetting: (callback: (value: SettingRecords) => void) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
