import PATH from "../constant/file";
import path from "node:path";
import fs from "node:fs";

export function deleteOldLogs(daysToKeep: number) {
  const cutoff = Date.now() - daysToKeep * 24 * 60 * 60 * 1000;

  fs.readdirSync(PATH.LOG_FOLDER).forEach((file) => {
    const filePath = path.join(PATH.LOG_FOLDER, file);
    const stats = fs.statSync(filePath);

    if (stats.mtime.getTime() < cutoff) {
      fs.unlinkSync(filePath);
    }
  });
}
