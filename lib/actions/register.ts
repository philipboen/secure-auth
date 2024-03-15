"use server";

import { z } from "zod";
import bycrpt from "bcryptjs";
import { RegisterSchema } from "@/lib/validations";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/data/user";
import { generateVerificationToken } from "@/lib/actions/tokens";
import { sendVerificationEmail } from "@/lib/actions/mail";

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

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Confirmation email sent. Verify your email!" }
}