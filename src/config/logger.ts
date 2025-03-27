import winston from "winston";
import path from "node:path";
import PATH from "../constant/file";

// Custom console format: [timestamp] [label] [level]: message
const consoleFormat = winston.format.printf((obj) => {
  const { level, timestamp, message } = obj;

  const splat = (obj[Symbol.for("splat")] as unknown[]) || [];
  const meta = (splat?.[0] as Record<string, any>) || {};

  const label = meta.label || "app";
  return `[${timestamp}] [${label}] [${level}]: ${message}`;
});

const fileFormat = winston.format.combine(
  winston.format.label(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format((obj) => {
    const splat = (obj[Symbol.for("splat")] as unknown[]) || [];
    const meta = (splat?.[0] as Record<string, any>) || {};

    obj.label = meta.label || "app";
    return obj;
  })(),
  winston.format.json()
);

const logger = winston.createLogger({
  level: "info",
  format: fileFormat,
  transports: [new winston.transports.File({ filename: path.join(PATH.LOG_FOLDER, `${PATH.LOG_FILE_NAME}-${PATH.LOG_FILE_SUFFIX}.log`) }), new winston.transports.File({ filename: path.join(PATH.LOG_FOLDER, `${PATH.ERROR_LOG_FILE_NAME}-${PATH.LOG_FILE_SUFFIX}.log`), level: "error" })],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.label(), winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), consoleFormat),
    })
  );
}

export default logger;
