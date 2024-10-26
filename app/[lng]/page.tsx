

import { AddRecipeModal, Container, RecipesList, Title, TopBar } from "@/components/shared";
import { useTranslation } from "../i18n";
import React from "react";
import { prisma } from "@/prisma/prisma-client";
import { Button } from "@/components/ui/button";
import { MyRecipesButton } from "@/components/shared/my-recipes-button";

export default async function Home({ params: { lng } }: { params: { lng: string } }) {

  const { t } = await useTranslation(lng);

  const categories = await prisma.category.findMany({});


  return (
    <>
      <MyRecipesButton lng={lng} />
      root layout page
      {/* <Container>
        <Title text={t("Все рецепты")} className="font-extrabold mt-10" />
      </Container>

      <TopBar lng={lng} categories={categories} />

      <RecipesList
        lng={lng}
      />

      <AddRecipeModal lng={lng} /> */}
    </>
  );
} 
