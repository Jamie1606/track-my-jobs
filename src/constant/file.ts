import { app } from "electron";
import path from "node:path";

const PATH = {
  SETTING: path.join(app.getPath("userData"), "settings.json"),
  LOG_FOLDER: path.join(app.getPath("logs")),
  LOG_FILE_SUFFIX: new Date().toISOString().slice(0, 10),
  LOG_FILE_NAME: "log",
  ERROR_LOG_FILE_NAME: "error-log",
  EXCEPTION_LOG_FILE_NAME: "exception-log",
  DB: path.join(app.getPath("userData"), "app.db"),
} as const;

export default PATH;
