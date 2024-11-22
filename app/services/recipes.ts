
import { ApiRoutes } from "./constants";
import { CategoryDto, FormRecipe } from "./dto/recipe.dto";
import { axiosInstance } from "./instance";

export const recipes = async (): Promise<CategoryDto[]> => {

    const { data } = await axiosInstance.get<CategoryDto[]>(ApiRoutes.RECIPES);

    return data;
};

export const createRecipe = async ( body: FormRecipe) => {

    await axiosInstance.post<FormRecipe>(ApiRoutes.RECIPES, body);
};

export const updateRecipe = async ( body: FormRecipe, id: number) => {

    const data = await axiosInstance.patch<FormRecipe>(ApiRoutes.RECIPE + `/${id}`, body);

    return data;
};

export const deleteRecipe = async ( id: number) => {

    const data = await axiosInstance.delete(ApiRoutes.RECIPE + `/${id}`);

    return data;
};

export const getRecipeById = async (id: number) => {

    const { data } = await axiosInstance.get<FormRecipe>(ApiRoutes.RECIPE + `/${id}`);

    return data;
}
