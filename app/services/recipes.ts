
import { Recipe } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { CategoryDto, FormRecipe, RecipeDto } from "./dto/recipe.dto";
import { createAxiosInstance } from "./instance";

export const recipes = async (locale: string): Promise<CategoryDto[]> => {
    const axiosInstance = createAxiosInstance(locale);

    const { data } = await axiosInstance.get<CategoryDto[]>(ApiRoutes.RECIPES);

    return data;
};

export const createRecipe = async (locale: string, body: FormRecipe) => {
    const axiosInstance = createAxiosInstance(locale);

    console.log('body', body);
    

    await axiosInstance.post<FormRecipe>(ApiRoutes.RECIPES, body);
};
