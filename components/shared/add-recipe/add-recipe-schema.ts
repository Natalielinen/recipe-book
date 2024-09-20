import { z } from "zod";
import { t } from "i18next";

export const addRecipeSchema = z.object({
    categoryId: z.number(),
    recipeName: z.string().min(2, t("Минимальная длина названия рецепта 2 символа")),
    fullDescription: z.string().optional(),
    ingredients: z.array(z.object({
        name: z.string(),
        amount: z.number(),
        unit: z.string(),
        price: z.number().optional()
    })),
    servings: z.number().min(1)
});

export type AddRecipeFormValues = z.infer<typeof addRecipeSchema>;