import { Ingredient, RecipeOfADay } from "@prisma/client";

export type RecipeOfADayDTO = RecipeOfADay & {
  ingredients: Ingredient[];
};

export type UpdateRecipeOfADayBody = {
  addRecipe: boolean;
  isVoted: boolean;
  recipeId: number;
};

export type MessageType = {
  message: string;
  success: boolean;
};
