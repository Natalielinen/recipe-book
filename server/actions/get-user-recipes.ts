'use server';

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { prisma } from "@/prisma/prisma-client";

const actionClient = createSafeActionClient();

export const getUserRecipes = actionClient
    .schema(z.object({
        userId: z.number()
    }))
    .action(async ({ parsedInput: { userId } }) => {

        try {
            const data = await prisma.recipe.findMany({
                where: {
                    userId
                },
                include: {
                    ingredients: true
                }
            })

            return {recipes: data};
            
        } catch (error) {
            return {error: JSON.stringify(error)}
        }
    
    });