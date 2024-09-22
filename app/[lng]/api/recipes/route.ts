import { prisma } from "@/prisma/prisma-client";
import { Ingredient } from "@prisma/client";
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
        // Получаем userId из cookies
       const userId = req.cookies.get('userId')?.value;

        console.log('userId', userId);
        

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
                        price: ingredient.price || 0 // Если цена не указана, по умолчанию 0
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

export async function PATCH(req: NextRequest, {params}: {params: {id: string}}) {
    try {
        // Получаем userId из cookies
       const userId = req.cookies.get('userId')?.value;

       const {id} = params;
        

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const recipe = await prisma.recipe.findFirst({
            where: {
                id: Number(id),
            }
        });

        if (!recipe) {
            return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
        };

        // Получаем данные рецепта из тела запроса
        const { recipeName, imageUrl, fullDescription, servings, categoryId, ingredients } = await req.json();

        // Проверяем наличие обязательных полей
        if (!recipeName || !categoryId || !servings) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Создаем рецепт
        const updatedRecipe = await prisma.recipe.update({
            where: {
                id: Number(id),
            },
            data: {
                recipeName,
                imageUrl,
                shortDescription: fullDescription.substring(0, 100),
                fullDescription,
                servings,
                categoryId: Number(categoryId), // Убедитесь, что categoryId преобразован в число
                ingredients: {
                    create: ingredients.map((ingredient: Ingredient) => ({
                        name: ingredient.name,
                        unit: ingredient.unit,
                        amount: ingredient.amount,
                        price: ingredient.price || 0 // Если цена не указана, по умолчанию 0
                    }))
                }
            },
        });

        return NextResponse.json(updatedRecipe, { status: 201 });

    } catch (e) {
        console.error(e);
       return NextResponse.json({error: "Не удалось обновить рецепт"}, {status: 500});
    }
}
