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

    const passwordResetExpires = Date.now() + 360000;

    await prisma.passwordReset.create({
        data: {
            userId: user.id,
            token: passwordResetToken,
            expiresAt: new Date(passwordResetExpires),
        },
    });

    // const resetUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${passwordResetToken}`;
    const resetUrl = `localhost:3000/reset-password?token=${resetToken}`;

    console.log('resetUrl', resetUrl);



}