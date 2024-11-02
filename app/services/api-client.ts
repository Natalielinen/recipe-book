import {recipes, createRecipe, updateRecipe, getRecipeById} from './recipes';
import {categories} from './categories';
import {forgotPassword} from './forgot-password';
import * as stories from './stories';

export const Api = {
    recipes,
    createRecipe,
    categories,
    updateRecipe,
    getRecipeById,
    forgotPassword,
    stories

}