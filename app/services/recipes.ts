
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

    await axiosInstance.post<FormRecipe>(ApiRoutes.RECIPES, body);
};

export const updateRecipe = async (locale: string, body: FormRecipe, id: number) => {
    const axiosInstance = createAxiosInstance(locale);

    const data = await axiosInstance.patch<FormRecipe>(ApiRoutes.RECIPE + `/${id}`, body);

    return data;
};

export const getRecipeById = async (locale: string, id: number) => {
    const axiosInstance = createAxiosInstance(locale);

 
    const { data } = await axiosInstance.get<FormRecipe>(ApiRoutes.RECIPE + `/${id}`);

    return data;
}
