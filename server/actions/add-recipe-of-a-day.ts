'use server';

import { authOptions } from "@/app/constants/auth-options";
import { prisma } from "@/prisma/prisma-client";
import { addRecipeSchema } from "@/schemas/add-recipe-schema";
import { getServerSession } from "next-auth";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const actionClient = createSafeActionClient();

export const addRecipeOfADay = actionClient
  .schema(addRecipeSchema)
  .action(async ({ parsedInput: { categoryId, recipeName, fullDescription, ingredients, servings, } }) => {
    try {

    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.id) {
        return { error: JSON.stringify('Unauthorized') };
    }
    
    const userId = session.user.id;  

    await prisma.recipeOfADay.create({
        data: {
            recipeName,
            imageUrl: '',
            authorId: Number(userId),
            authorName: session.user.name as string,
            shortDescription: fullDescription?.substring(0, 100) || "",
            fullDescription: fullDescription || "",
            servings: Number(servings),
            categoryId: Number(categoryId),
            ingredients: {
                create: ingredients?.map((ingredient) => ({
                    name: ingredient.name,
                    amount: Number(ingredient.amount),
                    unit: ingredient.unit || "шт",
                    toTaste: Boolean(ingredient.toTaste),
                })),
            },
        },
    });

      revalidatePath('/profile/all-recipes');

      return { success: `Рецепт "${recipeName}" успешно добавлен` };
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  });