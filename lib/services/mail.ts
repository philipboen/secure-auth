import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/verify-email?token=${token}`;

    await resend.emails.send({
        from: "Secure Auth <support@secure-auth.systems>",
        to: email,
        subject: 'Verify Your Email',
        html: `<p>Click <a href="${confirmLink}">here</a> to verify your email.</p>`
    });
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "Secure Auth <support@secure-auth.systems>",
        to: email,
        subject: "Reset Your Password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    });
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "Secure Auth <support@secure-auth.systems>",
        to: email,
        subject: "Your Two-Factor Code",
        html: `<p>Your two-factor code is: <strong>${token}</strong></p>`
    });
}