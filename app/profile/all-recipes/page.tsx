import { authOptions } from "@/app/constants/auth-options";
import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/shared/admin";
import { columns } from "./columns";
import { RecipeOfADay } from "@/generated/prisma";

export default async function AllRecipesPage() {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
        where: { id: Number(session?.user?.id) },
    });

    const recipes = await prisma.recipeOfADay.findMany({});

    if (!recipes) throw new Error("Рецепты не найдены");

    const dataTable = recipes.map((recipe: RecipeOfADay) => ({
        id: recipe.id,
        recipeName: recipe.recipeName,
        imageUrl: recipe.imageUrl,
        isTodayRecipe: recipe.isTodayRecipe,
        authorName: recipe.authorName,
        authorId: recipe.authorId,
    }));

    if (!dataTable) throw new Error("Нет данных");

    if (user?.role !== "ADMIN") {
        redirect("/profile");
    }

    return <DataTable columns={columns} data={dataTable} />;
}
