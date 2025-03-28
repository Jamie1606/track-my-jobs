import { create } from "zustand";

type SettingStoreState = { width: number; height: number; uiScaling: number };

type SettingStoreActions = {
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setUIScaling: (uiScaling: number) => void;
};

type SettingStore = SettingStoreState & SettingStoreActions;

const useSettingStore = create<SettingStore>()((set) => ({
  width: 1200,
  height: 700,
  uiScaling: 1,
  setWidth: (newWidth) => set({ width: newWidth }),
  setHeight: (newHeight) => set({ height: newHeight }),
  setUIScaling: (newUIScaling) => set({ uiScaling: newUIScaling }),
}));

export default useSettingStore;
