import { z } from "zod";

export const addRecipeSchema = z.object({
    categoryId: z.string(),
    recipeName: z.string().min(2, "Минимальная длина названия рецепта 2 символа"),
    fullDescription: z.string().optional(),
    ingredients: z.array(z.object({
        name: z.string().min(1, "Название ингредиента не может быть пустым"),
        amount: z.string().optional(),
        unit: z.string().optional(),
        price: z.number().optional()
    })).optional(),
    servings: z.string().min(1, "Количество порций не может быть пустым"),
    imageUrl: z.string().optional(),
});

export type AddRecipeFormValues = z.infer<typeof addRecipeSchema>;