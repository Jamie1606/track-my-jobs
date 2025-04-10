/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import "./index.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import DashboardPage from "./pages/dashboard/page";
import RootLayout from "./pages/layout";
import URL from "./constant/url";
import JobPage from "./pages/job/page";
import PeoplePage from "./pages/people/page";
import SettingPage from "./pages/setting/page";
import TaskPage from "./pages/task/page";
import ExtensionPage from "./pages/extension/page";
import CalendarPage from "./pages/calendar/page";
import ArchivePage from "./pages/archive/page";
import AboutPage from "./pages/about/page";
import useSettingStore from "./state/setting-store";
import JobStatusPage from "./pages/job-status/page";

const settingStore = useSettingStore.getState();

window.electronAPI.onUpdateSetting((value) => {
  console.log(value);
  if (settingStore.width !== value.WIDTH) settingStore.setWidth(value.WIDTH);
  if (settingStore.height !== value.HEIGHT) settingStore.setHeight(value.HEIGHT);
  if (settingStore.uiScaling !== value.UI_SCALING) settingStore.setUIScaling(value.UI_SCALING);
});

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path={URL.JOB} element={<JobPage />} />
        <Route path={URL.PEOPLE} element={<PeoplePage />} />
        <Route path={URL.TASK} element={<TaskPage />} />
        <Route path={URL.CALENDAR} element={<CalendarPage />} />
        <Route path={URL.ARCHIVE} element={<ArchivePage />} />
        <Route path={URL.JOB_STATUS} element={<JobStatusPage />} />
        <Route path={URL.EXTENSION} element={<ExtensionPage />} />
        <Route path={URL.SETTING} element={<SettingPage />} />
        <Route path={URL.ABOUT} element={<AboutPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
