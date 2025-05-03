import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import { getServerSession } from "next-auth";// путь может отличаться
import { authOptions } from "@/app/constants/auth-options";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const query = request.nextUrl.searchParams.get("query") || "";

    const recipes = await prisma.recipe.findMany({
    where: {
        userId: Number(userId),
        OR: [
            {
                recipeName: {
                    contains: query,
                    mode: "insensitive",
                },
            },
            {
                fullDescription: {
                    contains: query,
                    mode: "insensitive",
                },
            },
             {
                ingredients: {
                    some: {
                        name: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                },
            },
        ],
    },
    take: 5,
});

    return NextResponse.json(recipes);
}