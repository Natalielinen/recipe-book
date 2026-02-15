
export type Lang = "ru" | "en";

export const translation: Record<Lang, Record<string, string>> = {
  ru: {
    title: "Книга рецептов",
    description: "Собирай свои любимые рецепты. Книга для записи, хранения и редактирования рецептов.",
    signin: "Войти",
    myRecipes: "Мои рецепты",
    profile: "Профиль",
    signout: "Выйти",
  },
  en: {
    title: "What to choose?",
    description: "Save your favorite recipes. A book for recording, storage and editing recipes.",
    signin: "Sign in",
    myRecipes: "My recipes",
    profile: "Profile",
    signout: "Sign out",
  },
};
