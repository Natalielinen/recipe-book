import { Ingredient, Recipe } from "@prisma/client"

export type CategoryDto = {
    id: number,
    nameKey: string,
    recipes: Recipe[]
}

export type RecipeDto = Recipe & {
    ingredients: Ingredient[]
}

export type FormRecipe = {
    recipeName: string,
    imageUrl?: string,
    fullDescription?: string,
    servings: number,
    categoryId: number,
    ingredients?: {
        name: string
        amount: number
        unit: string
        price: number
    }[]
}