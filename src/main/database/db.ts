import path from "path";
import { fileURLToPath } from "url";

// This will resolve correctly at runtime
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prismaGeneratedPath = path.resolve(__dirname, "../../src/prisma-generated");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require(prismaGeneratedPath);

export const db = new PrismaClient();
