import { prisma } from "@/prisma/prisma-client";
import { Ingredient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { compare,  } from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/constants/auth-options";

//TODO: переделать на токен когда сделаю авторизацию и регистрацию

export async function GET(req: NextRequest) {
    try {

        // const userId = req.cookies.get('next-auth.session-token')?.value;

        // console.log(req, 'req');

      // const id =  compare(credentials.password, findUser.password)

    const session = await getServerSession(authOptions);

    //   console.log('req', req);
    //     console.log('session', session);

    //     const userId = 1;

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
        // Получаем сессию пользователя
       const session = await getServerSession(authOptions);

        console.log('req', req);
        console.log('session', session);

       // const userId = 1;
        
        

        // Проверяем, авторизован ли пользователь
        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = session.user.id;

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


