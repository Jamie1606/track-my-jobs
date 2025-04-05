import fs from "node:fs";
import PATH from "../constant/file";
import { settings } from "../records";
import logger from "../logger";

export function loadSettings() {
  const filePath = PATH.SETTING;

  try {
    if (fs.existsSync(filePath)) {
      const parsedData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      settings.WIDTH = parsedData.WIDTH ?? settings.WIDTH;
      settings.HEIGHT = parsedData.HEIGHT ?? settings.HEIGHT;
      settings.UI_SCALING = parsedData.UI_SCALING ?? settings.UI_SCALING;
      logger.info(`Successfully loaded setting data.`, { label: "file-service" });
    }
  } catch (err) {
    logger.error("Failed to load settings.", { label: "file-service", stack: err });
  }
}

export function saveSettings() {
  const filePath = PATH.SETTING;

  try {
    fs.writeFileSync(filePath, JSON.stringify(settings), "utf-8");
  } catch (err) {
    logger.error("Failed to save settings.", { label: "file-service", stack: err });
  }
}
