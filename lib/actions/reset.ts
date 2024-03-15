"use server";

import * as z from "zod";
import { ResetSchema } from "@/lib/validations";
import { getUserByEmail } from "@/lib/data/user";
import { sendPasswordResetEmail } from "@/lib/actions/mail";
import { generatePasswordResetToken } from "@/lib/actions/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid email" }
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email) {
        return { error: "Email not found!" }
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return { success: "Email has been sent! Reset your password." }
}