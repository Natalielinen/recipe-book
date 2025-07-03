'use server';

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/prisma/prisma-client";

const actionClient = createSafeActionClient();

export const updateRecipePhoto = actionClient
    .schema(z.object({
        id: z.number(),
        imageUrl: z.string()
    }))
    .action(async ({ parsedInput: { id, imageUrl } }) => {

        try {
          await prisma.recipeOfADay.update({
                where: {
                    id
                },
                data: {
                    imageUrl
                }
            })

            revalidatePath('/profile/all-recipes');

            return {success: `Фото рецепта успешно обновлено`};
            
        } catch (error) {
            return {error: JSON.stringify(error)}
        }
    
    });