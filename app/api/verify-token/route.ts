import { prisma } from "@/prisma/prisma-client";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { token } = await req.json();

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const passwordResetRecord = await prisma.passwordReset.findUnique({
            where: { token: hashedToken },
            include: { user: true }, // Загружаем пользователя, связанного с этим токеном
        });

        if (!passwordResetRecord) {
            return NextResponse.json({ error: 'Токен не найден или недействителен' }, { status: 404 });
        }

        // Проверка срока действия токена
        if (passwordResetRecord.expiresAt < new Date()) {
            return NextResponse.json({ error: 'Токен истек' }, { status: 400 });
        }

        // Получаем пользователя
        const user = passwordResetRecord.user;

       if(!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
       } 

       return NextResponse.json(user, { status: 200 });
   
}