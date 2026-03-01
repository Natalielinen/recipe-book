import { Category } from "@/generated/prisma";
import { ApiRoutes } from "./constants";
import { CategoryDto } from "./dto/recipe.dto";
import { axiosInstance } from "./instance";

export const categories = async (): Promise<Category[]> => {
  const { data } = await axiosInstance.get<CategoryDto[]>(ApiRoutes.CATEGORIES);

  return data;
};
