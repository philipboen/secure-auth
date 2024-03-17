"use server";

import { z } from "zod";
import bcrypt from "bcryptjs"
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { LoginSchema } from "@/lib/validations";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/services/tokens";
import { getUserByEmail } from "@/lib/data/user";
import { getTwoFactorTokenByEmail } from "@/lib/data/two-factor-token";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/services/mail";
import { getTwoFactorConfirmationByUserId } from "@/lib/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { email, password, code } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "User does not exist!" }
    }

    const passwordsMatch = await bcrypt.compare(
        password,
        existingUser.password
    );

    if (!passwordsMatch) {
        return { error: "Invalid credentials!" }
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return { success: "Confirmation email sent. Verify your email!" }
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

            if (!twoFactorToken || twoFactorToken.token !== code) {
                return { error: "Invalid code!" }
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if (hasExpired) {
                return { error: "Code expired!" }
            }

            await db.twoFactorToken.delete({
                where: {
                    id: twoFactorToken.id,
                },
            });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: existingConfirmation.id,
                    },
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                },
            });
        }
        else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);

            await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

            return { twoFactor: true }
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    }
    catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }

        throw error;
    }
}