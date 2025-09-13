import axios from "axios";
import { RecipeDto } from "./dto/recipe.dto";

const axiosInstance = axios.create({ baseURL: process.env.NEXT_IMAGE_URL });

export const deleteImage = async (recipeId: number): Promise<RecipeDto> => {
  const { data } = await axiosInstance.delete<RecipeDto>(
    `/api/recipe/${recipeId}/delete-image`
  );

  return data;
};
