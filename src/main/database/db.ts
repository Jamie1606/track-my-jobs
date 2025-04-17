import type { PrismaClient as PrismaClientType } from "../../prisma-generated";

import path from "path";
import { fileURLToPath } from "url";

// This will resolve correctly at runtime
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prismaGeneratedPath = path.resolve(__dirname, "../../src/prisma-generated");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const PrismaClientImport = require(prismaGeneratedPath);

// Now manually tell TS: PrismaClientImport is what we expect
const PrismaClient = PrismaClientImport.PrismaClient as typeof PrismaClientType;

export const db = new PrismaClient();
