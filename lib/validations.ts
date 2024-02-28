import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
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
    confirmPassword: z.string().min(8, {
        message: "Passwords do not match!",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
});