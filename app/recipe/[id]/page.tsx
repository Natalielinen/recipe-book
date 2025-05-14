import { authOptions } from "@/app/constants/auth-options";
import { RecipeContent } from "@/components/shared/recipe-content";
import { prisma } from "@/prisma/prisma-client";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const getRecipeNameById = async (id: number) => {
    return await prisma.recipe.findUnique({
        where: { id },
        select: { recipeName: true },
    });
};

export async function generateMetadata(
    { params }: { params: { id: string } }
): Promise<Metadata> {

    const recipe = await getRecipeNameById(Number(params.id));

    return {
        title: recipe ? `Рецепт: ${recipe.recipeName}` : "Рецепт не найден",
    };
}

export default async function RecipePage({ params: { id } }: { params: { id: string } }) {

    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect('/');
    }

    return <RecipeContent
        id={Number(id)}
    />

}