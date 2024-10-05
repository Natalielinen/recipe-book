import { create } from "zustand";
import { FormRecipe } from "../services/dto/recipe.dto";

interface State {
    addRecipeModalOpen: boolean;
    recipe: FormRecipe;
    initialServings: number;
    setAddRecipeModalOpen: (value: boolean) => void;
    setRecipe: (recipe: FormRecipe) => void;
    setInitialServings: (value: number) => void;

}

export const useRecipeStore = create<State>()((set) => ({

    addRecipeModalOpen: false,
    recipe: {} as FormRecipe,
    initialServings: 1,

    setInitialServings: (value: number) => set({ initialServings: value }),
    setAddRecipeModalOpen: (value: boolean) => set({ addRecipeModalOpen: value }),
    setRecipe: (recipe: FormRecipe) => set({ recipe }),

}));