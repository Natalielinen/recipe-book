import {recipes, createRecipe, updateRecipe, deleteRecipe, getRecipeById, search} from './recipes';
import {categories} from './categories';
import {forgotPassword} from './forgot-password';
import {verifyToken} from './verify-token';
import {resetPassword} from './reset-password';
import * as stories from './stories';
import { updateImage } from './update-image';
import { deleteImage } from './delete-image';
import {recipeOfADay, updateRecipeOfADay} from './recipe-of-a-day';

export const Api = {
    recipes,
    search,
    createRecipe,
    categories,
    updateRecipe,
    getRecipeById,
    forgotPassword,
    verifyToken,
    resetPassword,
    deleteRecipe,
    updateImage,
    stories,
    recipeOfADay,
    updateRecipeOfADay,
    deleteImage
}