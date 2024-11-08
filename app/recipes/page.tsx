import { AddRecipeModal, Container, RecipesList, Title, TopBar } from "@/components/shared";
import React from "react";
import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/constants/auth-options";
import { redirect } from "next/navigation";

export default async function Home() {

    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect('/');
    }

    const categories = await prisma.category.findMany({});

    return (
        <>
            <Container>
                <Title text="Все рецепты" className="font-extrabold mt-10" />
            </Container>

            <TopBar categories={categories} />

            {/* Список рецептов */}

            <RecipesList

            />

            <AddRecipeModal />
        </>
    );
} 
