import { prisma } from "@/prisma/prisma-client";
import { Ingredient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/constants/auth-options";

//TODO: переделать на токен когда сделаю авторизацию и регистрацию

export async function GET(req: NextRequest) {
    try {

    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

    const userId = session.user.id;
        

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

        const categories = await prisma.category.findMany({
            include: {
                recipes: {
                    where: {
                        userId: Number(userId)
                    },
                },
            },
        });

        return NextResponse.json(categories);

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
       const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

    const userId = session.user.id;
        

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

        // Получаем данные рецепта из тела запроса
        const { recipeName, imageUrl, fullDescription, servings, categoryId, ingredients } = await req.json();

        // Проверяем наличие обязательных полей
        if (!recipeName || !categoryId || !servings) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Создаем рецепт
        const newRecipe = await prisma.recipe.create({
            data: {
                recipeName,
                imageUrl,
                shortDescription: fullDescription.substring(0, 100),
                fullDescription,
                servings,
                categoryId: Number(categoryId), // Убедитесь, что categoryId преобразован в число
                userId: Number(userId), // Связываем рецепт с пользователем
                ingredients: {
                    create: ingredients.map((ingredient: Ingredient) => ({
                        name: ingredient.name,
                        unit: ingredient.unit,
                        amount: ingredient.amount,
                        price: ingredient.price || 0, // Если цена не указана, по умолчанию 0
                        toTaste: Boolean(ingredient.toTaste),
                    }))
                }
            },
        });

        return NextResponse.json(newRecipe, { status: 201 });

    } catch (e) {
        console.error(e);
       return NextResponse.json({error: "Не удалось сохранить рецепт"}, {status: 500});
    }
}


