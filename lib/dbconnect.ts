/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

export const dbconnect = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = dbconnect;