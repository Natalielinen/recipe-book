

import { Container, RecipesList, Title, TopBar } from "@/components/shared";
import { useTranslation } from "../i18n";
import { RecipesGroupList } from "@/components/shared/recipes-group-list";
import React from "react";
import { Api } from "../services/api-client";
import { CategoryDto } from "../services/dto/recipe.dto";

export default async function Home({ params: { lng } }: { params: { lng: string } }) {

  const { t } = await useTranslation(lng);

  // const [categories, setCategories] = React.useState<CategoryDto[]>([]);
  // const fetchRecipes = async () => {
  //   const response = await Api.recipes();

  //   setCategories(response);
  // };

  // React.useEffect(() => {
  //   fetchRecipes();
  // }, [])



  const recipes1 = [
    {
      id: 1,
      name: "Салат 1",
      imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      shortDescription: "Описание салата 1"

    },
    {
      id: 2,
      name: "Салат 2",
      imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      shortDescription: "Описание салата 2"

    },
    {
      id: 3,
      name: "Салат 3",
      imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      shortDescription: "Описание салата 3"

    },
    {
      id: 4,
      name: "Салат 4",
      imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      shortDescription: "Описание салата 4"

    },
    {
      id: 5,
      name: "Салат 5",
      imageUrl: "",
      shortDescription: "Описание салата 5"

    },
  ]

  return (
    <>
      <Container>
        <Title text={t("Все рецепты")} className="font-extrabold mt-10" />
      </Container>

      <TopBar lng={lng} />

      {/* Список рецептов */}

      <RecipesList
        lng={lng}
      />
      {/* <Container className="mt-10 pb-14">
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            {
              categories.length && categories.map((category) => (
                <RecipesGroupList
                  key={category.id}
                  categoryId={category.id}
                  lng={lng}
                  recipes={category.recipes}
                  title={t(category.nameKey)}

                />
              ))
            }
          </div>
        </div>
      </Container> */}


    </>
  );
} 
