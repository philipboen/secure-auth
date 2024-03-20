"use server";

import * as z from "zod";
import bcrypt from "bcryptjs"
import { db } from "@/lib/db";
import { SettingsSchema } from "@/lib/validations";
import { getUserByEmail, getUserById } from "@/lib/data/user";
import { currentUser } from "@/lib/services/auth";
import { generateVerificationToken } from "@/lib/services/tokens";
import { sendVerificationEmail } from "@/lib/services/mail";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized!" };
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Unauthorized!" };
    }

    if (user.isOAuth) {
        values.email = undefined;
        values.currentPassword = undefined;
        values.newPassword = undefined;
        values.confirmPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email);

        if (existingUser && existingUser.id !== user.id) {
            return { error: "Email already in use!" };
        }

        const verificationToken = await generateVerificationToken(values.email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return { success: "Confirmation email sent. Verify your email!" };
    }

    if (values.currentPassword && values.newPassword && dbUser.password) {
        const passwordsMatch = await bcrypt.compare(
            values.currentPassword,
            dbUser.password
        );

        if (!passwordsMatch) {
            return { error: "Incorrect password!" };
        }

        const hashedPassword = await bcrypt.hash(values.newPassword, 10);

        values.newPassword = hashedPassword;
    }
    
    const { name, email, newPassword, role, isTwoFactorEnabled } = values;

    await db.user.update({
        where: {
            id: dbUser.id,
        },
        data: {
            name,
            email,
            password: newPassword,
            role,
            isTwoFactorEnabled
        },
    });

    return { success: "Settings updated!" };
};