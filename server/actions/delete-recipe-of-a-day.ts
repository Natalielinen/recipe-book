'use server';

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/prisma/prisma-client";


const actionClient = createSafeActionClient();

export const deleteRecipeOfADay = actionClient
    .schema(z.object({
        id: z.number()
    }))
    .action(async ({ parsedInput: { id } }) => {

        try {
            const data = await prisma.recipeOfADay.delete({
                where: {
                    id
                },
            })

            revalidatePath('/profile/all-recipes');

            return {success: `Рецепт ${data.recipeName} успешно удален`};
            
        } catch (error) {
            return {error: JSON.stringify(error)}
        }
    
    });