import { create } from "zustand";
import { CategoryDto } from "../services/dto/recipe.dto";

interface State {
    activeId: number;
    categories: CategoryDto[];
    menuOpen: boolean;
    setMenuOpen: (value: boolean) => void;
    setActiveId: (activeId: number) => void;
    setCategories: (categories: CategoryDto[]) => void;
}

export const useCategoryStore = create<State>()((set) => ({
    activeId: 1,
    categories: [],
    menuOpen: false,
    setMenuOpen: (value: boolean) => set({ menuOpen: value }),
    setCategories: (categories: CategoryDto[]) => set({ categories }),
    setActiveId: (activeId: number) => set({ activeId }),

}));

