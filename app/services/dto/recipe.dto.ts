import { Ingredient, Recipe } from "@prisma/client"

export type CategoryDto = {
    id: number,
    nameKey: string,
    recipes: Recipe[]
}