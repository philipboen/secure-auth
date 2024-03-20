import { z } from "zod";
import { UserRole } from "@prisma/client";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    name: z.string().min(3, {
        message: "Minimum 3 characters required",
    }),
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(8, {
        message: "Minimum 8 characters required",
    }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(8, {
        message: "Minimum 8 characters required",
    }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
});

export const SettingsSchema = z.object({
    name: z.optional(z.string().min(3, {
        message: "Minimum 3 characters required",
    })),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email({
        message: "Email is required",
    })),
    currentPassword: z.optional(z.string()),
    newPassword: z.optional(z.string().min(8, {
        message: "Minimum 8 characters required",
    })),
    confirmPassword: z.optional(z.string()),
})
    .refine((data) => {
        if (!data.currentPassword && data.newPassword) {
            return false
        }

        return true
    }, {
        message: "Password is required",
        path: ["currentPassword"],
    })
    .refine((data) => {
        if (data.currentPassword && !data.newPassword) {
            return false
        }

        return true
    }, {
        message: "New Password is required",
        path: ["newPassword"],
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match!",
        path: ["confirmPassword"],
    });