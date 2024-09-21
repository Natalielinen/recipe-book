import { Category } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { CategoryDto } from "./dto/recipe.dto";
import { createAxiosInstance } from "./instance";

export const categories = async (locale: string): Promise<Category[]> => {
    const axiosInstance = createAxiosInstance(locale);

    const { data } = await axiosInstance.get<CategoryDto[]>(ApiRoutes.CATEGORIES);

    return data;
};