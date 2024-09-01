import { Prisma, Recipe } from "@prisma/client";
import { prisma } from "./prisma-client";
import {hashSync} from "bcrypt";
import { categories, getBakery, getDesserts, getFirstCourses, getHotMeals, getPresserves, getSalads, ingredients } from "./constants";



async function up() {

    await prisma.user.createMany({
        data: [
            {
                fullName: "User 1",
                email: "u1@u.com",
                password: hashSync("user1", 10),
                verified: new Date()
            },
            {
                fullName: "User 2",
                email: "u2@u.com",
                password: hashSync("user2", 10),
                verified: new Date()
            }

        ]
    })

    await prisma.category.createMany({
        data: categories
    })

    const user1 = await prisma.user.findUnique({ where: { email: "u1@u.com" } });
    const user2 = await prisma.user.findUnique({ where: { email: "u2@u.com" } });

    const saladsCategory = await prisma.category.findUnique({ where: { nameKey: "Салаты и закуски" } });
    const firstCoursesCategory = await prisma.category.findUnique({ where: { nameKey: "Первые блюда"} });
    const hotMealsCategory = await prisma.category.findUnique({ where: { nameKey: "Горячие блюда"} });
    const backeryCategory = await prisma.category.findUnique({ where: { nameKey: "Выпечка"} });
    const dessertsCategory = await prisma.category.findUnique({ where: { nameKey: "Десерты и напитки"} });
    const preservesCategory = await prisma.category.findUnique({ where: { nameKey: "Домашние заготовки"} });

    await prisma.recipe.createMany({
        data: [
            ...getSalads(user1?.id as number, saladsCategory?.id as number),
            ...getSalads(user2?.id as number, saladsCategory?.id as number),
            ...getFirstCourses(user1?.id as number, firstCoursesCategory?.id as number),
            ...getFirstCourses(user2?.id as number, firstCoursesCategory?.id as number),
            ...getHotMeals(user1?.id as number, hotMealsCategory?.id as number),
            ...getHotMeals(user2?.id as number, hotMealsCategory?.id as number),
            ...getBakery(user1?.id as number, backeryCategory?.id as number),
            ...getBakery(user2?.id as number, backeryCategory?.id as number),
            ...getDesserts(user1?.id as number, dessertsCategory?.id as number),
            ...getDesserts(user2?.id as number, dessertsCategory?.id as number),
            ...getPresserves(user1?.id as number, preservesCategory?.id as number),
            ...getPresserves(user2?.id as number, preservesCategory?.id as number),
        ]
    })

    const user1resipes = await prisma.recipe.findMany({ where: { userId: user1?.id } });
    const user2resipes = await prisma.recipe.findMany({ where: { userId: user2?.id } });

    await prisma.ingredient.createMany({
        data: [
            ...ingredients(user1resipes).flat(),
            ...ingredients(user2resipes).flat(),
        ]
    })
    
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Recipe" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    
}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);   
    }

}

main()
.then(async () => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
