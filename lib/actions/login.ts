"use server";

import { z } from "zod";
import { LoginSchema } from "@/lib/validations";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid Fields" }
    }

    return { success: "Login Successful!" }
}