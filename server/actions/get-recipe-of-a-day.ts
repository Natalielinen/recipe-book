'use server';

import { prisma } from "@/prisma/prisma-client";

export async function getRecipeOfADay(id: number) {
    try {
        const recipeOfADay = await prisma.recipeOfADay.findUnique({ 
            where: { id },
            include: {
                ingredients: true
            }
         });

        if(!recipeOfADay) {
            throw new Error('Рецепт не найден');
        }

        return { recipeOfADay };

    } catch (error) {
        return {error: "Рецепт не найден"}
    }

}