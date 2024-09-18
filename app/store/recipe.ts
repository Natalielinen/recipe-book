import { Recipe } from "@prisma/client";
import { create } from "zustand";
import { Api } from "../services/api-client";

interface State {
    addRecipeModalOpen: boolean;
    setAddRecipeModalOpen: (value: boolean) => void;

}

export const useRecipeStore = create<State>()((set) => ({

    addRecipeModalOpen: false,

    setAddRecipeModalOpen: (value: boolean) => set({ addRecipeModalOpen: value }),


}));