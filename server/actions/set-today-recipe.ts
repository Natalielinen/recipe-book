'use server';

import { prisma } from "@/prisma/prisma-client";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const actionClient = createSafeActionClient();

export const setTodayRecipe = actionClient
  .schema(z.object({
    id: z.number()
}))
  .action(async ({ parsedInput: { id } }) => {
    try {

        const recipe = await prisma.recipeOfADay.findUnique({ where: { id: Number(id) } });

        if (!recipe) throw new Error('Рецепт не найден');

        if(recipe.isTodayRecipe) {
            return { error: `Рецепт "${recipe.recipeName}" уже установлен на сегодня` };
        }

        await prisma.recipeOfADay.updateMany({
            data: {
                isTodayRecipe: false,
            },
        });

        const updatedRecipe = await prisma.recipeOfADay.update({
            where: {
                id: Number(id),
            },
            data: {
                isTodayRecipe: true,
            },

    });

      revalidatePath('/profile/all-recipes');

      return { success: `Рецепт "${recipe.recipeName}" установлен на сегодня`, updatedRecipe };
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  });