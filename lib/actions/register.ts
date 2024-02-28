"use server";

import { z } from "zod";
import bycrpt from "bcrypt";
import { RegisterSchema } from "@/lib/validations";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/actions/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bycrpt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "User already exists! Create account with another email." }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    // TODO: Send verification token email

    return { success: "Login Successful!" }
}