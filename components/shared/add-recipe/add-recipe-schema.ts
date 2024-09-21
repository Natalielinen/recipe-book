import { z } from "zod";
import { t } from "i18next";

export const addRecipeSchema = z.object({
    categoryId: z.string(),
    recipeName: z.string().min(2, t("Минимальная длина названия рецепта 2 символа")),
    fullDescription: z.string().optional(),
    ingredients: z.array(z.object({
        name: z.string().optional(),
        amount: z.string().optional(),
        unit: z.string().optional(),
        price: z.number().optional()
    })).optional(),
    servings: z.string().min(1),
    imageUrl: z.string().optional(),
});

export type AddRecipeFormValues = z.infer<typeof addRecipeSchema>;