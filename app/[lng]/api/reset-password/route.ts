import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
         const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
    });

    await prisma.passwordReset.deleteMany({
        where: { userId: user.id },
    });

    return NextResponse.json({ success: true }, { status: 200 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Не удалось сменить пароль" }, { status: 500 });
    }
   

}