import { create } from "zustand";

interface State {
    isEditForm: boolean;
    addRecipeModalOpen: boolean;
    setAddRecipeModalOpen: (value: boolean) => void;
    setIsEditForm: (value: boolean) => void;

}

export const useRecipeStore = create<State>()((set) => ({

    isEditForm: false,
    addRecipeModalOpen: false,

    setAddRecipeModalOpen: (value: boolean) => set({ addRecipeModalOpen: value }),
    setIsEditForm: (value: boolean) => set({ isEditForm: value }),

}));