import { Recipe } from "@prisma/client";

export const categories = [
    {
        nameKey: "Салаты и закуски",
    },
    {
        nameKey: "Первые блюда",
    },
    {
        nameKey: "Горячие блюда",
    },
    {
        nameKey: "Выпечка",
    },
    {
        nameKey: "Десерты и напитки",
    },
    {
        nameKey: "Домашние заготовки",
    }
];


export const getSalads = (userId: number, saladsCategoryId: number) => [
    {
                recipeName: `Салат 1 user ${userId}`,
                imageUrl: "",
                shortDescription: `Короткое описание приготовления салата 1 для пользователя ${userId}`,
                fullDescription: `Полное описание приготовления салата 1 для пользователя ${userId}`,
                servings: 4,
                categoryId: saladsCategoryId,
                userId,
            },
            {
                recipeName: `Салат 2 user ${userId}`,
                imageUrl: "",
                shortDescription: `Короткое описание приготовления салата 2 для пользователя ${userId}`,
                fullDescription: `Полное описание приготовления салата 2 для пользователя ${userId}`,
                servings: 4,
                categoryId: saladsCategoryId,
                userId,
            },
    
];

export const getFirstCourses = (userId: number, firstCoursesCategoryId: number) => [
    {
                recipeName: `Суп 1 user ${userId}`,
                imageUrl: "",
                shortDescription: `Короткое описание приготовления супа 1 для пользователя ${userId}`,
                fullDescription: `Полное описание приготовления супа 1 для пользователя ${userId}`,
                servings: 4,
                categoryId: firstCoursesCategoryId,
                userId,
            },
            {
                recipeName: `Суп 2 user ${userId}`,
                imageUrl: "",
                shortDescription: `Короткое описание приготовления супа 2 для пользователя ${userId}`,
                fullDescription: `Полное описание приготовления супа 2 для пользователя ${userId}`,
                servings: 4,
                categoryId: firstCoursesCategoryId,
                userId,
            },            
];

export const getHotMeals = (userId: number, hotMealsCategoryId: number) => [
    {
                recipeName: `Отбивная 1 user ${userId}`,
                imageUrl: "",
                shortDescription: `Короткое описание приготовления отбивной 1 для пользователя ${userId}`,
                fullDescription: `Полное описание приготовления отбивной 1 для пользователя ${userId}`,
                servings: 4,
                categoryId: hotMealsCategoryId,
                userId,
            },
            {
                recipeName: `Отбивная 2 user ${userId}`,
                imageUrl: "",
                shortDescription: `Короткое описание приготовления отбивной 2 для пользователя ${userId}`,
                fullDescription: `Полное описание приготовления отбивной 2 для пользователя ${userId}`,
                servings: 4,
                categoryId: hotMealsCategoryId,
                userId,
            },            
];

export const getBakery = (userId: number, backeryCategoryId: number) => [
    {
                recipeName: `Пирог 1 user ${userId}`,
                imageUrl: "",
                shortDescription: `Короткое описание приготовления пирога 1 для пользователя ${userId}`,
                fullDescription: `Полное описание приготовления пирога 1 для пользователя ${userId}`,
                servings: 4,
                categoryId: backeryCategoryId,
                userId,
            },
            {
                recipeName: `Пирог 2 user ${userId}`,
                imageUrl: "",
                shortDescription: `Короткое описание приготовления пирога 2 для пользователя ${userId}`,
                fullDescription: `Полное описание приготовления пирога 2 для пользователя ${userId}`,
                servings: 4,
                categoryId: backeryCategoryId,
                userId,
            },            
];

export const getDesserts = (userId: number, dessertsCategoryId: number) => [
    {
                recipeName: `Мороженное 1 user ${userId}`,
                imageUrl: "",
                shortDescription: `Короткое описание приготовления мороженного 1 для пользователя ${userId}`,
                fullDescription: `Полное описание приготовления мороженного 1 для пользователя ${userId}`,
                servings: 4,
                categoryId: dessertsCategoryId,
                userId,
            },
            {
                recipeName: `Мороженное 2 user ${userId}`,
                imageUrl: "",
                shortDescription: `Короткое описание приготовления мороженного 2 для пользователя ${userId}`,
                fullDescription: `Полное описание приготовления мороженного 2 для пользователя ${userId}`,
                servings: 4,
                categoryId: dessertsCategoryId,
                userId,
            },            
];

export const getPresserves = (userId: number, preservesCategoryId: number) => [
    {
                recipeName: `Огурцы маринованные 1 user ${userId}`,
                imageUrl: "",
                shortDescription: `Короткое описание приготовления маринованных огурцов 1 для пользователя ${userId}`,
                fullDescription: `Полное описание приготовления маринованных огурцов 1 для пользователя ${userId}`,
                servings: 4,
                categoryId: preservesCategoryId,
                userId,
            },
            {
                recipeName: `Огурцы маринованные 2 user ${userId}`,
                imageUrl: "",
                shortDescription: `Короткое описание приготовления маринованных огурцов 2 для пользователя ${userId}`,
                fullDescription: `Полное описание приготовления маринованных огурцов 2 для пользователя ${userId}`,
                servings: 4,
                categoryId: preservesCategoryId,
                userId,
            },            
];

const ingredientNames = [
    "огурцы",
    "морковь",
    "кукуруза",
    "свекла",
    "баклажаны",
    "брокколи",
    "картофель",
    "масло",
    "соль",
    "перец",
    "мука",
    "сахар",
    "молоко",
]

const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const units = [
    "шт",
    "г",
    "кг",
    "л",
    "мл",
    "ч.л.",
]

const getRandomArrayElement = (array: string[]) => {
    return array[getRandomNumber(0, array.length)]
}

const createObjects = (count: number, recipeId: number) => {
    return Array.from({ length: count }, () => {
        return {
            recipeId,
            name: getRandomArrayElement(ingredientNames),
            amount: getRandomNumber(1, 100),
            unit: getRandomArrayElement(units),
        }
    })
}

export const ingredients = (recipes: Recipe[]) => {
     return recipes.map((recipe) => {
         return createObjects(getRandomNumber(1, 5), recipe.id)
     })
 }

