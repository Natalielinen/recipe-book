import { sendEmail } from "@/lib/sendEmail";
import { prisma } from "@/prisma/prisma-client";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    const passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const passwordResetExpires = new Date(Date.now() + 1000 * 60 * 60 * 5); // 1 час

    await prisma.passwordReset.create({
        data: {
            userId: user.id,
            token: passwordResetToken,
            expiresAt: new Date(passwordResetExpires),
        },
    });

    const host = req.headers.get("host");
    const protocol = host?.startsWith("localhost") ? "http" : "https";
    const resetUrl = `${protocol}://${host}/reset-password/${resetToken}`;

    const resetLink = resetUrl;

    try {
        await sendEmail(
            email,
            "Восстановление пароля",
            `Перейдите по ссылке для восстановления пароля: ${resetLink}`
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }

    return NextResponse.json({ success: true }, { status: 200 });
}
