export const dynamic = "force-dynamic";

import { AddRecipeModal, Container, RecipesList, Title, TopBar } from "@/components/shared";
import { useTranslation } from "../../i18n";
import React from "react";
import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/constants/auth-options";
import { redirect } from "next/navigation";

export default async function Home({ params: { lng } }: { params: { lng: string } }) {
    const { t } = await useTranslation(lng);

    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect('/');
    }

    const categories = await prisma.category.findMany({});

    return (
        <>
            <Container>
                <Title text={t("Все рецепты")} className="font-extrabold mt-10" />
            </Container>

            <TopBar lng={lng} categories={categories} />

            {/* Список рецептов */}

            <RecipesList
                lng={lng}
            />

            <AddRecipeModal lng={lng} />
        </>
    );
} 
