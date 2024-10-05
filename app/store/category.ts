import { Category } from "@prisma/client";
import { create } from "zustand";
import { CategoryDto } from "../services/dto/recipe.dto";

interface State {
    activeId: number;
    categories: CategoryDto[];
    setActiveId: (activeId: number) => void;
    setCategories: (categories: CategoryDto[]) => void;

}

export const useCategoryStore = create<State>()((set) => ({
    activeId: 1,
    categories: [],
    setCategories: (categories: CategoryDto[]) => set({ categories }),
 
    setActiveId: (activeId: number) => set({ activeId }),

}));

