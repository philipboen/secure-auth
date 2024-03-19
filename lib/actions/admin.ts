"use server";

import { currentRole } from "@/lib/services/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
    const role = await currentRole();

    if (role !== UserRole.ADMIN) {
        return { error: "Forbidden access!" };
    }

    return { success: "Authorized access!" };
};