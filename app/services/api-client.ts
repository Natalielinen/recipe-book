import {recipes, createRecipe, updateRecipe, deleteRecipe, getRecipeById} from './recipes';
import {categories} from './categories';
import {forgotPassword} from './forgot-password';
import {verifyToken} from './verify-token';
import {resetPassword} from './reset-password';
import * as stories from './stories';

export const Api = {
    recipes,
    createRecipe,
    categories,
    updateRecipe,
    getRecipeById,
    forgotPassword,
    verifyToken,
    resetPassword,
    deleteRecipe,
    stories

}