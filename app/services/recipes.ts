
import { ApiRoutes } from "./constants";
import { CategoryDto } from "./dto/recipe.dto";
import { createAxiosInstance } from "./instance";

export const recipes = async (locale: string): Promise<CategoryDto[]> => {
    const axiosInstance = createAxiosInstance(locale);

    const { data } = await axiosInstance.get<CategoryDto[]>(ApiRoutes.RECIPES);

    return data;
};
