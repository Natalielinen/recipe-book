import axios from "axios";
import { RecipeDto } from "./dto/recipe.dto";


const axiosInstance = axios.create({ baseURL: process.env.NEXT_IMAGE_URL });

export const updateImage = async ( recipeId: number, body: {imageUrl: string}): Promise<RecipeDto> => {

   const { data } = await axiosInstance.post<RecipeDto>(`/api/recipe/${recipeId}/update-image`, body);

   return data;

};