import { RecipeOfADay } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { MessageType, RecipeOfADayDTO, UpdateRecipeOfADayBody } from "./dto/recipeOfADay.dto";

export const recipeOfADay = async (): Promise<RecipeOfADayDTO> => {

    const { data } = await axiosInstance.get<RecipeOfADayDTO>(ApiRoutes.RECIPE_OF_A_DAY);

    return data;
};

export const updateRecipeOfADay = async (body: UpdateRecipeOfADayBody): Promise<MessageType> => {

    const { data } = await axiosInstance.post<MessageType>(ApiRoutes.RECIPE_OF_A_DAY, body);

    return data;
};