import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

//TODO: переделать на токен когда сделаю авторизацию и регистрацию

export async function GET(req: NextRequest) {
    try {

        const userId = req.cookies.get('userId')?.value;

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const categories = await prisma.category.findMany({
            include: {
                recipes: {
                    where: {
                        userId: Number(userId)
                    }
                },
            },
        });

        return NextResponse.json(categories);

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e }, { status: 500 });
    }
}