import { prisma } from "@/prisma/prisma-client";
import { Ingredient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/constants/auth-options";

export async function GET(req: NextRequest, {params}: {params: {id: number}}) {
    try {

        const {id} = params;

        console.log('params', params);
        
        const recipe = await prisma.recipe.findFirst({
          where: { id: Number(id) },
          include: {
            ingredients: true
          }
        });

        if (!recipe) {
            return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
        };

         return NextResponse.json(recipe, { status: 201 });


    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Не удалось получить рецепт" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: number } }) {
    try {
        const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

    const userId = session.user.id;

        const { id } = params;

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
        }

        // Получаем данные рецепта из тела запроса
        const { recipeName, imageUrl, fullDescription, servings, categoryId, ingredients } = await req.json();

        // Проверяем наличие обязательных полей
        if (!recipeName || !categoryId || !servings) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Удаляем все существующие ингредиенты для данного рецепта
        await prisma.ingredient.deleteMany({
            where: {
                recipeId: Number(id),
            },
        });

        // Обновляем рецепт и добавляем ингредиенты
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
                        price: ingredient.price || 0, // Если цена не указана, по умолчанию 0
                        toTaste: Boolean(ingredient.toTaste),
                    })),
                },
            },
        });

        return NextResponse.json(updatedRecipe, { status: 201 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Не удалось обновить рецепт' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: number } }) {
    try {
        const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

    const userId = session.user.id;

    const { id } = params;

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
    }

    await prisma.$transaction([
       prisma.ingredient.deleteMany({
        where: { recipeId: Number(id) },
       }),
       prisma.recipe.delete({
         where: { id: Number(id) },
       }),
    ]);

    return NextResponse.json({ message: 'Рецепт успешно удален' }, { status: 200 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Не удалось удалить рецепт' }, { status: 500 });
    }
}
