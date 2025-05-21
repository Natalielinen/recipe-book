import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/constants/auth-options";

export async function GET() {
    try {
        const recipeOfADay = await prisma.recipeOfADay.findFirst({
            where: {
                isTodayRecipe: true,
            },
            include: {
                ingredients: true, 
              },
        });

        return NextResponse.json(recipeOfADay);

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

    let messageSuccess = '';

    // Получаем данные рецепта из тела запроса
    const { addRecipe, isVoted, recipeId } = await req.json();

    if (addRecipe){
        await prisma.recipeOfADay.update({
            where: { id: recipeId },
            data: {
              usersIdsAddedRecipe: {
                push: Number(userId),
              },
            },
          })

          messageSuccess = 'Рецепт добавлен в список';
 
    }

    if (isVoted) {
        const recipe = await prisma.recipeOfADay.findUnique({
            where: { id: recipeId },
            select: { votedUsersIds: true },
          });
          
          if (!recipe) {
            throw new Error('Recipe not found');
          }
          
          const userIdNumber = Number(userId);
          const alreadyVoted = recipe.votedUsersIds.includes(userIdNumber);
          
          const updatedIds = alreadyVoted
            ? recipe.votedUsersIds.filter(id => id !== userIdNumber) // удалить
            : [...recipe.votedUsersIds, userIdNumber];               // добавить
          
          await prisma.recipeOfADay.update({
            where: { id: recipeId },
            data: {
              votedUsersIds: {
                set: updatedIds,
              },
            },
          });

          messageSuccess = 'Вы проголосовали за рецепт';
    }

    return NextResponse.json({success: true, message: messageSuccess }, { status: 201 });

    } catch (e) {
        console.error(e);
       return NextResponse.json({error: 'Произошла ошибка'}, {status: 500});
    }
}